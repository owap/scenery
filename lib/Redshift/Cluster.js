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


var propertyMap = {'AllowVersionUpgrade': {'list': false, 'type': 'boolean'},
 'AutomatedSnapshotRetentionPeriod': {'list': false, 'type': 'number'},
 'AvailabilityZone': {'list': false, 'type': 'string'},
 'ClusterParameterGroupName': {'list': false, 'type': 'string'},
 'ClusterSecurityGroups': {'list': true, 'type': 'string'},
 'ClusterSubnetGroupName': {'list': false, 'type': 'string'},
 'ClusterType': {'list': false, 'type': 'string'},
 'ClusterVersion': {'list': false, 'type': 'string'},
 'DBName': {'list': false, 'type': 'string'},
 'ElasticIp': {'list': false, 'type': 'string'},
 'Encrypted': {'list': false, 'type': 'boolean'},
 'HsmClientCertificateIdentifier': {'list': false, 'type': 'string'},
 'HsmConfigurationIdentifier': {'list': false, 'type': 'string'},
 'MasterUserPassword': {'list': false, 'type': 'string'},
 'MasterUsername': {'list': false, 'type': 'string'},
 'NodeType': {'list': false, 'type': 'string'},
 'NumberOfNodes': {'list': false, 'type': 'number'},
 'OwnerAccount': {'list': false, 'type': 'string'},
 'Port': {'list': false, 'type': 'number'},
 'PreferredMaintenanceWindow': {'list': false, 'type': 'string'},
 'PubliclyAccessible': {'list': false, 'type': 'boolean'},
 'SnapshotClusterIdentifier': {'list': false, 'type': 'string'},
 'SnapshotIdentifier': {'list': false, 'type': 'string'},
 'VpcSecurityGroupIds': {'list': true, 'type': 'string'}};

var Class = function (id) {
    return Resource.call(this, id, 'AWS::Redshift::Cluster', {});
};
require('util').inherits(Class, Resource);

Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
