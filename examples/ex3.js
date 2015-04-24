/**
 * Example 3: Delete the instance we created in Example 1 and modified in Example 2
 **/
 
var Template = require('../lib/Template.js');

// Read in the CloudFormation JSON file
var t3 = Template.parse('./ex2.json');

// Find all the AWS::EC2::Instances in the template
var ec2Instances = t3.getResourcesByType('AWS::EC2::Instance');

// Get the logical ID of our one EC2 instance
var logicalId = ec2Instances[0].id;
t3.removeResourceByKey(logicalId);

// Save our modified template
t3.save('ex3.json');