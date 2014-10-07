'use strict';

var Policy = function () {
    this.node = {
        Type: 'AWS::IAM::Policy',
        'Properties': {
            'PolicyDocument': {
                'Statement': []
            }
        }
    };
    return this;
};

Policy.prototype.name = function (name) {
    this.node.Properties.PolicyName = name;
    return this;
};

Policy.prototype.statement = function (action, effect, resource) {
    if (!(action instanceof Array)) {
        action = [action];
    }
    this.node.Properties.PolicyDocument.Statement.push({
        Action: action,
        Effect: effect,
        Resource: resource
    });
    return this;
};

Policy.prototype.roles = function (roles) {
    if (!(roles instanceof Array)) {
        roles = [roles];
    }
    this.node.Properties.Roles = roles;
};

module.exports = Policy;
