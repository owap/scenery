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
 * Attempt to create a template with only EC2 instances and a VPC. Assert
 * validator marks it as valid
 **/
var Template = require('../lib/Template.js');
var Validator = require('../lib/Validator.js');

exports.vpcTest = function(test){
    // Set up the template
    var t = new Template();
    var filePath = '/tmp/vpcTest.json';

    // Params
    t.strParam('CidrBlock', '10.0.0.0/16', 'The CIDR block you want the VPC to cover');

    // VPC + Gateway
    var myGatewayId = 'TestInternetGateway';
    t.internetGateway(myGatewayId);

    var myVpcId = 'TestVPC';
    t.vpc(myVpcId).CidrBlock( t.ref('CidrBlock') );

    t.vpcGatewayAttachment(myVpcId + 'Attachment')
        .VpcId( t.ref(myVpcId) )
        .InternetGatewayId( t.ref(myGatewayId) );

    // Subnet
    var mySubnetId = 'MySecretSubnet';
    t.subnet(mySubnetId)
        .CidrBlock( t.ref('CidrBlock') )
        .VpcId( t.ref(myVpcId) );
    
    // EC2 Instance
    t.ec2Instance('TestInstance')
        .KeyName('test-key')
        .ImageId('ami-123456')
        .Name('TestInstance')
        .SubnetId( t.ref(mySubnetId) );


    t.save(filePath);

    // Assertions
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
