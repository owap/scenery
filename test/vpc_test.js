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

    // VPC
    var myVpcId = 'TestVPC';
    t.vpc(myVpcId).cidrBlock( t.ref('CidrBlock') );

    // Subnet
    var mySubnetId = 'MySecretSubnet';
    t.subnet(mySubnetId)
        .cidrBlock( t.ref('CidrBlock') )
        .vpcId( t.ref(myVpcId) );
    
    // EC2 Instance
    t.ec2Instance('TestInstance')
        .keyName('test-key')
        .imageId('ami-123456')
        .name('TestInstance')
        .subnetId( t.ref(mySubnetId) );


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

    var v = new Validator(filePath);
    v.validate(validationCallback);
};
