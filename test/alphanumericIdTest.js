'use strict';

var Instance = require ('../lib/EC2/Instance.js');
var _ = require('lodash');

exports.alphanumericIdTest = function(test){
    test.expect(5);

    // Assert that an invalid IDs fail
    test.throws(function(){
        var invalidResource = new Instance('_-@#$');
    });
    test.throws(function(){
        var invalidResource = new Instance('my-hyphenated-resource');
    });

    // Assert that an empty string does not fail, because AWS accepts these
    test.doesNotThrow(function(){
        var invalidResource = new Instance('');
    });

    // Assert that a valid ID is successful
    test.doesNotThrow(function(){
        var invalidResource = new Instance('myFineResource');
    });

    // Undefined IDs are valid, because sometimes we'll instantiate objects and THEN populate them
    test.doesNotThrow(function(){
        var invalidResource = new Instance();
    });

    test.done();
};
