'use strict';

var Resource = require('../Resource.js');

var VPC = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::VPC', { Tags: [] });
};

require('util').inherits(VPC, Resource);

VPC.prototype.cidrBlock = function(value) {
    this.node.Properties.CidrBlock = value;
    return this;
};

VPC.prototype.enableDnsSupport = function(value) {
    this.node.Properties.EnableDnsSupport = value;
    return this;
};

VPC.prototype.enableDnsHostnames = function(value) {
    this.node.Properties.EnableDnsHostnames = value;
    return this;
};

VPC.prototype.instanceTenancy = function(value) {
    this.node.Properties.InstanceTenancy = value;
    return this;
};

VPC.prototype.tags = function(value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.Tags = value;
    return this;
};

module.exports = VPC;
