'use strict';

/**
 * Test the instantiation of the Spatula module
 **/

exports.testSpatulaModule = function(test){
    var Spatula = require('../spatula.js');
    test.expect(1);
    test.ok(!!Spatula);
    test.done();
};
