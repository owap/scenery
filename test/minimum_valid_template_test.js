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

/**
 * Attempt to create the minimum viable template and validate that the aws-sdk
 * validator marks it as valid
 **/
var Template = require('../lib/Template.js');
var Instance = require('../lib/EC2/Instance.js');
var Validator = require('../lib/Validator.js');

exports.testJustEC2 = function(test){
    // Set up the template
    var t = new Template();
    var filePath = '/tmp/minimum_valid_test_template.json';

    t.addResource( new Instance('TestInstance')
        .KeyName('test-key')
        .ImageId('ami-123456')
        .addName('TestInstance')
    );

    t.save(filePath);

    // Assertions
    test.expect(2);

    function validationCallback(err, message){
        test.ok(!err);
        test.ok(!!message);
        test.done();
    }

    var v = new Validator(filePath, __dirname+'/../config.json');
    v.validate(validationCallback);
};
