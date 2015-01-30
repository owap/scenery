// Copyright 2014 OpenWhere, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Test the instantiation of the Scenery module
 **/

exports.registryTest = function(test){
    var Registry = require('../lib/Registry.js');
    var registry = new Registry();

    test.expect(2);
    test.ok(!!registry.awsClassMap);

    var ExpectedInstance = require('../lib/ec2/Instance.js');
    var TestInstance = registry.getClass('AWS::EC2::Instance');

    test.deepEqual(TestInstance, ExpectedInstance, 'The registered class should equal the class referenced by the AWS moniker');
    test.done();
};
