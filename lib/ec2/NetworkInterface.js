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
var PrivateIpAddress = require('../properties/PrivateIpAddress.js');

var propertyMap = {'Description': {'list': false, 'type': 'string'},
 'GroupSet': {'list': true, 'type': 'string'},
 'PrivateIpAddress': {'list': false, 'type': 'string'},
 'PrivateIpAddresses': {'list': true, 'type': PrivateIpAddress},
 'SecondaryPrivateIpAddressCount': {'list': false, 'type': 'number'},
 'SourceDestCheck': {'list': false, 'type': 'boolean'},
 'SubnetId': {'list': false, 'type': 'string'},
 'Tags': {'list': false, 'type': aws_properties_resource_tags}};

var Class = function (id) {
    return Resource.call(this, id, 'AWS::EC2::NetworkInterface', {});
};
require('util').inherits(Class, Resource);

Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
