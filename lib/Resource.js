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

///////////////////////////////////////////////////////////////////////////
// -- Helper functions for keeping the code DRY and definitions small -- //
///////////////////////////////////////////////////////////////////////////
var createStringProperty = function(key) {
    var fluentStringFunction = function(value) {
        this.node.Properties[key] = value;
        return this;
    };
    return fluentStringFunction;
};

var createReferenceProperty = function(key) {
    var fluentReferenceFunction = function(value) {
        if(typeof value === 'string') {
            value = { 'Ref': value };
        }
        this.node.Properties[key] = value;
        return this;
    };
    return fluentReferenceFunction;
};

var createReferenceArrayProperty = function(key) {
    var fluentReferenceArrayFunction = function(arrayOfRefs) {
        // If there's only one ref, encapsulate it in an array
        if (!(arrayOfRefs instanceof Array)) {
            arrayOfRefs = [arrayOfRefs];
        }
        // Automatically convert to references if the values are strings
        for(var i=0; i<arrayOfRefs.length; i++){
            if(typeof arrayOfRefs[i] === 'string'){
                arrayOfRefs[i] = { 'Ref': arrayOfRefs[i] };
            }
        }
        this.node.Properties[key] = arrayOfRefs;
        return this;
    };
    return fluentReferenceArrayFunction;
};

var propertyFunctionMap = {
    'string' : createStringProperty,
    'reference' : createReferenceProperty,
    'referenceArray' : createReferenceArrayProperty
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
        klass.prototype[property] = func(property.charAt(0).toUpperCase() + property.slice(1));
    }
    return klass;
};


module.exports = Resource;
