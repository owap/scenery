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
var aws_properties_resource_tags = require('../properties/aws_properties_resource_tags.js');

var propertyMap = {'AllocatedStorage': {'list': false, 'type': 'string'},
 'AllowMajorVersionUpgrade': {'list': false, 'type': 'boolean'},
 'AutoMinorVersionUpgrade': {'list': false, 'type': 'boolean'},
 'AvailabilityZone': {'list': false, 'type': 'string'},
 'BackupRetentionPeriod': {'list': false, 'type': 'string'},
 'DBInstanceClass': {'list': false, 'type': 'string'},
 'DBInstanceIdentifier': {'list': false, 'type': 'string'},
 'DBName': {'list': false, 'type': 'string'},
 'DBParameterGroupName': {'list': false, 'type': 'string'},
 'DBSecurityGroups': {'list': true, 'type': 'string'},
 'DBSnapshotIdentifier': {'list': false, 'type': 'string'},
 'DBSubnetGroupName': {'list': false, 'type': 'string'},
 'Engine': {'list': false, 'type': 'string'},
 'EngineVersion': {'list': false, 'type': 'string'},
 'Iops': {'list': false, 'type': 'number'},
 'LicenseModel': {'list': false, 'type': 'string'},
 'MasterUserPassword': {'list': false, 'type': 'string'},
 'MasterUsername': {'list': false, 'type': 'string'},
 'MultiAZ': {'list': false, 'type': 'boolean'},
 'OptionGroupName': {'list': false, 'type': 'string'},
 'Port': {'list': false, 'type': 'string'},
 'PreferredBackupWindow': {'list': false, 'type': 'string'},
 'PreferredMaintenanceWindow': {'list': false, 'type': 'string'},
 'PubliclyAccessible': {'list': false, 'type': 'boolean'},
 'SourceDBInstanceIdentifier': {'list': false, 'type': 'string'},
 'StorageType': {'list': false, 'type': 'string'},
 'Tags': {'list': false, 'type': aws_properties_resource_tags},
 'VPCSecurityGroups': {'list': true, 'type': 'string'}};

var Class = function (id) {
    return Resource.call(this, id, 'AWS::RDS::DBInstance', {});
};
require('util').inherits(Class, Resource);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
