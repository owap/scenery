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
var ResourceTag = require('../properties/ResourceTag.js');
var Ec2NetworkIfaceEmbedded = require('../properties/Ec2NetworkIfaceEmbedded.js');
var Ec2BlockdevMapping = require('../properties/Ec2BlockdevMapping.js');
var Ec2MountPoint = require('../properties/Ec2MountPoint.js');

var propertyMap = {'AvailabilityZone': {'list': false, 'type': 'string'},
 'BlockDeviceMappings': {'list': true, 'type': Ec2BlockdevMapping},
 'DisableApiTermination': {'list': false, 'type': 'boolean'},
 'EbsOptimized': {'list': false, 'type': 'boolean'},
 'IamInstanceProfile': {'list': false, 'type': 'string'},
 'ImageId': {'list': false, 'type': 'string'},
 'InstanceInitiatedShutdownBehavior': {'list': false, 'type': 'string'},
 'InstanceType': {'list': false, 'type': 'string'},
 'KernelId': {'list': false, 'type': 'string'},
 'KeyName': {'list': false, 'type': 'string'},
 'Monitoring': {'list': false, 'type': 'boolean'},
 'NetworkInterfaces': {'list': true, 'type': Ec2NetworkIfaceEmbedded},
 'PlacementGroupName': {'list': false, 'type': 'string'},
 'PrivateIpAddress': {'list': false, 'type': 'string'},
 'RamdiskId': {'list': false, 'type': 'string'},
 'SecurityGroupIds': {'list': true, 'type': 'string'},
 'SecurityGroups': {'list': true, 'type': 'string'},
 'SourceDestCheck': {'list': false, 'type': 'boolean'},
 'SubnetId': {'list': false, 'type': 'string'},
 'Tags': {'list': false, 'type': ResourceTag},
 'Tenancy': {'list': false, 'type': 'string'},
 'UserData': {'list': false, 'type': 'string'},
 'Volumes': {'list': true, 'type': Ec2MountPoint}};

var Class = function (id) {
    return Taggable.call(this, id, 'AWS::EC2::Instance', {});
};
require('util').inherits(Class, Taggable);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;