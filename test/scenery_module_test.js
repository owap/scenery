'use strict';

/**
 * Test the instantiation of the Scenery module
 **/

exports.testSceneryModule = function(test){
    var Scenery = require('../scenery.js');
    test.expect(1);
    test.ok(!!Scenery);
    test.done();
};
