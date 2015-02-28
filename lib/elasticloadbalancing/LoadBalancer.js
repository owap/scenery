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
var AppCookieStickinessPolicy = require('../properties/AppCookieStickinessPolicy.js');
var ConnectionDrainingPolicy = require('../properties/ConnectionDrainingPolicy.js');
var AccessLoggingPolicy = require('../properties/AccessLoggingPolicy.js');
var HealthCheck = require('../properties/HealthCheck.js');
var LBCookieStickinessPolicy = require('../properties/LBCookieStickinessPolicy.js');
var aws_properties_resource_tags = require('../properties/aws_properties_resource_tags.js');
var Listener = require('../properties/Listener.js');
var ConnectionSetting = require('../properties/ConnectionSetting.js');
var aws_properties_ec2_elb_policy = require('../properties/aws_properties_ec2_elb_policy.js');

var propertyMap = {'AccessLoggingPolicy': {'list': false, 'type': AccessLoggingPolicy},
 'AppCookieStickinessPolicy': {'list': true, 'type': AppCookieStickinessPolicy},
 'AvailabilityZones': {'list': true, 'type': 'String'},
 'ConnectionDrainingPolicy': {'list': false, 'type': ConnectionDrainingPolicy},
 'ConnectionSettings': {'list': false, 'type': ConnectionSetting},
 'CrossZone': {'list': false, 'type': 'Boolean'},
 'HealthCheck': {'list': false, 'type': HealthCheck},
 'Instances': {'list': true, 'type': 'String'},
 'LBCookieStickinessPolicy': {'list': true, 'type': LBCookieStickinessPolicy},
 'Listeners': {'list': true, 'type': Listener},
 'LoadBalancerName': {'list': false, 'type': 'String'},
 'Policies': {'list': true, 'type': aws_properties_ec2_elb_policy},
 'Scheme': {'list': false, 'type': 'String'},
 'SecurityGroups': {'list': true, 'type': 'String'},
 'Subnets': {'list': true, 'type': 'String'},
 'Tags': {'list': false, 'type': aws_properties_resource_tags}};

var Class = function (id) {
    return Resource.call(this, id, 'LoadBalancer', {});
};
require('util').inherits(Class, Resource);

// TODO: Update registerPropertyPrototypes to accommodate property types
Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
