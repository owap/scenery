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

var fs = require('fs');

var Parameter = require('./Parameter.js');
var Resource = require('./Resource.js');
var Registry = require('./Registry.js');

/**
 * Used when constructing a CF Template file from JSON to ensure that the
 * loaded object is equal to the object that created the template
 **/
function buildParameterObjects(parameters){
    var localObj = {};
    for(var key in parameters){
        var node = parameters[key];
        localObj[key] = { id: key, node: node };
    }
    return localObj;
}

function instantiateResourceObjects(resources){
    var newSection = {};
    var registry = new Registry();

    for(var resource in resources){
        var node = resources[resource];
        if(!node.Type){
            continue;
        }
        var ResourceClass = registry.getClass(node.Type);

        if(typeof ResourceClass === 'undefined'){
            console.log('WARNING: Unable to find Scenery class for', node.Type);
            newSection[resource] = node;
            continue;
        }

        var object = new ResourceClass(resource);
        object.node = node;
        newSection[resource] = object;
    }

    return newSection;
}

// Template constructor
var Template = function (doc) {
    doc = doc || {};
    this.template = {
        AWSTemplateFormatVersion: doc.AWSTemplateFormatVersion || '2010-09-09',
        Description: doc.Description || '',
        Parameters: doc.Parameters || {},
        Mappings: doc.Mappings || {},
        Conditions: doc.Conditions || {},
        Resources: doc.Resources || {},
        Outputs: doc.Outputs || {}
    };
    this.parameters = {};
    if (doc.Parameters){
        this.parameters = buildParameterObjects(doc.Parameters);
    }
    this.resources = {};
    if (doc.Resources){
        this.resources = instantiateResourceObjects(doc.Resources);
    }
};

Template.parseJSON = function (path) {
    var fileContents = fs.readFileSync(path, 'utf8');
    var json = JSON.parse(fileContents);
    return json;
};

Template.parse = function (path) {
    var template = new Template(Template.parseJSON(path));
    return template;
};

Template.prototype.save = function (path) {
    var contents = JSON.stringify(this.template, null, '    ');
    fs.writeFileSync(path, contents);
};

Template.Ref = function (refId) {
    return { 'Ref': refId };
};

Template.prototype.addResource = function (obj) {
    this.template.Resources[obj.id] = obj.node;
    this.resources[obj.id] = obj;
    return obj;
};

Template.prototype.getResource = function (id) {
    return this.resources[id];
};

Template.prototype.getResourcesByType = function (type) {
    var objects = [];
    for(var key in this.resources) {
        var object = this.resources[key];
        if(object.node.Type && type === object.node.Type){
            objects.push(object);
        }
    }
    return objects;
};

Template.prototype.removeResourceByKey = function(key) {
    try {
        delete this.resources[key];
        delete this.template.Resources[key];
    } catch (e) {
        console.log('Failed to remove resource for key', key, ':', e);
        return false;
    }
    return true;
};

Template.prototype.removeParameterByKey = function(key) {
    try {
        delete this.parameters[key];
        delete this.template.Parameters[key];
    } catch (e) {
        console.log('Failed to remove parameter with key', key, ':', e);
        return false;
    }
    return true;
};

Template.prototype.resource = function (id, type, properties) {
    return this.addResource(new Resource(id, type, properties));
};

Template.prototype.parameter = function (obj) {
    this.template.Parameters[obj.id] = obj.node;
    this.parameters[obj.id] = obj;
    return obj;
};

Template.prototype.ref = function (refId) {
    return Template.Ref(refId);
};

Template.FnGetAtt = function (resource, attribute) {
    return { 'Fn::GetAtt': [ resource, attribute]};
};

Template.prototype.fnGetAtt = function (resource, attribute) {
    return Template.FnGetAtt(resource, attribute);
};

Template.prototype.toJSON = function () {
    console.log(JSON.stringify(this.template, 2, ' '));
};

Template.prototype.strParam = function (id, defaultValue, description) {
    return this.parameter(new Parameter(id, 'String', defaultValue, description));
};

Template.prototype.numParam = function (id, defaultValue, description, options) {
    return this.parameter(new Parameter(id, 'Number', defaultValue, description, options));
};

Template.prototype.output = function (id, value, description) {
    this.template.Outputs[id] = {
        Description: description,
        Value: value
    };
    return this;
};

module.exports = Template;
