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
TODO

## Modifying Existing Cloudformation Templates
TODO

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
