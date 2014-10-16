'use strict';

/**
 * Attempt to create the minimum viable template and validate that the aws-sdk
 * validator marks it as valid
 **/
var Template = require('../lib/Template.js');
var Validator = require('../lib/Validator.js');

exports.testJustEC2 = function(test){
    // Set up the template
    var t = new Template();
    var filePath = '/tmp/minimum_valid_test_template.json';

     t.ec2Instance('TestInstance')
        .keyName('test-key')
        .imageId('ami-123456')
        .name('TestInstance');

    t.save(filePath);

    // Assertions
    test.expect(2);

    function validationCallback(isValid, message){
        test.ok(isValid);
        test.ok(!!message);
        test.done();
    }

    var v = new Validator(filePath);
    v.validate(validationCallback);
};
