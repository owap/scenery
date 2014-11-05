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
var Handlebars = require('Handlebars');

Handlebars.registerHelper('stringify', function (obj) {
    return new Handlebars.SafeString(JSON.stringify(obj));
});

var Instance = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::Instance', { Tags: [], GroupDescription: description || ''});
};

require('util').inherits(Instance, Resource);

Instance.prototype.keyName = function (keyName) {
    this.node.Properties.KeyName = keyName;
    return this;
};

Instance.prototype.imageId = function (imageId) {
    this.node.Properties.ImageId = imageId;
    return this;
};

Instance.prototype.instanceType = function (instanceType) {
    this.node.Properties.InstanceType = instanceType;
    return this;
};

Instance.prototype.instanceProfile = function (instanceProfile) {
    this.node.Properties.IamInstanceProfile = instanceProfile;
    return this;
};

Instance.prototype.securityGroups = function (securityGroups) {
    if (!(securityGroups instanceof Array)) {
        securityGroups = [securityGroups];
    }

    // Automatically convert to references if the values are strings
    for(var i=0; i<securityGroups.length; i++){
        if(typeof securityGroups[i] === 'string'){
            securityGroups[i] = { 'Ref': securityGroups[i] };
        }
    }

    this.node.Properties.SecurityGroups = securityGroups;
    return this;
};

Instance.prototype.name = function (name) {
    this.node.Properties.Tags.push({'Key': 'Name', Value: name, 'PropagateAtLaunch': 'true'});
    return this;
};

Instance.prototype.subnetId = function (subnetId) {
    if(typeof subnetId === 'string'){
        subnetId = { 'Ref': subnetId };
    }
    this.node.Properties.SubnetId = subnetId;
    return this;
};

Instance.prototype.userData = function (userData) {
    this.node.Properties.UserData = userData;
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
