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

var Subnet = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::Subnet', { Tags: [{Key:'Description', Value:description}] });
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
