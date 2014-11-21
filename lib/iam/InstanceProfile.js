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
var InstanceProfile = function (id, description, path, roles) {
    Resource.call(this, id, 'AWS::IAM::InstanceProfile', {'Path': path});

    if (!(roles instanceof Array)) {
        roles = [roles];
    }
    this.node.Properties.Roles = roles;
    return this;
};
require('util').inherits(InstanceProfile, Resource);

InstanceProfile.prototype.path = function(value) {
    this.node.Properties.Roles = value;
    return this;
};

InstanceProfile.prototype.roles = function(value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.Roles = value;
    return this;
};

module.exports = InstanceProfile;
