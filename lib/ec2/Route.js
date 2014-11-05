// Copyright 2014 OpenWhere, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var Resource = require('../Resource.js');

var Route = function (id, description, template) {
    return Resource.call(this, id, 'AWS::EC2::Route', {}, template);
};
require('util').inherits(Route, Resource);

Route.prototype.destinationCidrBlock = function(value){
    this.node.Properties.DestinationCidrBlock = value;
    return this;
};

Route.prototype.gatewayId = function(value){
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }

    this.node.Properties.GatewayId = value;
    return this;
};

Route.prototype.instanceId = function(value){
    this.node.Properties.InstanceId = value;
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }

    this.node.Properties.InstanceId = value;
    return this;
};

Route.prototype.networkInterfaceId = function(value){
    this.node.Properties.NetworkInterfaceId = value;
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }

    this.node.Properties.NetworkInterfaceId = value;
    return this;
};

Route.prototype.routeTableId = function(value){
    this.node.Properties.RouteTableId = value;
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }

    this.node.Properties.RouteTableId = value;
    return this;
};

Route.prototype.vpcPeeringConnectionId = function(value){
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }

    this.node.Properties.VpcPeeringConnectionId = value;
    return this;
};

module.exports = Route;
