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
 * Attempt to create a CloudFormation template that contains nothing but
 * some parameters
 **/
var Template = require('../lib/Template.js');
var Validator = require('../lib/Validator.js');
var fs = require('fs');

exports.testInvalidTemplateParamsOnly = function(test){
    // Create and save the template
    var t = new Template();
    var filePath = '/tmp/invalid_test_template.json';

    var paramKey = 'TestParam',
        paramValue = 'This is a test',
        paramDesc = 'A test parameter to assert that unit tests work correctly';

    t.strParam(paramKey, paramValue, paramDesc);
    t.save(filePath);

    // Read saved template
    var tLoaded = Template.parse(filePath);
    test.expect(7);

    // Test that the template we load equals the one we created above
    test.deepEqual(tLoaded, t,
            'The template loaded from a file should be equal to the template which generated the file');
    test.ok((paramKey in tLoaded.template.Parameters),
            'Template parameters should contain the key we set');
    test.strictEqual(tLoaded.template.Parameters[paramKey].Default, paramValue,
            'Default value should equal the param value');
    test.strictEqual(tLoaded.template.Parameters[paramKey].Description, paramDesc,
            'Param description should equal the description we assign it');

    // Assert that this template is invalid because there are no Resources (only Parameters)
    function validationCallback(isValid, message){
        test.ok(!isValid);
        test.ok(message.message.indexOf(
            'At least one Resources member must be defined') > -1);
        test.done();
    }

    // Assert that no errors are thrown when invoking Validate
    test.doesNotThrow(function(){
        var v = new Validator(filePath, __dirname+'/../config.json');
        v.validate(validationCallback);
    });
};
