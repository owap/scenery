'use strict';

exports.TemplateStrParamsTest = function(test) {
    var Scenery = require('../Scenery.js');
    var t = new Scenery.Template();
    t.strParam('CidrBlock', '10.0.0.0/16', 'The CIDR block you want the VPC to cover');
    var myVpcId = 'TestVPC';

    test.expect(1);
    test.doesNotThrow(function(){
        var vpc = t.vpc(myVpcId).CidrBlock( t.ref('CidrBlock') ).EnableDnsHostnames(true);
    });
    test.done();
};
