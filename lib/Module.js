'use strict';

var Template = require('./Template.js');

function Module(namespace, template) {
    this.namespace = namespace;
    this.template = template;
}

Module.prototype.ns = function (id) {
    return this.namespace + id;
};

Module.prototype.ref = function (refId) {
    return { 'Ref': this.ns(refId)};
};

Module.prototype.getResource = function (id) {
    return this.template.getResource(this.ns(id));
};

Module.prototype.resource = function (id, type, properties) {
    return this.template.resource(this.ns(id), type, properties);
};

Module.prototype.fnGetAtt = function (resource, attribute) {
    return this.template.fnGetAtt(this.ns(resource), attribute);
};

Module.prototype.parseJSON = function (path) {
    return Template.parseJSON(path);
};

Module.prototype.securityGroup = function (id, description) {
    return this.template.securityGroup(this.ns(id), description);
};

Module.prototype.strParam = function (id, defaultValue, description, options) {
    return this.template.strParam(this.ns(id), defaultValue, description, options);
};

Module.prototype.numParam = function (id, defaultValue, description, options) {
    return this.template.numParam(this.ns(id), defaultValue, description, options);
};

Module.prototype.output = function (id, value, description) {
    this.template.output(this.ns(id), value, description);
    return this;
};

Module.prototype.ec2Instance = function (id, description) {
    return this.template.ec2Instance(this.ns(id, description));
};

Module.prototype.launchConfiguration = function (id) {
    return this.template.launchConfiguration(this.ns(id));
};

Module.prototype.autoScalingGroup = function (id) {
    return this.template.autoScalingGroup(this.ns(id));
};

Module.prototype.iamInstanceProfile = function (id, path, roles) {
    this.template.iamInstanceProfile(this.ns(id), path, roles);
    return this;
};

Module.prototype.iamRole = function (id) {
    return this.template.iamRole(this.ns(id));
};

Module.prototype.iamPolicy = function (id) {
    return this.template.iamPolicy(this.ns(id));
};

Module.prototype.loadBalancer = function (id) {
    return this.template.loadBalancer(this.ns(id));
};

module.exports = Module;
