/**
 * Example 1: A simple Scenery template for creating a single EC2 instance
 **/
 
// Create a new template object
var Template = require('../lib/Template.js');
var t = new Template();

// Add some string parameters to our template.
t.strParam('keyName', 'demo', 'Name of an existing keypair to use for accessing the instance');
t.strParam('image', 'ami-ecf9a184', 'ID of the AMI image to use');
t.strParam('instanceType', 'm3.medium', 'The type of instance (compute capacity, etc.) to be created');

// Create the AWS::EC2::Instance
var Instance = require('../lib/EC2/Instance.js');
var i = new Instance('InstanceId')
                .addName('Example 1 Test Instance')
                .ImageId(t.ref('image'))
                .InstanceType(t.ref('instanceType'))
                .KeyName(t.ref('keyName'));
                
// Add our instance to our template
t.addResource(i);

// Write out the CloudFormation template
t.save('ex1.json');