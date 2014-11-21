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

// This test asserts that roles, profiles, and policies can be loaded from
// a cloudformation template into scenery, manipulated, and re-saved as
// cloudformation templates.

var Template = require('../lib/Template.js');
var Role = require('../lib/iam/Role.js');
var path = require('path');

var originalPath = path.join(__dirname, 'landscapes', 'VPC.json');
var newPath = '/tmp/newVPC.json';

exports.testIngestRolesCF = function(test) {
    test.expect(2);

    var originalTemplate = Template.parse(originalPath);
    test.ok(!!originalTemplate);

    var roles = originalTemplate.getResourcesByType('AWS::IAM::Role');
    test.ok(2 === roles.length);
    test.done();
};

exports.testIngestProfilesCF = function(test) {
    test.expect(2);

    var originalTemplate = Template.parse(originalPath);
    test.ok(!!originalTemplate);

    var roles = originalTemplate.getResourcesByType('AWS::IAM::InstanceProfile');
    test.ok(2 === roles.length);
    test.done();
};

exports.testIngestPoliciesCF = function(test) {
    test.expect(2);

    var originalTemplate = Template.parse(originalPath);
    test.ok(!!originalTemplate);

    var roles = originalTemplate.getResourcesByType('AWS::IAM::Policy');
    test.ok(0 === roles.length);
    test.done();
};

exports.testExportNewRole = function(test) {
    test.expect(1);

    var modifiedTemplate = Template.parse(originalPath);
    var newRole = new Role('myNewTestRole');
    modifiedTemplate.addResource(newRole);

    var roles = modifiedTemplate.getResourcesByType('AWS::IAM::Role');
    test.ok(3 === roles.length);

    modifiedTemplate.save(newPath);
    test.done();
};

exports.testCompareLoadedIAMDocs = function(test) {
    test.expect(1);
    var newDocPath = '/tmp/newDoc.json';

    var originalTemplate = Template.parse(originalPath);
    originalTemplate.save(newDocPath);

    var newTemplate = Template.parse(newDocPath);
    
    test.deepEqual(originalTemplate, newTemplate);
    test.done();
};
