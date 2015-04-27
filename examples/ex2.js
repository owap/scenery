/**
 * Example 2: Modify the instance we created in Example 1
 **/
 
var Template = require('../lib/Template.js');

// Read in the CloudFormation JSON file
var t2 = Template.parse('./ex1.json');

// Find all the AWS::EC2::Instances in the template
var ec2Instances = t2.getResourcesByType('AWS::EC2::Instance');

// Modify the the first (and only) instance in the template
var i2 = ec2Instances[0];
i2.addName('Example 2 Test Instance');  // Modify the image name
i2.ImageId('ami-000000');         // Modify the ImageId
i2.InstanceType('t1.micro');      // Add an InstanceType

// Save our modified template
t2.save('ex2.json');