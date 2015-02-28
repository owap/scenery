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
 'CustomJson': {'list': false, 'type': 'Object'},
 'DefaultAvailabilityZone': {'list': false, 'type': 'String'},
 'DefaultInstanceProfileArn': {'list': false, 'type': 'String'},
 'DefaultOs': {'list': false, 'type': 'String'},
 'DefaultRootDeviceType': {'list': false, 'type': 'String'},
 'DefaultSshKeyName': {'list': false, 'type': 'String'},
 'DefaultSubnetId': {'list': false, 'type': 'String'},
 'HostnameTheme': {'list': false, 'type': 'String'},
 'Name': {'list': false, 'type': 'String'},
 'ServiceRoleArn': {'list': false, 'type': 'String'},
 'UseCustomCookbooks': {'list': false, 'type': 'Boolean'},
 'UseOpsworksSecurityGroups': {'list': false, 'type': 'Boolean'},
 'VpcId': {'list': false, 'type': 'String'}};

var Class = function (id) {
    return Resource.call(this, id, 'Stack', {});
};
require('util').inherits(Class, Resource);

// TODO: Update registerPropertyPrototypes to accommodate property types
Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
