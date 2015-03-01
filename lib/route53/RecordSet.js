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
var GeoLocation = require('../properties/GeoLocation.js');
var AliasTarget = require('../properties/AliasTarget.js');

var propertyMap = {'AliasTarget': {'list': false, 'type': AliasTarget},
 'Comment': {'list': false, 'type': 'string'},
 'Failover': {'list': false, 'type': 'string'},
 'GeoLocation': {'list': false, 'type': GeoLocation},
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
    return Resource.call(this, id, 'RecordSet', {});
};
require('util').inherits(Class, Resource);

Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
