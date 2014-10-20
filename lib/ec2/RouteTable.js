'use strict';

var Resource = require('../Resource.js');

var RouteTable = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::RouteTable', { Tags: [] });
};
require('util').inherits(RouteTable, Resource);

RouteTable.prototype.tags = function(value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.Tags = value;
    return this;
};

RouteTable.prototype.vpcId = function(value) {
    this.node.Properties.VpcId = value;
    return this;
};

module.exports = RouteTable;
