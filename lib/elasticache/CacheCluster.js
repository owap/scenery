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


var propertyMap = {' VpcSecurityGroupIds ': {'list': true, 'type': 'String'},
 'AutoMinorVersionUpgrade': {'list': false, 'type': 'Boolean'},
 'CacheNodeType': {'list': false, 'type': 'String'},
 'CacheParameterGroupName': {'list': false, 'type': 'String'},
 'CacheSecurityGroupNames': {'list': true, 'type': 'String'},
 'CacheSubnetGroupName': {'list': false, 'type': 'String'},
 'ClusterName': {'list': false, 'type': 'String'},
 'Engine': {'list': false, 'type': 'String'},
 'EngineVersion': {'list': false, 'type': 'String'},
 'NotificationTopicArn': {'list': false, 'type': 'String'},
 'NumCacheNodes': {'list': false, 'type': 'String'},
 'Port': {'list': false, 'type': 'Number'},
 'PreferredAvailabilityZone': {'list': false, 'type': 'String'},
 'PreferredMaintenanceWindow': {'list': false, 'type': 'String'},
 'SnapshotArns': {'list': true, 'type': 'String'}};

var Class = function (id) {
    return Resource.call(this, id, 'CacheCluster', {});
};
require('util').inherits(Class, Resource);

// TODO: Update registerPropertyPrototypes to accommodate property types
Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
