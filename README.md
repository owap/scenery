# Scenery: CloudFormation Templates in Javascript
Scenery aims to simplify the creation of CloudFormation templates by using
Javascript to generate them. This makes loops, variables, conditional logic, and
convenience functions available for template generation, significantly reducing
the number of lines needed while improving consistency throughout templates.

The entire [AWS CloudFormation API](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-reference.html)
is available for use in Scenery, thanks to the [Scenery Generator](https://github.com/OpenWhere/scenery_generator)
project, which generates Scenery classes from the Cloudformation docs.

Please see the [examples](#TODO) folder for sample Scenery templates and the
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
To build CloudFormation templates, require the Scenery library into your
project, and use it to instantiate `Template` (and other) objects that will
be compiled to CloudFormation Templates.

```javascript
var Scenery = require('scenery');
var filePath = '/tmp/myCloudformationTemplate.json';

var t = new Scenery.Template();

// Create a single EC2 instance in the tempalte
t.ec2Instance('TestInstance')
        .keyName('test-key')
        .imageId('ami-123456')
        .name('TestInstance');

// Output Cloudformation JSON
t.save(filePath);

// Validate Cloudformation JSON
function validationCallback(isValid, message){
    console.log('Is the template valid?', isValid, message);
}
var v = new Scenery.Validator(filePath, '/tmp/aws_config.json');
v.validate(validationCallback);
```

Invoking this code produces the following output:
```
Is the template valid? true { ResponseMetadata: { RequestId: 'a01b355f-555b-11e4-adf9-67e05ea3699c' },
  Parameters: [],
  Description: '',
  Capabilities: [] }
```

Examples of more complex CloudFormation templates can be found in the `tests/`
folder.

## Modifying Existing Cloudformation Templates
To load an existing CloudFormation template from JSON into Scenery objects,
invoke the `Template.parse()` function. For example:

```javascript
var myTemplate = Template.parse('/path/to/your/cf/template.JSON');
```

Once you've loaded objects into memory, you can reference them by their AWS
type using the template object's `getResourcesByType` function:

```javascript
var myTemplate = Template.parse('/path/to/your/cf/template.JSON');
var ec2Instances = myTemplate.getResourcesByType('AWS::EC2::Instance');

// The ec2Instances var is an array of Scenery Instance objects
var firstEc2Instance = ec2Instances[0];
```

Now that you have access to individual resources, you can modify them with
standard Scenery functions. Save the template again to see the difference!

### Example Workflow
Below is an example workflow that highlights Scenery's ability to modify
Cloudformation templates.

#### Create a CloudFormation Template in Javascript
```javascript
var Scenery = require('scenery');
var filePath = '/tmp/myCloudformationTemplate.json';

var t = new Scenery.Template();

// Create a single EC2 instance in the tempalte
t.ec2Instance('TestInstance')
        .keyName('test-key')
        .imageId('ami-123456')
        .name('TestInstance');

// Output Cloudformation JSON
t.save(filePath);
```
This yields the following template:
```json
{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "",
    "Parameters": {},
    "Mappings": {},
    "Conditions": {},
    "Resources": {
        "TestInstance": {
            "Type": "AWS::EC2::Instance",
            "Properties": {
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "TestInstance",
                        "PropagateAtLaunch": "true"
                    }
                ],
                "GroupDescription": "",
                "KeyName": "test-key",
                "ImageId": "ami-123456"
            }
        }
    },
    "Outputs": {}
}
```
#### Modifying Existing Cloudformation Template
Now we're going to load and modify a resource in the Template we just created:

```javascript
var filePath = '/tmp/myCloudformationTemplate.json';
var modifiedTemplate = Template.parse(filePath);
var ec2Instances = modifiedTemplate.getResourcesByType('AWS::EC2::Instance');

// The ec2Instances var is an array of Scenery Instance objects

var modifiedInstance = ec2Instances[0];
modifiedInstance.imageId('ami-654321');         // Modify the ImageId
modifiedInstance.instanceType('t1.micro');      // Add an InstanceType
modifiedTemplate.save('/tmp/modifiedTemplate.json');
```
... which yields the following CF Template:
```json
{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "",
    "Parameters": {},
    "Mappings": {},
    "Conditions": {},
    "Resources": {
        "TestInstance": {
            "Type": "AWS::EC2::Instance",
            "Properties": {
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "TestInstance",
                        "PropagateAtLaunch": "true"
                    }
                ],
                "GroupDescription": "",
                "KeyName": "test-key",
                "ImageId": "ami-654321",
                "InstanceType": "t1.micro"
            }
        }
    },
    "Outputs": {}
}
```

#### Deleting Cloudformation Template Resources
We can also remove resources from templates. We'll begin by loading the previous
template:
```javascript
var modifiedTemplate = Template.parse('/tmp/modifiedTemplate.json');
var ec2Instances = modifiedTemplate.getResourcesByType('AWS::EC2::Instance');

// Remove the ec2 instance
var key = ec2Instances[0].id;               // Get the ID of the instance to remove
modifiedTemplate.removeResourceByKey(key);
modifiedTemplate.save('/tmp/emptyTemplate.json');
```

If you open the `emptyTemplate.json` file that we just saved to disk, you will
see that our only resource (from the previous examples) is no longer present:
```json
{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "",
    "Parameters": {},
    "Mappings": {},
    "Conditions": {},
    "Resources": {},
    "Outputs": {}
}
```

#### Deleting Cloudformation Template Parameters
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
