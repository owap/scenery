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
var Referencable = require('./Referencable.js');

function AWSClass(id, type, properties) {
    // Check to ensure we only have valid alphaneumeric characters in our ID
    if(! /^[a-z0-9]+$/i.test(id)) {
        throw 'Logical IDs must be alphaneumeric; please edit: ' + id;
    }

    this.id = id;
    this.type = type;
    this.node = {};
    if (properties) {
        _.extend(this.node, properties);
    }
    return this;
}

///////////////////////////////////////////////////////////////////////////
// -- Helper functions for keeping the code DRY and definitions small -- //
///////////////////////////////////////////////////////////////////////////
function InvalidPropertyException(message) {
    this.message = message;
    this.name = 'InvalidPropertyException';
}
AWSClass.InvalidPropertyException = InvalidPropertyException;

function checkPrimitiveType(key, value, propertyType) {
    // References will evaluate to strings, so it'll be ok!
    if(propertyType === 'string' && typeof value === 'object' && (value.ref || value.Ref) ){
        return true;
    }
    // Everything that's not okay, let's throw a helpful error
    if(typeof value !== propertyType){
        throw new InvalidPropertyException('Invalid value passed to ' + key +
            '. Expected type ' + propertyType + ' but was ' + (typeof value));
    }
    return true;
}

function checkObjectType(key, value, propertyType) {
    // Catch errors for all the other nasty things
    if(!(value instanceof propertyType)){
        throw new InvalidPropertyException('Invalid value passed to ' + key +
            '. Please ensure the object passed is an instance of ' + propertyType);
    }
    return true;
}

function getValueToAppendToTemplate(value) {
    if(value instanceof Referencable || value.ref) {
        return value.ref();
    } else if(value.Ref) {      // Is a reference object: { Ref: 'logicalId' }
        return value;
    } else if (value.node) {    // Is a typed property -- get its node contents
        return value.node;
    } else {                    // Is a primitive
        return value;
    }
}

var createPropertyFunction = function(key, isList, propertyType) {
    var fluentFunction = function(value) {

        // Add error checking for any invalid values passed in
        if(isList && !(value instanceof Array)){
            throw new InvalidPropertyException(key + ' expects a list of one or more ' +
                typeof propertyType);
        }

        if(isList && value instanceof Array) {
            var i = value.length - 1;
            for(i; i>-1; i--){
                if(typeof propertyType === 'string'){
                    checkPrimitiveType(key, value[i], propertyType);
                }
                else if(typeof propertyType === 'function' || typeof propertyType === 'object') {
                    checkObjectType(key, value[i], propertyType);
                }
                else {
                    throw new InvalidPropertyException(
                        'propertyType (' + propertyType + ') is of an invalid type.' +
                        '\nMust be a string representing a primitive, or an object');
                }
            }
        } else {
            if(typeof propertyType === 'string'){
                checkPrimitiveType(key, value, propertyType);
            }
            else if(typeof propertyType === 'function' || typeof propertyType === 'object') {
                checkObjectType(key, value, propertyType);
            }
        }

        // All validations pass; add the value to the document

        if(isList && value instanceof Array){
            // If we receive a list of values, we must transform every one
            var j = value.length - 1;
            var newList = [];
            for(j; j>-1; j--){
                newList.push( getValueToAppendToTemplate(value[j]) );
            }
            // Properties don't have a "Properties" key in their node
            if(this instanceof AWSClass && !(this.node.Properties)){
                this.node[key] = newList;
            }
            // Resources and their subclasses DO have a properties key in their node
            else {
                this.node.Properties[key] = newList;
            }
        } else {
            // Properties don't have a "Properties" key in their node
            if(this instanceof AWSClass && !(this.node.Properties)){
                this.node[key] = getValueToAppendToTemplate(value);
            }
            // Resources and their subclasses DO have a properties key in their node
            else {
                this.node.Properties[key] = getValueToAppendToTemplate(value);
            }
        }
        return this;
    };
    return fluentFunction;
};

AWSClass.registerPropertyPrototypes = function(klass, propertyMap) {
    for (var property in propertyMap) {
        if (!propertyMap.hasOwnProperty(property)) {
            continue;
        }
        var propertyInfo = propertyMap[property];
        var isList = propertyInfo.list;
        var propertyType = propertyInfo.type;

        klass.prototype[property] = createPropertyFunction(property, isList, propertyType);
    }
    return klass;
};

module.exports = AWSClass;
