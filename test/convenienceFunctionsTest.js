'use strict';

exports.testConvenienceFunctionsExist = function(test) {
    var VPC = require('../lib/EC2/VPC.js');
    var Template = require('../lib/Template.js');
    var myVPC = new VPC();
    
    test.expect(5);
    
    // Check to make sure functions from the AWS Documentation exist
    test.ok(myVPC.EnableDnsHostnames);
    
    // Check to make sure our convenience functions exist
    test.ok(myVPC.addSubnet);
   
    // Assert our convenience function works in standard conditions
    test.doesNotThrow(function() {
        var t = new Template();
        var myTestVpc = new VPC('vpcLogicalId').addSubnet(t, 'myTestSubnet', '10.0.0.0/8');
        t.addResource(myTestVpc);
        test.deepEqual(t.template.Resources.myTestSubnet.Properties.VpcId, {Ref: 'vpcLogicalId'});
        test.ok(t.template.Resources.myTestSubnet.Properties.CidrBlock === '10.0.0.0/8');
    });
    test.done();
};