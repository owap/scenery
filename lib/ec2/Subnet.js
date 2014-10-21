'use strict';

var Resource = require('../Resource.js');

var Subnet = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::Subnet', { Tags: [] });
};

require('util').inherits(Subnet, Resource);

Subnet.prototype.availabilityZone = function(value) {
    this.node.Properties.AvailabilityZone = value;
    return this;
};

Subnet.prototype.cidrBlock = function(value) {
    this.node.Properties.CidrBlock = value;
    return this;
};

Subnet.prototype.tags = function(value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.Tags = value;
    return this;
};

Subnet.prototype.vpcId = function(value) {
    // Automatically convert to reference if the value is string
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }

    this.node.Properties.VpcId = value;
    return this;
};

module.exports = Subnet;
