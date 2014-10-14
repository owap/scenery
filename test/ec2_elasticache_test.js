'use strict';

/**
 * Attempt to create a template containing an elasticache instance.
 **/
var Template = require('../lib/Template.js');
var Validator = require('../lib/Validator.js');

exports.testJustEC2 = function(test){
    // Create the template
    var t = new Template();
    var filePath = '/tmp/elasticache_test_template.json';

    t.elastiCacheCluster('TestECC')
        .autoMinorVersionUpgrade('true')
        .cacheNodeType('cache.m3.medium')
        .engine('memcached')
        .numCacheNodes(1);

    t.save(filePath);

    // Validate the template
    test.expect(2);

    function validationCallback(isValid, message){
        test.ok(isValid);
        test.ok(!!message);
        test.done();
    }

    var v = new Validator(filePath);
    v.validate(validationCallback);
};
