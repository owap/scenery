'use strict';

/**
 * Test the instantiation of the Spatula module
 **/

exports.registryTest = function(test){
    var Registry = require('../lib/registry.js');
    var registry = new Registry();

    test.expect(2);
    test.ok(!!registry.awsClassMap);

    var ExpectedInstance = require('../lib/ec2/Instance.js');
    var TestInstance = registry.getClass('AWS::EC2::Instance');

    test.deepEqual(TestInstance, ExpectedInstance, 'The registered class should equal the class referenced by the AWS moniker');
    test.done();
};
