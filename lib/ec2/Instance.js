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

var Instance = function (id) {
    return Resource.call(this, id, 'AWS::EC2::Instance', { Tags: [] });
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
    'securityGroupIds': 'referenceArray',
    'subnetId': 'reference',
    'userData': 'string'
};
Instance = Resource.registerPropertyPrototypes(Instance, propertyMap);

///////////////////////////////////////////////////
// -- Special, additional property prototypes -- //
///////////////////////////////////////////////////
Instance.prototype.publicIP = function(subnetId, GroupSet){
    if( this.node.Properties.NetworkInterfaces === null){
        this.node.Properties.NetworkInterfaces =[];
    }
    
    //TODO refactor resource propertries - need a base case resource 
    if(typeof subnetId === 'string') {
            subnetId = { 'Ref': subnetId };
    }
    
    // If there's only one ref, encapsulate it in an array
    if (!(GroupSet instanceof Array)) {
        GroupSet = [GroupSet];
    }
    // Automatically convert to references if the values are strings
    for(var i=0; i<GroupSet.length; i++){
        if(typeof GroupSet[i] === 'string'){
            GroupSet[i] = { 'Ref': GroupSet[i] };
        }
    }
    
    var nic = {'AssociatePublicIpAddress' : true, 'DeviceIndex':'0','SubnetId':subnetId, 'GroupSet':GroupSet};
    this.node.Properties.NetworkInterfaces.push(nic);

    //TODO ensure no subnet Id on instance! 
    return this;
};

Instance.prototype.name = function (name) {
    if( this.node.Properties.Tags === null){
        this.node.Properties.Tags =[];
    }
    this.node.Properties.Tags.push({'Key': 'Name', Value: name});
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
