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

var AutoScalingGroup = function (id) {
    return Resource.call(this, id, 'AWS::AutoScaling::AutoScalingGroup', { Tags: [] });
};

require('util').inherits(AutoScalingGroup, Resource);

AutoScalingGroup.prototype.maxSize = function (size) {
    this.node.Properties.MaxSize = size;
    return this;
};

AutoScalingGroup.prototype.minSize = function (size) {
    this.node.Properties.MinSize = size;
    return this;
};

AutoScalingGroup.prototype.size = function (size) {
    this.minSize(size);
    this.maxSize(size);
    return this;
};

AutoScalingGroup.prototype.availabilityZones = function (zones) {
    if (!(zones instanceof Array)) {
        zones = [zones];
    }
    this.node.Properties.AvailabilityZones = zones;
    return this;
};

AutoScalingGroup.prototype.launchConfigurationName = function (name) {
    this.node.Properties.LaunchConfigurationName = name;
    return this;
};

AutoScalingGroup.prototype.loadBalancerNames = function (values) {
    if (!(values instanceof Array)) {
        values = [values];
    }
    this.node.Properties.LoadBalancerNames = values;
    return this;
};

AutoScalingGroup.prototype.vpcZoneIdentifier = function (zones) {
    if (!(zones instanceof Array)) {
        zones = [zones];
    }
    this.node.Properties.VPCZoneIdentifier = zones;
    return this;
};

AutoScalingGroup.prototype.name = function (name) {
    this.node.Properties.Tags.push({'Key': 'Name', Value: name, 'PropagateAtLaunch': 'true'});
    return this;
};

module.exports = AutoScalingGroup;
