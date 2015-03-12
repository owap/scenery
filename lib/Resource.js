// Copyright 2015 OpenWhere, Inc.
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
var modelo = require('modelo');
var AWSClass = require('./AWSClass.js');
var Referencable = require('./Referencable.js');

function Resource(id, type, properties, template) {
    // Check to ensure we only have valid alphaneumeric characters in our ID
    if(id && ! /^[a-z0-9]+$/i.test(id) ) {
        throw 'Logical IDs must be alphaneumeric; please edit: ' + id;
    }
    this.id = id;
    this.template = template;
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

modelo.inherits(Resource, Referencable, AWSClass);

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
