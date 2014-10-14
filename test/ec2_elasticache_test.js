'use strict';

/**
 * Attempt to create a template containing an ec2 and elasticache instance.
 **/
var Template = require('../lib/Template.js');
var Validator = require('../lib/Validator.js');

exports.testJustEC2 = function(test){
    // Set up the template
    var t = new Template();
    var filePath = '/tmp/minimum_valid_test_template.json';

     t.ec2Instance('TestInstance')
        .imageId('ami-123456')
        .keyName('test-key')
        .name('TestInstance');

    t.elastiCacheCluster('TestECC')
        .autoMinorVersionUpgrade('true')
        .cacheNodeType('cache.m3.medium')
        .engine('memcached')
        .numCacheNodes(1);

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
