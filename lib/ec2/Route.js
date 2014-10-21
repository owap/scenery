'use strict';

var Resource = require('../Resource.js');

var Route = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::Route', {});
};
require('util').inherits(Route, Resource);

Route.prototype.destinationCidrBlock = function(value){
    this.node.Properties.DestinationCidrBlock = value;
    return this;
};

Route.prototype.gatewayId = function(value){
    this.node.Properties.GatewayId = value;
    return this;
};

Route.prototype.instanceId = function(value){
    this.node.Properties.InstanceId = value;
    return this;
};

Route.prototype.networkInterfaceId = function(value){
    this.node.Properties.NetworkInterfaceId = value;
    return this;
};

Route.prototype.routeTableId = function(value){
    this.node.Properties.RouteTableId = value;
    return this;
};

Route.prototype.vpcPeeringConnectionId = function(value){
    this.node.Properties.VpcPeeringConnectionId = value;
    return this;
};

module.exports = Route;
