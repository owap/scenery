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

//var Resource = require('../Resource.js');
var Taggable = require('../Taggable.js');
var Subnet = require('./Subnet.js');
var RouteTable = require('./RouteTable');
var NetworkAcl = require('./NetworkAcl');

////////////////////////////////
// VPC-specific Properties
////////////////////////////////
var propertyMap = {
    'cidrBlock': 'string',
    'enableDnsSupport': 'string',
    'enableDnsHostnames': 'string',
    'instanceTenancy': 'string',
    'tags': 'array'
};
var VPC = function (id, description, cidrBlock, template) {
    Taggable.call(this, id, 'AWS::EC2::VPC',null, template );
    this.node.Properties.CidrBlock = cidrBlock;
    return this;
};
require('util').inherits(VPC, Taggable);

VPC = Taggable.registerPropertyPrototypes(VPC, propertyMap);

////////////////////////////////
// VPC-specific functions
////////////////////////////////
VPC.prototype.addSubnet = function (id, description) {
    var sub = this.template.addResource(new Subnet(id, description, this.template));
    sub.vpcId(this.id);
    return sub;
};

VPC.prototype.addRouteTable = function (id, description) {
    var rt = this.template.addResource(new RouteTable(id, description,this.template));
    rt.vpcId(this.id);
    return rt;
};

VPC.prototype.addNetworkAcl = function (id, description) {
    var nacl = this.template.addResource(new NetworkAcl(id, description,this.template));
    nacl.vpcId(this.id);
    return nacl;
};

module.exports = VPC;
