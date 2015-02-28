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
var aws_properties_as_launchconfig_blockdev_mapping = require('../properties/aws_properties_as_launchconfig_blockdev_mapping.js');

var propertyMap = {'AssociatePublicIpAddress': {'list': false, 'type': 'Boolean'},
 'BlockDeviceMappings': {'list': true,
                            'type': aws_properties_as_launchconfig_blockdev_mapping},
 'EbsOptimized': {'list': false, 'type': 'Boolean'},
 'IamInstanceProfile': {'list': false, 'type': 'String'},
 'ImageId': {'list': false, 'type': 'String'},
 'InstanceId': {'list': false, 'type': 'String'},
 'InstanceMonitoring': {'list': false, 'type': 'Boolean'},
 'InstanceType': {'list': false, 'type': 'String'},
 'KernelId': {'list': false, 'type': 'String'},
 'KeyName': {'list': false, 'type': 'String'},
 'RamDiskId': {'list': false, 'type': 'String'},
 'SecurityGroups': {'list': true, 'type': 'String'},
 'SpotPrice': {'list': false, 'type': 'String'},
 'UserData': {'list': false, 'type': 'String'}};

var Class = function (id) {
    return Resource.call(this, id, 'LaunchConfiguration', {});
};
require('util').inherits(Class, Resource);

// TODO: Update registerPropertyPrototypes to accommodate property types
Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
