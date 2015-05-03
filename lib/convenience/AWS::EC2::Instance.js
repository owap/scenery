'use strict';

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

Instance.prototype.userDataFromFile = function(path) {
    /**
     * This function accepts a path to a file that will be parsed,
     * converted to an array, and stored in the UserData function.
     *
     * Returns a PROMISE containing the modified Instance
     * TODO: Refactor this to be fluent without blocking the event loop
     **/
    var fs = require('fs'),
        Q = require('Q');

    var self = this;
    var deferred = Q.defer();
    fs.readFile(path, 'utf-8', function(error, data) {
        if(error){
            deferred.reject(new Error(error));
        }
        var arrayOfCommands = data.toString().split(/(\n)/g);
        var userData = {
            'Fn::Base64' : {
               'Fn::Join' : [ '', arrayOfCommands ]
            }
        };
        self.node.Properties.UserData = userData;
        deferred.resolve(self);
    });
    return deferred.promise;
};

module.exports = Instance;
