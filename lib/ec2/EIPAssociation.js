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

var EIPAssociation = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::EIPAssociation', {});
};
require('util').inherits(EIPAssociation, Resource);


EIPAssociation.prototype.allocationId = function(value){
    this.node.Properties.AllocationId = value;
    return this;
};

EIPAssociation.prototype.eIP = function(value){
    this.node.Properties.EIP = value;
    return this;
};

EIPAssociation.prototype.instanceId = function(value){
    this.node.Properties.InstanceId = value;
    return this;
};

EIPAssociation.prototype.networkInterfaceId = function(value){
    this.node.Properties.NetworkInterfaceId = value;
    return this;
};

EIPAssociation.prototype.privateIpAddress = function(value){
    this.node.Properties.PrivateIpAddress = value;
    return this;
};

module.exports = EIPAssociation;
