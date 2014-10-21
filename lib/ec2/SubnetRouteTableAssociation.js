'use strict';

var Resource = require('../Resource.js');

var SubnetRouteTableAssociation = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::SubnetRouteTableAssociation', {});
};
require('util').inherits(SubnetRouteTableAssociation, Resource);

SubnetRouteTableAssociation.prototype.routeTableId = function(value) {
    this.node.Properties.RouteTableId = value;
    return this;
};

SubnetRouteTableAssociation.prototype.subnetId = function(value) {
    this.node.Properties.SubnetId = value;
    return this;
};

module.exports = SubnetRouteTableAssociation;
