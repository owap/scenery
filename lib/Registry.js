'use strict';

/**
 * An object responsible for mapping all Resource classes exposed by the
 * Spatula module and mapping them to the AWS monikers
 **/

var Spatula = require('../spatula.js');

function Registry() {
    this.awsClassMap = {};

    for(var key in Spatula){
        // To avoid recursive imports, skip the Template object
        if(key === 'Template'){
            continue;
        }

        var AWSClass = Spatula[key];
        var awsObject = new AWSClass();
        if(awsObject.node && awsObject.node.Type){
            var awsMoniker = awsObject.node.Type;
            this.awsClassMap[awsMoniker] = AWSClass;
        }
    }
}

Registry.prototype.getClass = function(awsMoniker) {
    return this.awsClassMap[awsMoniker];
};

module.exports = Registry;
