// Copyright 2014 OpenWhere, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * This class is a wrapper around the aws-cli to assist with the validation of
 * CloudFormation templates (on the local filesystem)
 **/

var async = require('async');
var AWS = require('aws-sdk');
var fs = require('fs');

function Validator(templateFile, awsConfig) {
    this.templateFile = templateFile;

    if (awsConfig) {
        AWS.config.loadFromPath(awsConfig);
    }

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
