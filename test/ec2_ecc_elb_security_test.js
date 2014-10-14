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
    t.strParam('EC2InstanceAMI', 'ami-123456', 'AMI Instance ID to use for the EC2 instances');
    t.strParam('KeyName', 'test-key', 'Name of the EC2 Keypair to enable SSH access to the boxes');
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
            .keyName( t.ref('KeyName') )
            .imageId( t.ref('EC2InstanceAMI') )
            .name(instanceIds[j])
            .securityGroupIds('sg1');
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
                        .loadBalancerName('ec2LoadBalancer')
                        .instances(instanceIds)
                        .healthCheck(lbHealth);

    // Create Elasticache Cluster
    var eccName = 'TestECC';
    t.elastiCacheCluster(eccName)
        .autoMinorVersionUpgrade('true')
        .cacheNodeType('cache.m3.medium')
        .clusterName(eccName)
        .engine('memcached')
        .numCacheNodes(1)
        .vpcSecurityGroupIds('sg2');

    // Create Security Groups
    t.securityGroup('sg1', 'Security Group for the EC2 Instances')
        .tcpIn({ 'CidrIp': t.ref('OpenCidrIp')}, t.ref('WebServerPort'), t.ref('RDPPort'));
    t.securityGroup('sg2', 'Security Group for the ElastiCache Cluster')
        .tcpIn({'SourceSecurityGroupId': t.ref('sg1')}, 11211);

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

    var v = new Validator(filePath);
    v.validate(validationCallback);
};
