'use strict';

/**
 * Attempt to create a CloudFormation template that contains nothing but
 * some parameters
 **/
exports.testTemplateOnlyParameters = function(test){

    // Create and save the template
    var Template = require('../lib/Template.js');
    var t = new Template();
    var filePath = '/tmp/test-template.json';

    var paramKey = 'TestParam',
        paramValue = 'This is a test',
        paramDesc = 'A test parameter to assert that unit tests work correctly';

    t.strParam(paramKey, paramValue, paramDesc);
    t.save(filePath);

    // Read saved template
    var fs = require('fs');
    var tLoaded = Template.parse(filePath);
    test.expect(4);

    test.deepEqual(tLoaded, t,
            'The template loaded from a file should be equal to the template which generated the file');
    test.ok((paramKey in tLoaded.template.Parameters),
            'Template parameters should contain the key we set');
    test.strictEqual(tLoaded.template.Parameters[paramKey].Default, paramValue,
            'Default value should equal the param value');
    test.strictEqual(tLoaded.template.Parameters[paramKey].Description, paramDesc,
            'Param description should equal the description we assign it');

    test.done();
};
