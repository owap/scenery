'use strict';

var Role = function () {
    this.node = {
        Type: 'AWS::IAM::Role',
        'Properties': {
        }
    };
    return this;
};

Role.prototype.path = function (path) {
    this.node.Properties.Path = path;
    return this;
};

Role.prototype.assumeRolePolicyDocument = function (doc) {
    this.node.Properties.AssumeRolePolicyDocument = doc;
    return this;
};

Role.prototype.policies = function (policies) {
    if (!(policies instanceof Array)) {
        policies = [policies];
    }
    this.node.Properties.Policies = policies;
    return this;
};

module.exports = Role;
