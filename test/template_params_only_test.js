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

    // Read saved template and perform assertions
    var fs = require('fs');
    var fileContents = fs.readFileSync(filePath, 'utf8');

    console.log(fileContents);
    test.done();
};
