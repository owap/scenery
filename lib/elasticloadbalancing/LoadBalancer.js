'use strict';

var LoadBalancer = function (description) {
    this.node = {
        'Type': 'AWS::ElasticLoadBalancing::LoadBalancer',
        Properties: {
        }
    };
    return this;
};

LoadBalancer.prototype.accessLoggingPolicy = function (value) {
    this.node.Properties.AccessLoggingPolicy = value;
    return this;
};

LoadBalancer.prototype.appCookieStickinessPolicy = function (value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.AppCookieStickinessPolicy = value;
    return this;
};

LoadBalancer.prototype.availabilityZones = function (value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.AppCookieStickinessPolicy = value;
    return this;
};

LoadBalancer.prototype.connectionDrainingPolicy = function (value) {
    this.node.Properties.ConnectionDrainingPolicy = value;
    return this;
};

LoadBalancer.prototype.crossZone = function (value) {
    this.node.Properties.CrossZone = value;
    return this;
};

LoadBalancer.prototype.healthCheck = function (value) {
    this.node.Properties.HealthCheck = value;
    return this;
};

LoadBalancer.prototype.instances = function (instances) {
    if (!(instances instanceof Array)) {
        instances = [instances];
    }
    this.node.Properties.Instances = instances;
    return this;
};

LoadBalancer.prototype.lbCookieStickinessPolicy = function (value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.LBCookieStickinessPolicy = value;
    return this;
};

LoadBalancer.prototype.lbCookieStickinessPolicy = function (value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.LBCookieStickinessPolicy = value;
    return this;
};

LoadBalancer.prototype.loadBalancerName = function (value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.LoadBalancerName = value;
    return this;
};

LoadBalancer.prototype.listeners = function (value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.Listeners = value;
    return this;
};

LoadBalancer.prototype.policies = function (value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.Policies = value;
    return this;
};

LoadBalancer.prototype.scheme = function (value) {
    this.node.Properties.Scheme = value;
    return this;
};

LoadBalancer.prototype.internal = function () {
    this.scheme('internal');
    return this;
};

LoadBalancer.prototype.securityGroups = function (value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.SecurityGroups = value;
    return this;
};

LoadBalancer.prototype.subnets = function (value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.Subnets = value;
    return this;
};

module.exports = LoadBalancer;
