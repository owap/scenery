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
var CustomRecipe = require('../properties/CustomRecipe.js');
var VolumeConfiguration = require('../properties/VolumeConfiguration.js');
var Attribute = require('../properties/Attribute.js');

var propertyMap = {'Attributes': {'list': false, 'type': Attribute},
 'AutoAssignElasticIps': {'list': false, 'type': 'Boolean'},
 'AutoAssignPublicIps': {'list': false, 'type': 'Boolean'},
 'CustomInstanceProfileArn': {'list': false, 'type': 'String'},
 'CustomRecipes': {'list': false, 'type': CustomRecipe},
 'CustomSecurityGroupIds': {'list': true, 'type': 'String'},
 'EnableAutoHealing': {'list': false, 'type': 'Boolean'},
 'InstallUpdatesOnBoot': {'list': false, 'type': 'Boolean'},
 'Name': {'list': false, 'type': 'String'},
 'Packages': {'list': true, 'type': 'String'},
 'Shortname': {'list': false, 'type': 'String'},
 'StackId': {'list': false, 'type': 'String'},
 'Type': {'list': false, 'type': 'String'},
 'VolumeConfigurations': {'list': false, 'type': VolumeConfiguration}};

var Class = function (id) {
    return Resource.call(this, id, 'Layer', {});
};
require('util').inherits(Class, Resource);

// TODO: Update registerPropertyPrototypes to accommodate property types
Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
