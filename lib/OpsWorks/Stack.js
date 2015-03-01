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
var ConfigurationManager = require('../properties/ConfigurationManager.js');
var AppSource = require('../properties/AppSource.js');
var ChefConfiguration = require('../properties/ChefConfiguration.js');
var Attribute = require('../properties/Attribute.js');

var propertyMap = {'Attributes': {'list': false, 'type': Attribute},
 'ChefConfiguration': {'list': false, 'type': ChefConfiguration},
 'ConfigurationManager': {'list': false, 'type': ConfigurationManager},
 'CustomCookbooksSource': {'list': false, 'type': AppSource},
 'CustomJson': {'list': false, 'type': 'object'},
 'DefaultAvailabilityZone': {'list': false, 'type': 'string'},
 'DefaultInstanceProfileArn': {'list': false, 'type': 'string'},
 'DefaultOs': {'list': false, 'type': 'string'},
 'DefaultRootDeviceType': {'list': false, 'type': 'string'},
 'DefaultSshKeyName': {'list': false, 'type': 'string'},
 'DefaultSubnetId': {'list': false, 'type': 'string'},
 'HostnameTheme': {'list': false, 'type': 'string'},
 'Name': {'list': false, 'type': 'string'},
 'ServiceRoleArn': {'list': false, 'type': 'string'},
 'UseCustomCookbooks': {'list': false, 'type': 'boolean'},
 'UseOpsworksSecurityGroups': {'list': false, 'type': 'boolean'},
 'VpcId': {'list': false, 'type': 'string'}};

var Class = function (id) {
    return Resource.call(this, id, 'Stack', {});
};
require('util').inherits(Class, Resource);

Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
