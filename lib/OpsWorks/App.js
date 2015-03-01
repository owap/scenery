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
var AppSource = require('../properties/AppSource.js');
var SslConfiguration = require('../properties/SslConfiguration.js');
var Attribute = require('../properties/Attribute.js');

var propertyMap = {'AppSource': {'list': false, 'type': AppSource},
 'Attributes': {'list': false, 'type': Attribute},
 'Description': {'list': false, 'type': 'string'},
 'Domains': {'list': true, 'type': 'string'},
 'EnableSsl': {'list': false, 'type': 'boolean'},
 'Name': {'list': false, 'type': 'string'},
 'Shortname': {'list': false, 'type': 'string'},
 'SslConfiguration': {'list': false, 'type': SslConfiguration},
 'StackId': {'list': false, 'type': 'string'},
 'Type': {'list': false, 'type': 'string'}};

var Class = function (id) {
    return Resource.call(this, id, 'App', {});
};
require('util').inherits(Class, Resource);

Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
