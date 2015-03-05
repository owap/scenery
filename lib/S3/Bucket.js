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
var Resource = require('../Resource.js');
var CorsConfiguration = require('../properties/CorsConfiguration.js');
var aws_properties_resource_tags = require('../properties/aws_properties_resource_tags.js');
var LoggingConfiguration = require('../properties/LoggingConfiguration.js');
var LifecycleConfiguration = require('../properties/LifecycleConfiguration.js');
var WebsiteConfiguration = require('../properties/WebsiteConfiguration.js');
var aws_properties_s3_bucket_notificationconfig = require('../properties/aws_properties_s3_bucket_notificationconfig.js');
var VersioningConfiguration = require('../properties/VersioningConfiguration.js');

var propertyMap = {'AccessControl': {'list': false, 'type': 'string'},
 'BucketName': {'list': false, 'type': 'string'},
 'CorsConfiguration': {'list': false, 'type': CorsConfiguration},
 'LifecycleConfiguration': {'list': false, 'type': LifecycleConfiguration},
 'LoggingConfiguration': {'list': false, 'type': LoggingConfiguration},
 'NotificationConfiguration': {'list': false,
                                  'type': aws_properties_s3_bucket_notificationconfig},
 'Tags': {'list': false, 'type': aws_properties_resource_tags},
 'VersioningConfiguration': {'list': false, 'type': VersioningConfiguration},
 'WebsiteConfiguration': {'list': false, 'type': WebsiteConfiguration}};

var Class = function (id) {
    return Resource.call(this, id, 'AWS::S3::Bucket', {});
};
require('util').inherits(Class, Resource);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
