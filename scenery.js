// Copyright 2014 OpenWhere, Inc.
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

// Top-level classes
var Template = require('./lib/Template.js');
var Parameter = require('./lib/Parameter.js');
var Resource = require('./lib/Resource.js');

// EC2 Resources
var Instance = require('./lib/ec2/Instance.js');
var InternetGateway = require('./lib/ec2/InternetGateway.js');
var SecurityGroup = require('./lib/ec2/SecurityGroup.js');
var Subnet = require('./lib/ec2/Subnet.js');
var VPC = require('./lib/ec2/VPC.js');
var VPCGatewayAttachment = require('./lib/ec2/VPCGatewayAttachment.js');

// IAM Resources
var InstanceProfile = require('./lib/iam/InstanceProfile.js');
var Policy = require('./lib/iam/Policy.js');
var Role = require('./lib/iam/Role.js');

// Autoscaling Resources
var AutoScalingGroup = require('./lib/autoscaling/AutoScalingGroup.js');
var LaunchConfiguration = require('./lib/autoscaling/LaunchConfiguration.js');

// Other Resources
var ElastiCacheCluster = require('./lib/elasticache/ElastiCacheCluster.js');
var LoadBalancer = require('./lib/elasticloadbalancing/LoadBalancer.js');
var Validator = require('./lib/Validator.js');

var Scenery = {
    AutoScalingGroup: AutoScalingGroup,
    ElastiCacheCluster: ElastiCacheCluster,
    Instance: Instance,
    InstanceProfile: InstanceProfile,
    InternetGateway: InternetGateway,
    LaunchConfiguration: LaunchConfiguration,
    LoadBalancer: LoadBalancer,
    Parameter: Parameter,
    Policy: Policy,
    Resource: Resource,
    Role: Role,
    SecurityGroup: SecurityGroup,
    Subnet: Subnet,
    Template: Template,
    Validator: Validator,
    VPC: VPC,
    VPCGatewayAttachment: VPCGatewayAttachment
};

module.exports = Scenery;
