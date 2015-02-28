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
var CacheBehavior = require('../properties/CacheBehavior.js');
var Logging = require('../properties/Logging.js');
var Origin = require('../properties/Origin.js');
var DefaultCacheBehavior = require('../properties/DefaultCacheBehavior.js');
var ViewerCertificate = require('../properties/ViewerCertificate.js');
var CustomErrorResponse = require('../properties/CustomErrorResponse.js');
var Restriction = require('../properties/Restriction.js');

var propertyMap = {'Aliases': {'list': true, 'type': 'String'},
 'CacheBehaviors': {'list': true, 'type': CacheBehavior},
 'Comment': {'list': false, 'type': 'String'},
 'CustomErrorResponses': {'list': true, 'type': CustomErrorResponse},
 'DefaultCacheBehavior': {'list': false, 'type': DefaultCacheBehavior},
 'DefaultRootObject': {'list': false, 'type': 'String'},
 'Enabled': {'list': false, 'type': 'Boolean'},
 'Logging': {'list': false, 'type': Logging},
 'Origins': {'list': true, 'type': Origin},
 'PriceClass': {'list': false, 'type': 'String'},
 'Restrictions': {'list': false, 'type': Restriction},
 'ViewerCertificate': {'list': false, 'type': ViewerCertificate}};

var Class = function (id) {
    return Resource.call(this, id, 'DistributionConfig', {});
};
// TODO: Create a Property base class so properties don't extend Resource!
require('util').inherits(Class, Resource);

// TODO: Update registerPropertyPrototypes to accommodate property types
Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
