// Copyright 2014 OpenWhere, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Attempt to create a CloudFormation template that contains the following:
 *  + Two EC2 instances
 *  + One ElastiCache cluster with a single node
 *  + An Elastic Load Balancer
 *  + Two security groups
 *      - One for the EC2 instances
 *      - One for the ElastiCache cluster
 **/

var Template = require('../lib/Template.js');
var Validator = require('../lib/Validator.js');

exports.ec2_ecc_elb_secuirty_test = function(test){
    var t = new Template();
    var filePath = '/tmp/ec2_elb_ecc_security_rds.json';

    // Create Parameters
    t.strParam('CacheType', 'cache.m3.medium', 'Type of cache instance to add to the ElastiCache cluster')
        .allowedValues([
            'cache.m3.medium',
            'cache.m3.large',
            'cache.m3.xlarge',
            'cache.m3.2xlarge',
            'cache.r3.large',
            'cache.r3.xlarge',
            'cache.r3.2xlarge',
            'cache.r3.4xlarge',
            'cache.r3.8xlarge',
            'cache.t2.micro',
            'cache.t2.small',
            'cache.t2.medium'
        ]);
    t.strParam('EC2InstanceType', 'c3.large', 'Type of EC2 Instance to launch')
        .allowedValues([
            'c3.large',
            'c3.xlarge',
            'c3.2xlarge',
            'c3.4xlarge',
            'c3.8xlarge'
        ]);

    t.strParam('EC2InstanceAMI', 'ami-6aff5e02', 'AMI Instance ID to use for the EC2 instances');
    t.strParam('KeyName', null, 'Name of the EC2 Keypair to enable SSH access to the boxes');
    t.strParam('OpenCidrIp', '0.0.0.0/0');

    var webServerPort = 80;
    t.numParam('RDPPort', 3389);
    t.numParam('WebServerPort', webServerPort);

    // Create EC2 Instances
    var instanceIds = [];
    for(var i=0; i<2; i++){
        instanceIds.push('loadBalacnedEc2Instance' + i);
    }

    for(var j in instanceIds){
        t.ec2Instance(instanceIds[j])
            .KeyName( t.ref('KeyName') )
            .ImageId( t.ref('EC2InstanceAMI') )
            .InstanceType( t.ref('EC2InstanceType') )
            .SecurityGroups( t.ref('InstanceSecurityGroup') );
    }

    // Create the load balancer (for the ec2 instances)
    var lbHealth = {
        'Target': 'HTTP:' + webServerPort + '/',
        'HealthyThreshold': '3',
        'UnhealthyThreshold': '5',
        'Interval': '30',
        'Timeout': '5'
    };
    var loadBalancer = t.loadBalancer('ec2LoadBalancer')
                        .AvailabilityZones()
                        .HealthCheck(lbHealth)
                        .Instances(instanceIds)
                        .Listeners({
                          'LoadBalancerPort' : '80',
                          'InstancePort' : { 'Ref' : 'WebServerPort' },
                          'Protocol' : 'HTTP'
                        });

    // Create Elasticache Cluster
    var eccName = 'TestECC';
    t.elastiCacheCluster(eccName)
        .AutoMinorVersionUpgrade('true')
        .CacheNodeType( t.ref('CacheType') )
        .ClusterName(eccName)
        .Engine('memcached')
        .NumCacheNodes(1)
        .VpcSecurityGroupIds( t.fnGetAtt('CacheSecurityGroup', 'GroupId') );

    // Create Security Groups
    t.securityGroup('InstanceSecurityGroup', 'Security Group for the EC2 Instances')
        .TcpIn({ 'CidrIp': t.ref('OpenCidrIp')}, t.ref('WebServerPort'), t.ref('RDPPort'));
    t.securityGroup('CacheSecurityGroup', 'Security Group for the ElastiCache Cluster')
        .TcpIn({'SourceSecurityGroupName': t.ref('InstanceSecurityGroup')}, 11211);

    t.save(filePath);

    // Validate the template
    test.expect(2);

    function validationCallback(isValid, message){
        if(!isValid){
            console.log(message);
        }
        test.ok(isValid);
        test.ok(!!message);
        test.done();
    }

    var v = new Validator(filePath, __dirname+'/../config.json');
    v.validate(validationCallback);
};
