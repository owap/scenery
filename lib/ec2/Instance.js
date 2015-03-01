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
var aws_properties_resource_tags = require('../properties/aws_properties_resource_tags.js');
var NetworkInterface = require('../properties/NetworkInterface.js');
var aws_properties_ec2_blockdev_mapping = require('../properties/aws_properties_ec2_blockdev_mapping.js');
var Volume = require('../properties/Volume.js');

var propertyMap = {'AvailabilityZone': {'list': false, 'type': 'string'},
 'BlockDeviceMappings': {'list': true, 'type': aws_properties_ec2_blockdev_mapping},
 'DisableApiTermination': {'list': false, 'type': 'boolean'},
 'EbsOptimized': {'list': false, 'type': 'boolean'},
 'IamInstanceProfile': {'list': false, 'type': 'string'},
 'ImageId': {'list': false, 'type': 'string'},
 'InstanceInitiatedShutdownBehavior': {'list': false, 'type': 'string'},
 'InstanceType': {'list': true, 'type': 'string'},
 'KernelId': {'list': false, 'type': 'string'},
 'KeyName': {'list': false, 'type': 'string'},
 'Monitoring': {'list': false, 'type': 'boolean'},
 'NetworkInterfaces': {'list': true, 'type': NetworkInterface},
 'PlacementGroupName': {'list': false, 'type': 'string'},
 'PrivateIpAddress': {'list': false, 'type': 'string'},
 'RamdiskId': {'list': false, 'type': 'string'},
 'SecurityGroupIds': {'list': true, 'type': 'string'},
 'SecurityGroups': {'list': true, 'type': 'string'},
 'SourceDestCheck': {'list': false, 'type': 'boolean'},
 'SubnetId': {'list': false, 'type': 'string'},
 'Tags': {'list': false, 'type': aws_properties_resource_tags},
 'Tenancy': {'list': false, 'type': 'string'},
 'UserData': {'list': false, 'type': 'string'},
 'Volumes': {'list': true, 'type': Volume}};

var Class = function (id) {
    return Resource.call(this, id, 'Instance', {});
};
require('util').inherits(Class, Resource);

Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
