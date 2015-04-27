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
var RdsSecurityGroupRule = require('../properties/RdsSecurityGroupRule.js');
var ResourceTag = require('../properties/ResourceTag.js');

var propertyMap = {'DBSecurityGroupIngress': {'list': true, 'type': RdsSecurityGroupRule},
 'EC2VpcId': {'list': false, 'type': 'string'},
 'GroupDescription': {'list': false, 'type': 'string'},
 'Tags': {'list': true, 'type': ResourceTag}};

var Class = function (id) {
    return Taggable.call(this, id, 'AWS::RDS::DBSecurityGroup', {});
};
require('util').inherits(Class, Taggable);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;