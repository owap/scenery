'use strict';

var _ = require('lodash');

function Resource(id, type, properties, template) {
    this.template = template;
    this.id = id;
    this.node = {
        'Type': type,
        Properties: {
        }
    };
    if (properties) {
        _.extend(this.node.Properties, properties);
    }
    return this;
}

Resource.prototype.ref = function () {
    return { 'Ref': this.id };
};

Resource.prototype.getAtt = function (att) {
    return { 'Fn::GetAtt': [ this.id , att ]};
};

Resource.prototype.dependsOn = function (dependencies) {
    if (!(dependencies instanceof Array)) {
        dependencies = [dependencies];
    }
    this.node.DependsOn = dependencies;
    return this;
};

Resource.prototype.deletionPolicy = function (policy) {
    this.node.DeletionPolicy = policy;
    return this;
};

module.exports = Resource;
