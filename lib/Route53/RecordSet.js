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
var Resource = require('../Resource.js');
var Route53RecordsetGeolocation = require('../properties/Route53RecordsetGeolocation.js');
var Route53Aliastarget = require('../properties/Route53Aliastarget.js');

var propertyMap = {'AliasTarget': {'list': false, 'type': Route53Aliastarget},
 'Comment': {'list': false, 'type': 'string'},
 'Failover': {'list': false, 'type': 'string'},
 'GeoLocation': {'list': false, 'type': Route53RecordsetGeolocation},
 'HealthCheckId': {'list': false, 'type': 'string'},
 'HostedZoneId': {'list': false, 'type': 'string'},
 'HostedZoneName': {'list': false, 'type': 'string'},
 'Name': {'list': false, 'type': 'string'},
 'Region': {'list': false, 'type': 'string'},
 'ResourceRecords': {'list': true, 'type': 'string'},
 'SetIdentifier': {'list': false, 'type': 'string'},
 'TTL': {'list': false, 'type': 'string'},
 'Type': {'list': false, 'type': 'string'},
 'Weight': {'list': false, 'type': 'number'}};

var Class = function (id) {
    return Resource.call(this, id, 'AWS::Route53::RecordSet', {});
};
require('util').inherits(Class, Resource);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;