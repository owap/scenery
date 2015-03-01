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
var Nameable = require('./Nameable.js');
var Referencable = require('./Referencable.js');

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

modelo.inherits(Resource, Referencable, Nameable);

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

///////////////////////////////////////////////////////////////////////////
// -- Helper functions for keeping the code DRY and definitions small -- //
///////////////////////////////////////////////////////////////////////////

var createArrayProperty = function(key) {
    var fluentArrayFunction = function(value) {
        if (!value){
            value = [];
        }
        else if (!(value instanceof Array)) {
            value = [value];
        }
        this.node.Properties[key] = value;
        return this;
    };
    return fluentArrayFunction;
};

var createBooleanProperty = function(key) {
    var fluentBooleanFunction = function(value) {
        if (!(value instanceof Boolean)) {
            value = !!value;
        }
        this.node.Properties[key] = value;
        return this;
    };
    return fluentBooleanFunction;
};

var createNumberProperty = function(key) {
    var fluentNumberFunction = function(value) {
        if (!(value instanceof Number)) {
            value = Number(value);
        }
        this.node.Properties[key] = value;
        return this;
    };
    return fluentNumberFunction;
};

var createObjectProperty = function(key) {
    var fluentObjectFunction = function(value) {
        if(!(value instanceof Object)){
            value = { 'Ref': value };
        }
        this.node.Properties[key] = value;
        return this;
    };
    return fluentObjectFunction;
};

var createStringProperty = function(key) {
    var fluentStringFunction = function(value) {
        this.node.Properties[key] = value;
        return this;
    };
    return fluentStringFunction;
};

var propertyFunctionMap = {
    'Array' : createArrayProperty,
    'Boolean' : createBooleanProperty,
    'Number' : createNumberProperty,
    'Object' : createObjectProperty,
    'String' : createStringProperty
};

Resource.registerPropertyPrototypes = function(klass, propertyMap){
    for (var property in propertyMap) {
        if (!propertyMap.hasOwnProperty(property)) {
            continue;
        }
        var propertyType = propertyMap[property];
        var func = propertyFunctionMap[propertyType];
        if(!func) {
            continue;
        }
        klass.prototype[property] = func(property);
    }
    return klass;
};


module.exports = Resource;
