'use strict';

function Instance() { }
/**
 * This class contains convenience functions to extend AWS::EC2::Instance
 **/

Instance.prototype.easyUserData = function(arrayOfCommands) {
    /**
     * This function accepts an array of commands that will be joined together
     * to form the user data field. If the first line does not contain a shebang,
     * a default bash invocation will be added.
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

module.exports = Instance;