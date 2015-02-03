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
var propertyMap = {
    'AllowVersionUpgrade': 'Boolean',
    'AutomatedSnapshotRetentionPeriod': 'Number',
    'AvailabilityZone': 'String',
    'ClusterParameterGroupName': 'String',
    'ClusterSecurityGroups': 'Array',
    'ClusterSubnetGroupName': 'String',
    'ClusterType': 'String',
    'ClusterVersion': 'String',
    'DBName': 'String',
    'ElasticIp': 'String',
    'Encrypted': 'Boolean',
    'HsmClientCertificateIdentifier': 'String',
    'HsmConfigurationIdentifier': 'String',
    'MasterUserPassword': 'String',
    'MasterUsername': 'String',
    'NodeType': 'String',
    'NumberOfNodes': 'Number',
    'OwnerAccount': 'String',
    'Port': 'Number',
    'PreferredMaintenanceWindow': 'String',
    'PubliclyAccessible': 'Boolean',
    'SnapshotClusterIdentifier': 'String',
    'SnapshotIdentifier': 'String',
    'VpcSecurityGroupIds': 'Array'
};
var Class = function (id) {
    return Resource.call(this, id, 'AWS::Redshift::Cluster', {});
};
require('util').inherits(Class, Resource);

Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
