# Spatula: CloudFormation Templates in Javascript

## Setup
+ [Install the `aws-cli`](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-set-up.html)
(for validating Templates):
    - `sudo pip install awscli`
    - `aws configure`
+ Run `npm install` in the root spatula directory

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
the following block of code shows how the Validator class can be used to invoke
the `aws-cli` to validate your template.

```javascript
// First, define a callback function to be invoked after validation
function validationCallback(isValid, message){
    if(!isValid){
        console.log('CloudFormation template is invalid because:', message);
    } else {
        console.log(message);
    }
}

// Second, instantiate a Validator object, referencing your Template on the local filesystem
var Validator = require('./lib/Validator.js');
var myValidator = Validator('/tmp/MyCFTemplate.json');

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

```json
CloudFormation template is invalid because: { [Error: Command failed:
A client error (ValidationError) occurred when calling the ValidateTemplate operation: Template format error: At least one Resources member must be defined.
] killed: false, code: 255, signal: null }
```

As you can see, the output from the `aws-cli` validator is passed through the
`message` var of the `validationCallback` function we defined above.
