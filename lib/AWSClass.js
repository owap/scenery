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
//var Resource = require('./Resource.js');
var Referencable = require('./Referencable.js');

function AWSClass(id, type, properties, template) {
    this.template = template;
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
    if(typeof value !== propertyType){
        throw new InvalidPropertyException('Invalid value passed to ' + key +
            '. Expected type ' + propertyType + ' but was ' + (typeof value));
    }
    return true;
}

function checkObjectType(key, value, propertyType) {
    if(!(value instanceof propertyType)){
        throw new InvalidPropertyException('Invalid value passed to ' + key +
            '. Please ensure the object passed is an instance of ' + propertyType);
    }
    return true;
}

var createPropertyFunction = function(key, isList, propertyType) {
    var fluentFunction = function(value) {

        // Add error checking for any invalid values passed in
        if(isList && !(value instanceof Array)){
            throw new InvalidPropertyException(key + ' expects a list of one or more ' +
                typeof propertyType);
        }

        if(isList) {
            for(var i=value.length-1; i > -1; i--){
                if(typeof propertyType === 'string'){
                    checkPrimitiveType(key, value[i], propertyType);
                }
                else if(typeof propertyType === 'function') {
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
            else if(typeof propertyType === 'function') {
                checkObjectType(key, value, propertyType);
            }
        }

        // All validations pass; add the value to the document

        // Properties don't have a "Properties" key in their node
        if(this instanceof AWSClass && !(this.node.Properties)){
            if(value instanceof Referencable) {
                this.node[key] = value.ref();
            } else {
                this.node[key] = value;
            }
        } 
        // Resources and their subclasses DO have a properties key in their node
        else {
            if(value instanceof Referencable) {
                this.node.Properties[key] = value.ref();
            } else {
                this.node.Properties[key] = value;
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
