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


var propertyMap = {'IncludeGlobalServiceEvents': {'list': false, 'type': 'Boolean'},
 'IsLogging': {'list': false, 'type': 'Boolean'},
 'S3BucketName': {'list': false, 'type': 'String'},
 'S3KeyPrefix': {'list': false, 'type': 'String'},
 'SnsTopicName': {'list': false, 'type': 'String'}};

var Class = function (id) {
    return Resource.call(this, id, 'Trail', {});
};
require('util').inherits(Class, Resource);

// TODO: Update registerPropertyPrototypes to accommodate property types
Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
