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
var Ec2BlockdevTemplate = require('../properties/Ec2BlockdevTemplate.js');

var propertyMap = {'DeviceName': {'list': false, 'type': 'string'},
 'Ebs': {'list': false, 'type': Ec2BlockdevTemplate},
 'NoDevice': {'list': false, 'type': 'string'},
 'VirtualName': {'list': false, 'type': 'string'}};

var Class = function (id) {
    return AWSClass.call(this, id, 'Ec2BlockdevMapping', {});
};
require('util').inherits(Class, AWSClass);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;