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
var Validator = require('../lib/Validator.js');

var Role = require('../lib/iam/Role.js');
var Policy = require('../lib/iam/Policy.js');
var InstanceProfile = require('../lib/iam/InstanceProfile.js');

exports.testCreateSimpleProfile = function(test) {
    test.expect(2);

    var t = new Template();
    var ip = new InstanceProfile();
    t.addResource(ip);

    var instanceProfiles = t.getResourcesByType('AWS::IAM::InstanceProfile');
    test.ok(1 === instanceProfiles.length);
    test.deepEqual(ip, instanceProfiles[0]);

    test.done();
};

exports.testCreateSimpleRole = function(test) {
    test.expect(2);

    var t = new Template();
    var r = new Role();
    t.addResource(r);

    var roles = t.getResourcesByType('AWS::IAM::Role');
    test.ok(1 === roles.length);
    test.deepEqual(r, roles[0]);

    test.done();
};

exports.testCreateSimplePolicy = function(test) {
    test.expect(2);

    var t = new Template();
    var p = new Policy();
    t.addResource(p);

    var policies = t.getResourcesByType('AWS::IAM::Policy');
    test.ok(1 === policies.length);
    test.deepEqual(p, policies[0]);

    test.done();
};

exports.testIAMInstanceProfileRoles = function(test) {
    test.expect(3);
    var filePath = '/tmp/testIAMResources.json';
    var t = new Template();

    var r = new Role('myTestRole');
    r.assumeRolePolicyDocument = {
      'Statement': [
        {
          'Effect': 'Allow',
          'Principal': {
            'Service': [
              'ec2.amazonaws.com'
            ]
          },
          'Action': [
            'sts:AssumeRole'
          ]
        }
      ]
    };

    var ip = new InstanceProfile('myTestInstanceProfile');
    ip.roles( t.ref('myTestRole') );

    t.addResource(r);
    t.addResource(ip);

    test.ok(!!t);
    t.save(filePath);

    function validationCallback(isValid, message){
        if(!isValid){
            console.log(message);
        }
        test.ok(isValid);
        test.ok(!!message);
        test.done();
    }

    var v = new Validator(filePath, __dirname + '/../config.json');
    v.validate(validationCallback);
};

exports.testIAMInstanceProfilePolicies = function(test) {
    test.expect(3);
    var filePath = '/tmp/testIAMResources2.json';
    var t = new Template();

    var p = new Policy('myTestPolicy');
    var effect = 'Allow';
    var action = [
        'cloudwatch:EnableAlarmActions',
        'cloudwatch:PutMetricData',
        'cloudwatch:PutMetricAlarm' ];
    var resource = [ '*' ];
    p.statement(action, effect, resource);

    var r = new Role('myTestRole');
    r.policies( [t.ref('myTestPolicy')] );

    var ip = new InstanceProfile('myTestInstanceProfile');
    ip.roles( t.ref('myTestRole') );

    t.addResource(r);
    t.addResource(p);
    t.addResource(ip);

    test.ok(!!t);
    t.save(filePath);

    function validationCallback(isValid, message){
        if(!isValid){
            console.log(message);
        }
        test.ok(isValid);
        test.ok(!!message);
        test.done();
    }

    var v = new Validator(filePath, __dirname + '/../config.json');
    v.validate(validationCallback);
};
