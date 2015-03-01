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

// TODO: Create a Property base class so properties don't extend Resource!
var Resource = require('../Resource.js');
var PrivateIpAddress = require('../properties/PrivateIpAddress.js');

var propertyMap = {'AssociatePublicIpAddress': {'list': false, 'type': 'boolean'},
 'DeleteOnTermination': {'list': false, 'type': 'boolean'},
 'Description': {'list': false, 'type': 'string'},
 'DeviceIndex': {'list': false, 'type': 'string'},
 'GroupSet': {'list': true, 'type': 'string'},
 'NetworkInterfaceId': {'list': false, 'type': 'string'},
 'PrivateIpAddress': {'list': false, 'type': 'string'},
 'PrivateIpAddresses': {'list': true, 'type': PrivateIpAddress},
 'SecondaryPrivateIpAddressCount': {'list': false, 'type': 'number'},
 'SubnetId': {'list': false, 'type': 'string'}};

var Class = function (id) {
    return Resource.call(this, id, 'NetworkInterface', {});
};
// TODO: Create a Property base class so properties don't extend Resource!
require('util').inherits(Class, Resource);

Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
