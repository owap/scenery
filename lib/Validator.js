'use strict';

/**
 * This class is a wrapper around the aws-cli to assist with the validation of
 * CloudFormation templates (on the local filesystem)
 **/

var async = require('async');
var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.loadFromPath('./config.json');

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
    var cloudformation = new AWS.CloudFormation();
    var templateBody = fs.readFileSync(this.templateFile, 'utf8');
    var params = { TemplateBody: templateBody };

    async.waterfall([
        // Run the aws-cli command defined above
        function(callback){
            cloudformation.validateTemplate(params, callback);
        }
    ], function(err, message){
        if(err){
            return validationCallback(false, err);
        }
        else if(!err && !message){
            return validationCallback(false,
                { message: 'An unknown error has occurred' });
        }
        return validationCallback(true, message);
    });
};

module.exports = Validator;
