'use strict';

exports.TemplateReferencableStringsTest = function(test) {
    var Scenery = require('../scenery.js');
    var Referencable = require('../lib/Referencable.js');
    var t = new Scenery.Template();
    var myVpcId = 'testVpcId';
    var myGateway = t.internetGateway(myVpcId+'gateway');
    var internetGatewayAttachment = t.vpcGatewayAttachment(myVpcId+'InternetGateWayAttachment');
    
    test.expect(2);
    test.ok(myGateway instanceof Referencable);
    test.doesNotThrow(function(){
        internetGatewayAttachment.InternetGatewayId(myGateway).VpcId(myVpcId); 
    });
    test.done();
};