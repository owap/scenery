# Spatula: CloudFormation Templates in Javascript

## Setup
+ Run `npm install` in the root spatula directory
+ Add your AWS credentials to a file `config.json`:
```
{
    "accessKeyId": "YOUR_ACCESS_KEY_ID",
    "secretAccessKey": "YOUR_SECRET_ACCESS_KEY",
    "region": "us-east-1"
}
```

## Developing
+ Running `grunt` in the directory will:
    - Run `jshint` on all JS documents
    - Run unit tests to make sure everything is passing correctly

## Building CloudFormation Templates
To build CloudFormation templates, require the Spatula library into your
project, and use it to instantiate `Template` (and other) objects that will
be compiled to CloudFormation Templates.

```javascript
var Spatula = require('spatula');
var filePath = '/tmp/myCloudformationTemplate.json';

var t = new Spatula.Template();

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
var v = new Spatula.Validator(filePath, '/tmp/aws_config.json');
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
To load an existing CloudFormation template from JSON into Spatula objects,
invoke the `Template.parse()` function. For example:

```javascript
var myTemplate = Template.parse('/path/to/your/cf/template.JSON');
```

Once you've loaded objects into memory, you can reference them by their AWS
type using the template object's `getResourcesByType` function:

```javascript
var myTemplate = Template.parse('/path/to/your/cf/template.JSON');
var ec2Instances = myTemplate.getResourcesByType('AWS::EC2::Instance');

// The ec2Instances var is an array of Spatula Instance objects
var firstEc2Instance = ec2Instances[0];
```

Now that you have access to individual resources, you can modify them with
standard Spatula functions. Save the template again to see the difference!

### Example Workflow
Below is an example workflow that highlights Spatula's ability to modify
Cloudformation templates.

#### Create a CloudFormation Template in Javascript
```javascript
var Spatula = require('spatula');
var filePath = '/tmp/myCloudformationTemplate.json';

var t = new Spatula.Template();

// Create a single EC2 instance in the tempalte
t.ec2Instance('TestInstance')
        .keyName('test-key')
        .imageId('ami-123456')
        .name('TestInstance');

// Output Cloudformation JSON
t.save(filePath);
```
This yields the following template:
```
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

// The ec2Instances var is an array of Spatula Instance objects

var modifiedInstance = ec2Instances[0];
modifiedInstance.imageId('ami-654321');
modifiedInstance.instanceType('t1.micro');
modifiedTemplate.save('/tmp/modifiedTemplate.json');
```
The JSON for the modified template is identical to the template above, with the
exception of:
    + `ImageId` on the resource has been changed from `ami-123456` to `ami-654321`
    + We have appended an `InstanceType` to the resource

```
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
```
TODO
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
