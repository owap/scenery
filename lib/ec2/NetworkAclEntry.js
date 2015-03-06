// Copyright 2015 OpenWhere, Inc.
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
var PortRange = require('../properties/PortRange.js');
var Icmp = require('../properties/Icmp.js');

var propertyMap = {'CidrBlock': {'list': false, 'type': 'string'},
 'Egress': {'list': false, 'type': 'boolean'},
 'Icmp': {'list': false, 'type': Icmp},
 'NetworkAclId': {'list': false, 'type': 'string'},
 'PortRange': {'list': false, 'type': PortRange},
 'Protocol': {'list': false, 'type': 'number'},
 'RuleAction': {'list': false, 'type': 'string'},
 'RuleNumber': {'list': false, 'type': 'number'}};

var Class = function (id) {
    return Resource.call(this, id, 'AWS::EC2::NetworkAclEntry', {});
};
require('util').inherits(Class, Resource);

Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
