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

var _ = require('lodash');

function Parameter(id, type, defaultValue, description, options) {
    this.id = id;
    this.node = {
        Type: type
    };
    if (description) {
        this.node.Description = description;
    }
    if (defaultValue) {
        this.node.Default = defaultValue;
    }
    _.extend(this.node, options);
    return this;
}

Parameter.prototype.ref = function () {
    return { 'Ref': this.id };
};

Parameter.prototype.minLength = function (min) {
    this.node.MinLength = min + '';
};

Parameter.prototype.maxLength = function (max) {
    this.node.MaxLength = max + '';
};

Parameter.prototype.allowedValues = function (values) {
    if (!(values instanceof Array)) {
        values = [values];
    }
    this.node.AllowedValues = values;
    return this;
};

module.exports = Parameter;
