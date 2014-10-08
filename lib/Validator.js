'use strict';

/**
 * This class is a wrapper around the aws-cli to assist with the validation of
 * CloudFormation templates (on the local filesystem)
 **/

var async = require('async');
var exec = require('child_process').exec;
var fs = require('fs');

function Validator(templateFile) {
    this.templateFile = templateFile;
    return this;
}

Validator.prototype.setTemplateFile = function(path){
    var success = fs.exists(path);
    if(success){
        this.templateFile = path;
    }
    return success;
};

/**
 * validationCallback is a function with two arguments:
 *      + isValid - boolean indicating if template is valid or not
 *      + message - the result of the validation from aws-cli
 **/
Validator.prototype.validate = function(validationCallback){
    validationCallback = validationCallback || function(){ return false; };
    if(!this.templateFile){
        return validationCallback(false, 'No template file specified for validation');
    }

    var rootScope = this;
    var execString = 'aws cloudformation validate-template --template-body file://';

    async.waterfall([
        // Run the aws-cli command defined above
        function(callback){
            exec(execString + rootScope.templateFile, callback);
        },
        // Handle the results of the aws-cli command invoked above
        function(stdout, stderr, callback){
            if(stderr){
                callback(stderr);
            } else {
                callback(null, stdout);
            }
        }
    ], function(err, message){
        if(err){
            return validationCallback(false, err);
        }
        // Check for validation errors in the message
        if(message.indexOf('ValidationError') > -1){
            return validationCallback(false, message);
        }

        validationCallback(true, message);
    });
};

module.exports = Validator;
