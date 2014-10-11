'use strict';

/**
 * Attempt to create a CloudFormation template that contains nothing but
 * some parameters
 **/
var Template = require('../lib/Template.js');
var Validator = require('../lib/Validator.js');

exports.testTemplateOnlyParameters = function(test){
    // Create and save the template
    var t = new Template();
    var filePath = '/tmp/invalid-test-template.json';

    var paramKey = 'TestParam',
        paramValue = 'This is a test',
        paramDesc = 'A test parameter to assert that unit tests work correctly';

    t.strParam(paramKey, paramValue, paramDesc);
    t.save(filePath);

    // Read saved template
    var fs = require('fs');
    var tLoaded = Template.parse(filePath);
    test.expect(6);

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
        test.done();
    }

    // Assert that no errors are thrown when invoking Validate
    test.doesNotThrow(function(){
        var v = new Validator(filePath);
        v.validate(validationCallback);
    });
};
