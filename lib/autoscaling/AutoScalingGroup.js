var Resource = require('../Resource.js');

var AutoScalingGroup = function (id) {
    return Resource.call(this, id, "AWS::AutoScaling::AutoScalingGroup", { Tags: []})
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
}

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
    this.node.Properties.Tags.push({"Key": "Name", Value: name, "PropagateAtLaunch": "true"});
    return this;
};

module.exports = AutoScalingGroup;
