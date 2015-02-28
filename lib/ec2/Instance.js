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

var propertyMap = {'AvailabilityZone': {'list': false, 'type': 'String'},
 'BlockDeviceMappings': {'list': true, 'type': aws_properties_ec2_blockdev_mapping},
 'DisableApiTermination': {'list': false, 'type': 'Boolean'},
 'EbsOptimized': {'list': false, 'type': 'Boolean'},
 'IamInstanceProfile': {'list': false, 'type': 'String'},
 'ImageId': {'list': false, 'type': 'String'},
 'InstanceInitiatedShutdownBehavior': {'list': false, 'type': 'String'},
 'InstanceType': {'list': true, 'type': 'String'},
 'KernelId': {'list': false, 'type': 'String'},
 'KeyName': {'list': false, 'type': 'String'},
 'Monitoring': {'list': false, 'type': 'Boolean'},
 'NetworkInterfaces': {'list': true, 'type': NetworkInterface},
 'PlacementGroupName': {'list': false, 'type': 'String'},
 'PrivateIpAddress': {'list': false, 'type': 'String'},
 'RamdiskId': {'list': false, 'type': 'String'},
 'SecurityGroupIds': {'list': true, 'type': 'String'},
 'SecurityGroups': {'list': true, 'type': 'String'},
 'SourceDestCheck': {'list': false, 'type': 'Boolean'},
 'SubnetId': {'list': false, 'type': 'String'},
 'Tags': {'list': false, 'type': aws_properties_resource_tags},
 'Tenancy': {'list': false, 'type': 'String'},
 'UserData': {'list': false, 'type': 'String'},
 'Volumes': {'list': true, 'type': Volume}};

var Class = function (id) {
    return Resource.call(this, id, 'Instance', {});
};
require('util').inherits(Class, Resource);

// TODO: Update registerPropertyPrototypes to accommodate property types
Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
