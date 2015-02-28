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
var aws_properties_resource_tags = require('../properties/aws_properties_resource_tags.js');

var propertyMap = {'AllocatedStorage': {'list': false, 'type': 'String'},
 'AllowMajorVersionUpgrade': {'list': false, 'type': 'Boolean'},
 'AutoMinorVersionUpgrade': {'list': false, 'type': 'Boolean'},
 'AvailabilityZone': {'list': false, 'type': 'String'},
 'BackupRetentionPeriod': {'list': false, 'type': 'String'},
 'DBInstanceClass': {'list': false, 'type': 'String'},
 'DBInstanceIdentifier': {'list': false, 'type': 'String'},
 'DBName': {'list': false, 'type': 'String'},
 'DBParameterGroupName': {'list': false, 'type': 'String'},
 'DBSecurityGroups': {'list': true, 'type': 'String'},
 'DBSnapshotIdentifier': {'list': false, 'type': 'String'},
 'DBSubnetGroupName': {'list': false, 'type': 'String'},
 'Engine': {'list': false, 'type': 'String'},
 'EngineVersion': {'list': false, 'type': 'String'},
 'Iops': {'list': false, 'type': 'Number'},
 'LicenseModel': {'list': false, 'type': 'String'},
 'MasterUserPassword': {'list': false, 'type': 'String'},
 'MasterUsername': {'list': false, 'type': 'String'},
 'MultiAZ': {'list': false, 'type': 'Boolean'},
 'OptionGroupName': {'list': false, 'type': 'String'},
 'Port': {'list': false, 'type': 'String'},
 'PreferredBackupWindow': {'list': false, 'type': 'String'},
 'PreferredMaintenanceWindow': {'list': false, 'type': 'String'},
 'PubliclyAccessible': {'list': false, 'type': 'Boolean'},
 'SourceDBInstanceIdentifier': {'list': false, 'type': 'String'},
 'StorageType': {'list': false, 'type': 'String'},
 'Tags': {'list': false, 'type': aws_properties_resource_tags},
 'VPCSecurityGroups': {'list': true, 'type': 'String'}};

var Class = function (id) {
    return Resource.call(this, id, 'DBInstance', {});
};
require('util').inherits(Class, Resource);

// TODO: Update registerPropertyPrototypes to accommodate property types
Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
