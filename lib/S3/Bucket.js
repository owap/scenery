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
var S3BucketCor = require('../properties/S3BucketCor.js');
var ResourceTag = require('../properties/ResourceTag.js');
var S3BucketLoggingconfig = require('../properties/S3BucketLoggingconfig.js');
var S3BucketLifecycleconfig = require('../properties/S3BucketLifecycleconfig.js');
var S3Websiteconfiguration = require('../properties/S3Websiteconfiguration.js');
var S3BucketNotificationconfig = require('../properties/S3BucketNotificationconfig.js');
var S3BucketVersioningconfig = require('../properties/S3BucketVersioningconfig.js');

var propertyMap = {'AccessControl': {'list': false, 'type': 'string'},
 'BucketName': {'list': false, 'type': 'string'},
 'CorsConfiguration': {'list': false, 'type': S3BucketCor},
 'LifecycleConfiguration': {'list': false, 'type': S3BucketLifecycleconfig},
 'LoggingConfiguration': {'list': false, 'type': S3BucketLoggingconfig},
 'NotificationConfiguration': {'list': false, 'type': S3BucketNotificationconfig},
 'Tags': {'list': false, 'type': ResourceTag},
 'VersioningConfiguration': {'list': false, 'type': S3BucketVersioningconfig},
 'WebsiteConfiguration': {'list': false, 'type': S3Websiteconfiguration}};

var Class = function (id) {
    return Taggable.call(this, id, 'AWS::S3::Bucket', {});
};
require('util').inherits(Class, Taggable);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;