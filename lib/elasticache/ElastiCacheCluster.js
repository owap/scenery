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

'use strict';

var Resource = require('../Resource.js');

var ElastiCacheCluster = function (id, description) {
    Resource.call(this, id, 'AWS::ElastiCache::CacheCluster');
    return this;
};

ElastiCacheCluster.prototype.autoMinorVersionUpgrade = function(value) {
    this.node.Properties.AutoMinorVersionUpgrade = value;
    return this;
};

ElastiCacheCluster.prototype.cacheNodeType = function(value) {
    this.node.Properties.CacheNodeType = value;
    return this;
};

ElastiCacheCluster.prototype.cacheParameterGroupName = function(value) {
    this.node.Properties.CacheParameterGroupName = value;
    return this;
};

ElastiCacheCluster.prototype.cacheSecurityGroupNames = function(value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.CacheSecurityGroupNames = value;
    return this;
};

ElastiCacheCluster.prototype.cacheSubnetGroupName = function(value) {
    this.node.Properties.CacheSubnetGroupName = value;
    return this;
};

ElastiCacheCluster.prototype.clusterName = function(value) {
    this.node.Properties.ClusterName = value;
    return this;
};

ElastiCacheCluster.prototype.engine = function(value) {
    this.node.Properties.Engine = value;
    return this;
};

ElastiCacheCluster.prototype.engineVersion = function(value) {
    this.node.Properties.EngineVersion = value;
    return this;
};

ElastiCacheCluster.prototype.notificationTopicArn = function(value) {
    this.node.Properties.NotificationTopicArn = value;
    return this;
};

ElastiCacheCluster.prototype.numCacheNodes = function(value) {
    this.node.Properties.NumCacheNodes = value;
    return this;
};

ElastiCacheCluster.prototype.port = function(value) {
    this.node.Properties.Port = value;
    return this;
};

ElastiCacheCluster.prototype.preferredAvailabilityZone = function(value) {
    this.node.Properties.PreferredAvailabilityZone = value;
    return this;
};

ElastiCacheCluster.prototype.preferredMaintenanceWindow = function(value) {
    this.node.Properties.PreferredMaintenanceWindow = value;
    return this;
};

ElastiCacheCluster.prototype.snapshotArns = function(value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.SnapshotArns = value;
    return this;
};

ElastiCacheCluster.prototype.vpcSecurityGroupIds = function(value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.VpcSecurityGroupIds = value;
    return this;
};

module.exports = ElastiCacheCluster;
