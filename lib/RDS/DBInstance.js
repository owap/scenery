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
    'AllocatedStorage': 'String',
    'AllowMajorVersionUpgrade': 'Boolean',
    'AutoMinorVersionUpgrade': 'Boolean',
    'AvailabilityZone': 'String',
    'BackupRetentionPeriod': 'String',
    'DBInstanceClass': 'String',
    'DBInstanceIdentifier': 'String',
    'DBName': 'String',
    'DBParameterGroupName': 'String',
    'DBSecurityGroups': 'Array',
    'DBSnapshotIdentifier': 'String',
    'DBSubnetGroupName': 'String',
    'Engine': 'String',
    'EngineVersion': 'String',
    'Iops': 'Number',
    'LicenseModel': 'String',
    'MasterUserPassword': 'String',
    'MasterUsername': 'String',
    'MultiAZ': 'Boolean',
    'OptionGroupName': 'String',
    'Port': 'String',
    'PreferredBackupWindow': 'String',
    'PreferredMaintenanceWindow': 'String',
    'PubliclyAccessible': 'Boolean',
    'SourceDBInstanceIdentifier': 'String',
    'StorageType': 'String',
    'Tags': 'Array',
    'VPCSecurityGroups': 'Array'
};
var Class = function (id) {
    return Resource.call(this, id, 'AWS::RDS::DBInstance', {});
};
require('util').inherits(Class, Resource);

Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
