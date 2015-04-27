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
var Taggable = require('../Taggable.js');
var Ec2ElbAppcookiestickinesspolicy = require('../properties/Ec2ElbAppcookiestickinesspolicy.js');
var Ec2ElbConnectiondrainingpolicy = require('../properties/Ec2ElbConnectiondrainingpolicy.js');
var Ec2ElbAccessloggingpolicy = require('../properties/Ec2ElbAccessloggingpolicy.js');
var Ec2ElbHealthCheck = require('../properties/Ec2ElbHealthCheck.js');
var Ec2ElbLbcookiestickinesspolicy = require('../properties/Ec2ElbLbcookiestickinesspolicy.js');
var ResourceTag = require('../properties/ResourceTag.js');
var Ec2ElbListener = require('../properties/Ec2ElbListener.js');
var Ec2ElbConnectionsetting = require('../properties/Ec2ElbConnectionsetting.js');
var Ec2ElbPolicy = require('../properties/Ec2ElbPolicy.js');

var propertyMap = {'AccessLoggingPolicy': {'list': false, 'type': Ec2ElbAccessloggingpolicy},
 'AppCookieStickinessPolicy': {'list': true, 'type': Ec2ElbAppcookiestickinesspolicy},
 'AvailabilityZones': {'list': true, 'type': 'string'},
 'ConnectionDrainingPolicy': {'list': false, 'type': Ec2ElbConnectiondrainingpolicy},
 'ConnectionSettings': {'list': false, 'type': Ec2ElbConnectionsetting},
 'CrossZone': {'list': false, 'type': 'boolean'},
 'HealthCheck': {'list': false, 'type': Ec2ElbHealthCheck},
 'Instances': {'list': true, 'type': 'string'},
 'LBCookieStickinessPolicy': {'list': true, 'type': Ec2ElbLbcookiestickinesspolicy},
 'Listeners': {'list': true, 'type': Ec2ElbListener},
 'LoadBalancerName': {'list': false, 'type': 'string'},
 'Policies': {'list': true, 'type': Ec2ElbPolicy},
 'Scheme': {'list': false, 'type': 'string'},
 'SecurityGroups': {'list': true, 'type': 'string'},
 'Subnets': {'list': true, 'type': 'string'},
 'Tags': {'list': false, 'type': ResourceTag}};

var Class = function (id) {
    return Taggable.call(this, id, 'AWS::ElasticLoadBalancing::LoadBalancer', {});
};
require('util').inherits(Class, Taggable);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;