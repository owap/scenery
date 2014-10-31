'use strict';

var Resource = require('../Resource.js');

var VPCGatewayAttachment = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::VPCGatewayAttachment');
};

require('util').inherits(VPCGatewayAttachment, Resource);

VPCGatewayAttachment.prototype.internetGatewayId = function(value) {
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }

    this.node.Properties.InternetGatewayId = value;
    return this;
};

VPCGatewayAttachment.prototype.vpcId = function(value) {
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }
    this.node.Properties.VpcId = value;
    return this;
};

VPCGatewayAttachment.prototype.vpnGatewayId = function(value) {
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }
    this.node.Properties.VpnGatewayId = value;
    return this;
};

module.exports = VPCGatewayAttachment;
