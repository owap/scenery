'use strict';

exports.TemplateReferencableStringsTest = function(test) {
    var Referencable = require('../lib/Referencable.js');
    var InternetGateway = require ('../lib/EC2/InternetGateway.js');
    var VPCGatewayAttachment = require ('../lib/EC2/VPCGatewayAttachment.js');

    var myVpcId = 'testVpcId';
    var myGateway = new InternetGateway(myVpcId+'gateway');
    var internetGatewayAttachment = new VPCGatewayAttachment(myVpcId+'InternetGateWayAttachment');
    
    test.expect(2);
    test.ok(myGateway instanceof Referencable);
    test.doesNotThrow(function(){
        internetGatewayAttachment.InternetGatewayId(myGateway).VpcId(myVpcId); 
    });
    test.done();
};