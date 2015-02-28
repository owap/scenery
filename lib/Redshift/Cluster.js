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


var propertyMap = {'AllowVersionUpgrade': {'list': false, 'type': 'Boolean'},
 'AutomatedSnapshotRetentionPeriod': {'list': false, 'type': 'Number'},
 'AvailabilityZone': {'list': false, 'type': 'String'},
 'ClusterParameterGroupName': {'list': false, 'type': 'String'},
 'ClusterSecurityGroups': {'list': true, 'type': 'String'},
 'ClusterSubnetGroupName': {'list': false, 'type': 'String'},
 'ClusterType': {'list': false, 'type': 'String'},
 'ClusterVersion': {'list': false, 'type': 'String'},
 'DBName': {'list': false, 'type': 'String'},
 'ElasticIp': {'list': false, 'type': 'String'},
 'Encrypted': {'list': false, 'type': 'Boolean'},
 'HsmClientCertificateIdentifier': {'list': false, 'type': 'String'},
 'HsmConfigurationIdentifier': {'list': false, 'type': 'String'},
 'MasterUserPassword': {'list': false, 'type': 'String'},
 'MasterUsername': {'list': false, 'type': 'String'},
 'NodeType': {'list': false, 'type': 'String'},
 'NumberOfNodes': {'list': false, 'type': 'Number'},
 'OwnerAccount': {'list': false, 'type': 'String'},
 'Port': {'list': false, 'type': 'Number'},
 'PreferredMaintenanceWindow': {'list': false, 'type': 'String'},
 'PubliclyAccessible': {'list': false, 'type': 'Boolean'},
 'SnapshotClusterIdentifier': {'list': false, 'type': 'String'},
 'SnapshotIdentifier': {'list': false, 'type': 'String'},
 'VpcSecurityGroupIds': {'list': true, 'type': 'String'}};

var Class = function (id) {
    return Resource.call(this, id, 'Cluster', {});
};
require('util').inherits(Class, Resource);

// TODO: Update registerPropertyPrototypes to accommodate property types
Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
