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
var aws_properties_as_launchconfig_blockdev_mapping = require('../properties/aws_properties_as_launchconfig_blockdev_mapping.js');

var propertyMap = {'AssociatePublicIpAddress': {'list': false, 'type': 'boolean'},
 'BlockDeviceMappings': {'list': true,
                            'type': aws_properties_as_launchconfig_blockdev_mapping},
 'EbsOptimized': {'list': false, 'type': 'boolean'},
 'IamInstanceProfile': {'list': false, 'type': 'string'},
 'ImageId': {'list': false, 'type': 'string'},
 'InstanceId': {'list': false, 'type': 'string'},
 'InstanceMonitoring': {'list': false, 'type': 'boolean'},
 'InstanceType': {'list': false, 'type': 'string'},
 'KernelId': {'list': false, 'type': 'string'},
 'KeyName': {'list': false, 'type': 'string'},
 'RamDiskId': {'list': false, 'type': 'string'},
 'SecurityGroups': {'list': true, 'type': 'string'},
 'SpotPrice': {'list': false, 'type': 'string'},
 'UserData': {'list': false, 'type': 'string'}};

var Class = function (id) {
    return Resource.call(this, id, 'AWS::AutoScaling::LaunchConfiguration', {});
};
require('util').inherits(Class, Resource);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
