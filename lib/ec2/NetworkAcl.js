'use strict';

var Resource = require('../Resource.js');

var NetworkAcl = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::NetworkAcl', { Tags: [] });
};
require('util').inherits(NetworkAcl, Resource);

NetworkAcl.prototype.tags = function(value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.Tags = value;
    return this;
};

NetworkAcl.prototype.vpcId = function(value) {
    this.node.Properties.VpcId = value;
    return this;
};

module.exports = NetworkAcl;
