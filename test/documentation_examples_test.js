'use strict';

exports.exampleWorkflow1 = function(test){
    test.expect(0);

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

    test.done();
};
