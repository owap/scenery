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
var OpsworksStackStackconfigmanager = require('../properties/OpsworksStackStackconfigmanager.js');
var OpsworksStackSource = require('../properties/OpsworksStackSource.js');
var OpsworksStackChefconfiguration = require('../properties/OpsworksStackChefconfiguration.js');

var propertyMap = {'Attributes': {'list': false, 'type': 'object'},
 'ChefConfiguration': {'list': false, 'type': OpsworksStackChefconfiguration},
 'ConfigurationManager': {'list': false, 'type': OpsworksStackStackconfigmanager},
 'CustomCookbooksSource': {'list': false, 'type': OpsworksStackSource},
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
    return Resource.call(this, id, 'AWS::OpsWorks::Stack', {});
};
require('util').inherits(Class, Resource);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;