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

var AWSClass = require('../AWSClass.js');


var propertyMap = {'CidrIp': {'list': false, 'type': 'string'},
 'DestinationSecurityGroupId (SecurityGroupEgress only)': {'list': false, 'type': 'string'},
 'FromPort': {'list': false, 'type': 'number'},
 'IpProtocol': {'list': false, 'type': 'string'},
 'SourceSecurityGroupId (SecurityGroupIngress only)': {'list': false, 'type': 'string'},
 'SourceSecurityGroupName (SecurityGroupIngress only)': {'list': false, 'type': 'string'},
 'SourceSecurityGroupOwnerId (SecurityGroupIngress only)': {'list': false, 'type': 'string'},
 'ToPort': {'list': false, 'type': 'number'}};

var Class = function (id) {
    return AWSClass.call(this, id, 'Ec2SecurityGroupRule', {});
};
require('util').inherits(Class, AWSClass);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;