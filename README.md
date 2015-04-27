# Scenery: CloudFormation Templates in Javascript
[![Code Climate](https://codeclimate.com/github/OpenWhere/scenery/badges/gpa.svg)](https://codeclimate.com/github/OpenWhere/scenery)

Scenery aims to simplify the creation of CloudFormation templates by using
Javascript to generate them. This makes loops, variables, conditional logic, and
convenience functions available for template generation, significantly reducing
the number of lines needed while improving consistency throughout templates.

The entire [AWS CloudFormation API](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-reference.html)
is available for use in Scenery, thanks to the [Scenery Generator](https://github.com/OpenWhere/scenery_generator)
project, which generates Scenery classes from the Cloudformation docs.

Please see the [examples](https://github.com/OpenWhere/scenery/tree/master/examples) folder for sample Scenery templates and the
resulting CloudFormation template.

## Setup
+ Run `npm install` in the root Scenery directory
+ If you are not running on an EC2 instance, and you wish to run validations
on your CloudFormation templates, you must add your AWS credentials to a file
`config.json`:
```json
{
    "accessKeyId": "YOUR_ACCESS_KEY_ID",
    "secretAccessKey": "YOUR_SECRET_ACCESS_KEY",
    "region": "us-east-1"
}
```
If you are running Scenery from an EC2 Instance, this information should be
loaded automatically from the IAM roles. See [Setting AWS Credentials](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html)
for more information on this topic.

## Developing
+ Running `grunt` in the directory will:
    - Run `jshint` on all JS documents
    - Run unit tests to make sure everything is passing correctly

## Building CloudFormation Templates
To get started quickly, please see the [examples](https://github.com/OpenWhere/scenery/tree/master/examples)
folder for sample Scenery templates and the resulting CloudFormation template.

Building CloudFormation templates can be boiled down into four basic steps:

1. Include the Scenery classes you intend to use at the top of your file
2. Create the Parameters and Resources you want to appear in your template
3. Append these Parameters and Resources to a Template object
4. Call `save()` on the template object, which writes the CloudFormation object to the specified path.

Here's a simple example:

```javascript
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
```
The [resulting CloudFormation Template](https://github.com/OpenWhere/scenery/tree/master/examples/ex1.json)
is nearly twice as long and much less readable.

Check out some more complex templates in the [examples](https://github.com/OpenWhere/scenery/tree/master/examples/) folder.

## Modifying Existing Cloudformation Template
Load and modify the template we created above:

```javascript
// Read in the CloudFormation JSON file
var t2 = Template.parse('./ex1.json');

// Find all the AWS::EC2::Instances in the template
var ec2Instances = t2.getResourcesByType('AWS::EC2::Instance');

// Modify the the first (and only) instance in the template
var i2 = ec2Instances[0];
i2.addName('Example 2 Test Instance');  // Modify the image name
i2.ImageId('ami-000000');               // Modify the ImageId
i2.InstanceType('t1.micro');            // Add an InstanceType
```

Saving this template creates one that's identical to the one we made in `ex1`,
with the exception of our single EC2 instance:

```json
...
        "InstanceId": {
            "Type": "AWS::EC2::Instance",
            "Properties": {
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Example 2 Test Instance"
                    }
                ],
                "ImageId": "ami-000000",
                "InstanceType": "t1.micro",
                "KeyName": {
                    "Ref": "keyName"
                }
            }
        }
...
```

## Deleting Cloudformation Template Resources
We can also remove resources from templates:

```javascript
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
```

This results in a template that maintains the Parameters present in Examples 1
and 2, but we deleted our once instances, so we have no Resources in the template:

```json
{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "",
    "Parameters": {
        "keyName": {
            "Type": "String",
            "Description": "Name of an existing keypair to use for accessing the instance",
            "Default": "demo"
        },
        "image": {
            "Type": "String",
            "Description": "ID of the AMI image to use",
            "Default": "ami-ecf9a184"
        },
        "instanceType": {
            "Type": "String",
            "Description": "The type of instance (compute capacity, etc.) to be created",
            "Default": "m3.medium"
        }
    },
    "Mappings": {},
    "Conditions": {},
    "Resources": {},
    "Outputs": {}
}
```

## Deleting Cloudformation Template Parameters
Similar to how we delete Resources, we can delete parameters from our Template
object by invoking the `removeParameterByKey` function. Let's say we have the
following CF Template with three parameters:
```json
{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "",
    "Parameters": {
        "TestParam0": {
            "Type": "String",
            "Default": "Test Value 0"
        },
        "TestParam1": {
            "Type": "String",
            "Default": "Test Value 1"
        },
        "TestParam2": {
            "Type": "String",
            "Default": "Test Value 2"
        }
    },
    "Mappings": {},
    "Conditions": {},
    "Resources": {},
    "Outputs": {}
}
```

The following Javascript demonstrates how to remove two of the three parameters
from the above CF template:
```javascript
var t = Template.parse(filePath);
t.removeParameterByKey('TestParam0');
t.removeParameterByKey('TestParam2');
t.save('/tmp/fewerParams.json');
```

When we open `/tmp/fewerParams.json`, we see that there is only one parameter
remaining:
```json
{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "",
    "Parameters": {
        "TestParam1": {
            "Type": "String",
            "Default": "Test Value 1"
        }
    },
    "Mappings": {},
    "Conditions": {},
    "Resources": {},
    "Outputs": {}
}
```

## Validing CloudFormation Templates
Assuming that your CloudFormation script is kept in a file `/tmp/MyCFTemplate.json`,
and that your AWS credentials are kept in a file `/opt/aws_config.json`,
the following block of code shows how the Validator class can be used to invoke
the `aws-sdk` to validate your template.

```javascript
// First, define a callback function to be invoked after validation
function validationCallback(isValid, message){
    if(!isValid){
        console.log('CloudFormation template is invalid because:', message);
    } else {
        console.log(message);
    }
}

// Second, instantiate a Validator object, passing in two arguments:
//    - The path to your CloudFormation Template
//    - The path to your AWS Config

var Validator = require('./lib/Validator.js');
var myValidator = Validator('/tmp/MyCFTemplate.json', '/opt/aws_config.json');

// Finally, invoke the validator, passing the callback we defined above
myValidator.validate(validationCallback);
```

### Sample Output
The following (invalid) template was passed to the validator:

```json
{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "",
    "Parameters": {
        "TestParam": {
            "Type": "String",
            "Description": "A test parameter to assert that unit tests work correctly",
            "Default": "This is a test"
        }
    },
    "Mappings": {},
    "Conditions": {},
    "Resources": {},
    "Outputs": {}
}
```

The Validator, when run with the sample code above, produced the following output:

```
CloudFormation template is invalid because: { [ValidationError: Template format error: At least one Resources member must be defined.]
message: 'Template format error: At least one Resources member must be defined.',
code: 'ValidationError',
time: Sat Oct 11 2014 08:57:50 GMT-0400 (EDT),
statusCode: 400,
retryable: false }
```

As you can see, the output from the `aws-sdk` is passed through the
`message` var of the `validationCallback` function we defined above.

## Troubleshooting
### ConfigError: Missing region in config
If you see this error, and you are not on an EC2 instance:

+ Configure your `config.json` file per the setup section at the top of this
document
+ Pass the URL of this config file you specified above into the Validator
object when you instantiate it:
```javascript
var myValidator = Validator('/tmp/MyCFTemplate.json', '/opt/aws_config.json');
```
