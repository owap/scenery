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
var Policy = function (id, description) {
    Resource.call(this, id, 'AWS::IAM::Policy', {
        'PolicyDocument': {
            'Statement': []
        }
    });
    return this;
};
require('util').inherits(Policy, Resource);

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
