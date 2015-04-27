'use strict';

exports.TemplateStrParamsTest = function(test) {
    var Template = require('../lib/Template.js');
    var VPC = require('../lib/EC2/VPC.js');

    var t = new Template();
    t.strParam('CidrBlock', '10.0.0.0/16', 'The CIDR block you want the VPC to cover');
    var myVpcId = 'TestVPC';

    test.expect(2);
    test.doesNotThrow(function(){
        var vpc = new VPC(myVpcId).CidrBlock( t.ref('CidrBlock') ).EnableDnsHostnames(true);
        test.deepEqual(vpc.node.Properties.CidrBlock, { Ref: 'CidrBlock' });
    });
    test.done();
};
