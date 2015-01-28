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
var fs = require('fs');
var Handlebars = require('handlebars');

Handlebars.registerHelper('stringify', function (obj) {
    return new Handlebars.SafeString(JSON.stringify(obj));
});

var Instance = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::Instance', { Tags: [], GroupDescription: description || ''});
};

require('util').inherits(Instance, Resource);

////////////////////////////////////////
// -- Register property prototypes -- //
////////////////////////////////////////
var propertyMap = {
    'keyName': 'string',
    'imageId': 'string',
    'instanceProfile': 'string',
    'instanceType': 'string',
    'securityGroups': 'referenceArray',
    'subnetId': 'reference',
    'userData': 'string'
};
Instance = Resource.registerPropertyPrototypes(Instance, propertyMap);

///////////////////////////////////////////////////
// -- Special, additional property prototypes -- //
///////////////////////////////////////////////////
Instance.prototype.name = function (name) {
    this.node.Properties.Tags.push({'Key': 'Name', Value: name, 'PropagateAtLaunch': 'true'});
    return this;
};

Instance.prototype.userDataTemplateFile = function (path, data) {
    var template = fs.readFileSync(path, 'utf8');
    var txt = Handlebars.compile(template, {noEscape: true})(data);

    var lines = txt.split('\n');
    var lines2 = [];
    lines.forEach(function (line) {
        if ('' !== line) {
            lines2.push('"' + line + '"');
            lines2.push('"\\n"\n');
        }
    });

    var userDataStr = '{"Fn::Base64": { "Fn::Join": ["", [' + lines2.join(',') + ']]}}';
    var userData = JSON.parse(userDataStr);
    this.userData(userData);
};

module.exports = Instance;
