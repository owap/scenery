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
var Route = require('./Route.js');
var SubnetRouteTableAssociation = require('./SubnetRouteTableAssociation.js');
var propertyMap = {
    'tags': 'array',
    'vpcId': 'reference'
};

var RouteTable = function (id, description, template) {
    return Resource.call(this, id, 'AWS::EC2::RouteTable', { Tags: [{ Key: 'Description', Value: description||''}] }, template);
};
require('util').inherits(RouteTable, Resource);
RouteTable = Resource.registerPropertyPrototypes(RouteTable, propertyMap);

// -- Functions
RouteTable.prototype.addRoute = function(id, description) {
    var r = this.template.addResource(new Route(id, description,this.template));
    r.routeTableId(this.id);
    return r;
};

RouteTable.prototype.addSubnet = function(id, subref) {
    var rta = this.template.addResource(new SubnetRouteTableAssociation(id, null,this.template));
    rta.routeTableId(this.id);
    rta.subnetId(subref);
    return rta;
};

module.exports = RouteTable;
