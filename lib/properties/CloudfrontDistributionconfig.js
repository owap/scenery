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
var CloudfrontCachebehavior = require('../properties/CloudfrontCachebehavior.js');
var CloudfrontLogging = require('../properties/CloudfrontLogging.js');
var CloudfrontOrigin = require('../properties/CloudfrontOrigin.js');
var CloudfrontDefaultcachebehavior = require('../properties/CloudfrontDefaultcachebehavior.js');
var CloudfrontDistributionconfigViewercertificate = require('../properties/CloudfrontDistributionconfigViewercertificate.js');
var CloudfrontDistributionconfigCustomerrorresponse = require('../properties/CloudfrontDistributionconfigCustomerrorresponse.js');
var CloudfrontDistributionconfigRestriction = require('../properties/CloudfrontDistributionconfigRestriction.js');

var propertyMap = {'Aliases': {'list': true, 'type': 'string'},
 'CacheBehaviors': {'list': true, 'type': CloudfrontCachebehavior},
 'Comment': {'list': false, 'type': 'string'},
 'CustomErrorResponses': {'list': true,
                             'type': CloudfrontDistributionconfigCustomerrorresponse},
 'DefaultCacheBehavior': {'list': false, 'type': CloudfrontDefaultcachebehavior},
 'DefaultRootObject': {'list': false, 'type': 'string'},
 'Enabled': {'list': false, 'type': 'boolean'},
 'Logging': {'list': false, 'type': CloudfrontLogging},
 'Origins': {'list': true, 'type': CloudfrontOrigin},
 'PriceClass': {'list': false, 'type': 'string'},
 'Restrictions': {'list': false, 'type': CloudfrontDistributionconfigRestriction},
 'ViewerCertificate': {'list': false, 'type': CloudfrontDistributionconfigViewercertificate}};

var Class = function (id) {
    return AWSClass.call(this, id, 'CloudfrontDistributionconfig', {});
};
require('util').inherits(Class, AWSClass);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;