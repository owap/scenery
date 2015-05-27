'use strict';
var BlueBird = require('bluebird');
var fs = BlueBird.promisifyAll(require('fs'));

function Instance() { }
/**
 * This class contains convenience functions to extend AWS::EC2::Instance
 **/

Instance.prototype.easyUserData = function(arrayOfCommands) {
    /**
     * This function accepts an array of commands that will be joined together
     * to form the user data field. If the first line does not contain a
     * shebang, a default bash invocation will be added.
     **/
     if( !(arrayOfCommands && arrayOfCommands instanceof Array) ){
         throw 'You must pass an array to the easyUserData function';
     }
     if(arrayOfCommands[0].indexOf('#!') === -1){
         arrayOfCommands.unshift('#!/bin/bash -e\n');
     }
     var userData = {
         'Fn::Base64' : {
            'Fn::Join' : [ '', arrayOfCommands ]
         }
     };
     this.node.Properties.UserData = userData;
     return this;
};

Instance.prototype.userDataFromFileCallback = function(path, callback) {
    /**
     * This function accepts a path to a file that will be parsed,
     * converted to an array, and stored in the UserData function.
     *
     * The callback function will be invoked after the call to readFile has
     * returned. Contains data null (no errors) and the UserData node.
     *
     * NOTE: UserData will not be present until readFile returns.
     **/
    var self = this;
    var installUserData = function(error, data){
        if(error){
            callback(error);
            throw('Failed to read UserData from file:', error);
        }
        var arrayOfCommands = data.toString().split(/(\n)/g);
        var userData = {
            'Fn::Base64' : {
               'Fn::Join' : [ '', arrayOfCommands ]
            }
        };
        self.node.Properties.UserData = userData;
        callback(null, userData);
    };
    fs.readFile(path, 'utf-8', installUserData);
    return this;
};

Instance.prototype.userDataFromFile = function(path) {
    /**
     * This function uses promises to asynchronously read the contents of the
     * file specified in the `path` variable and return the instance object with
     * the file contents in the UserData section of the EC2::Instance object.
     **/
     var self = this;
     return fs.readFileAsync(path, 'utf-8')
        .then(function(data){
            var arrayOfCommands = data.toString().split(/(\n)/g);
            var userData = {
                'Fn::Base64' : {
                   'Fn::Join' : [ '', arrayOfCommands ]
                }
            };
            self.node.Properties.UserData = userData;
            return self;
        })
        .catch(function(error){
            //console.error('Error reading UserData from file:', error);
            return self;
        });
};

module.exports = Instance;