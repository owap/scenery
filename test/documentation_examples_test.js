'use strict';

exports.modifyMachine = function(test){
    var Spatula = require('../spatula.js');
    var Template = Spatula.Template;
    var filePath = '/tmp/myCloudformationTemplate.json';

    var t = new Template();

    // Create a single EC2 instance in the tempalte
    t.ec2Instance('TestInstance')
            .keyName('test-key')
            .imageId('ami-123456')
            .name('TestInstance');

    // Output Cloudformation JSON
    t.save(filePath);

    var modifiedTemplate = Template.parse(filePath);
    var ec2Instances = modifiedTemplate.getResourcesByType('AWS::EC2::Instance');

    // The ec2Instances var is an array of Spatula Instance objects
    var modifiedInstance = ec2Instances[0];
    modifiedInstance.imageId('ami-654321');
    modifiedInstance.instanceType('t1.micro');
    modifiedTemplate.save('/tmp/modifiedTemplate.json');

    test.expect(0);
    test.done();
};

exports.deleteMachine = function(test){
    var Spatula = require('../spatula.js');
    var Template = Spatula.Template;
    var filePath = '/tmp/myCloudformationTemplate.json';

    var t = new Template();

    // Create a single EC2 instance in the tempalte
    t.ec2Instance('TestInstance')
            .keyName('test-key')
            .imageId('ami-123456')
            .name('TestInstance');

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
    var Spatula = require('../spatula.js');
    var Template = Spatula.Template;
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
