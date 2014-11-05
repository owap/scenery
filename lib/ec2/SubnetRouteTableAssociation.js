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

var SubnetRouteTableAssociation = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::SubnetRouteTableAssociation', {});
};
require('util').inherits(SubnetRouteTableAssociation, Resource);

SubnetRouteTableAssociation.prototype.routeTableId = function(value) {
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }
    this.node.Properties.RouteTableId = value;
    return this;
};

SubnetRouteTableAssociation.prototype.subnetId = function(value) {
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }
    this.node.Properties.SubnetId = value;
    return this;
};

module.exports = SubnetRouteTableAssociation;
