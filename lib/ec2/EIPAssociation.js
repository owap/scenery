'use strict';

var Resource = require('../Resource.js');

var EIPAssociation = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::EIPAssociation', {});
};
require('util').inherits(EIPAssociation, Resource);


EIPAssociation.prototype.allocationId = function(value){
    this.node.Properties.AllocationId = value;
    return this;
};

EIPAssociation.prototype.eIP = function(value){
    this.node.Properties.EIP = value;
    return this;
};

EIPAssociation.prototype.instanceId = function(value){
    this.node.Properties.InstanceId = value;
    return this;
};

EIPAssociation.prototype.networkInterfaceId = function(value){
    this.node.Properties.NetworkInterfaceId = value;
    return this;
};

EIPAssociation.prototype.privateIpAddress = function(value){
    this.node.Properties.PrivateIpAddress = value;
    return this;
};

module.exports = EIPAssociation;
