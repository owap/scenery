# Spatula: CloudFormation Templates in Javascript

## Setup
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

```
CloudFormation template is invalid because: { [ConfigError: Missing region in config]
message: 'Missing region in config',
code: 'ConfigError',
time: Fri Oct 10 2014 15:28:45 GMT-0400 (EDT) }
```

As you can see, the output from the `aws-sdk` is passed through the
`message` var of the `validationCallback` function we defined above.
