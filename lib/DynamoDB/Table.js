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
var GlobalSecondaryIndex = require('../properties/GlobalSecondaryIndex.js');
var AttributeDefinition = require('../properties/AttributeDefinition.js');
var LocalSecondaryIndex = require('../properties/LocalSecondaryIndex.js');
var ProvisionedThroughput = require('../properties/ProvisionedThroughput.js');
var KeySchema = require('../properties/KeySchema.js');

var propertyMap = {'AttributeDefinitions': {'list': true, 'type': AttributeDefinition},
 'GlobalSecondaryIndexes': {'list': false, 'type': GlobalSecondaryIndex},
 'KeySchema': {'list': false, 'type': KeySchema},
 'LocalSecondaryIndexes': {'list': false, 'type': LocalSecondaryIndex},
 'ProvisionedThroughput': {'list': false, 'type': ProvisionedThroughput},
 'TableName': {'list': false, 'type': 'object'}};

var Class = function (id) {
    return Resource.call(this, id, 'Table', {});
};
require('util').inherits(Class, Resource);

Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
