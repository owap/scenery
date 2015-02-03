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

exports.modifyMachine = function(test){
    var Scenery = require('../scenery.js');
    var Template = Scenery.Template;
    var filePath = '/tmp/myCloudformationTemplate.json';

    var t = new Template();

    // Create a single EC2 instance in the tempalte
    t.ec2Instance('TestInstance')
            .KeyName('test-key')
            .ImageId('ami-123456')
            .Name('TestInstance');

    // Output Cloudformation JSON
    t.save(filePath);

    var modifiedTemplate = Template.parse(filePath);
    var ec2Instances = modifiedTemplate.getResourcesByType('AWS::EC2::Instance');

    // The ec2Instances var is an array of Scenery Instance objects
    var modifiedInstance = ec2Instances[0];
    modifiedInstance.ImageId('ami-654321');
    modifiedInstance.InstanceType('t1.micro');
    modifiedTemplate.save('/tmp/modifiedTemplate.json');

    test.expect(0);
    test.done();
};

exports.deleteMachine = function(test){
    var Scenery = require('../scenery.js');
    var Template = Scenery.Template;
    var filePath = '/tmp/myCloudformationTemplate.json';

    var t = new Template();

    // Create a single EC2 instance in the tempalte
    t.ec2Instance('TestInstance')
            .KeyName('test-key')
            .ImageId('ami-123456')
            .Name('TestInstance');

    // Output Cloudformation JSON
    t.save(filePath);

    var modifiedTemplate = Template.parse(filePath);
    var ec2Instances = modifiedTemplate.getResourcesByType('AWS::EC2::Instance');

    // Remove the ec2 instance
    var modifiedInstance = ec2Instances[0];
    var key = modifiedInstance.id;
    modifiedTemplate.removeResourceByKey(key);
    modifiedTemplate.save('/tmp/modifiedTemplate2.json');

    test.expect(0);
    test.done();
};

exports.deleteParams = function(test){
    var Scenery = require('../scenery.js');
    var Template = Scenery.Template;
    var filePath = '/tmp/paramTest.json';

    var it = new Template();
    var paramKey = 'TestParam',
        paramValue = 'Test Value ';

    // Add three params to the template
    for(var i=0; i<3; i++){
        it.strParam(paramKey+i, paramValue+i);
    }
    it.save(filePath);

    var t = Template.parse(filePath);
    t.removeParameterByKey('TestParam0');
    t.removeParameterByKey('TestParam2');
    t.save('/tmp/fewerParams.json');

    test.expect(0);
    test.done();
};
