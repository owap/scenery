'use strict';

var Template = require('../../lib/Template.js');
var Validator = require('../../lib/Validator.js');

function ingestTemplate(test, templateFilename){
    // Set up the template
    var filePath = __dirname + '/' + templateFilename + '.json'
    var t = new Template.parse(filePath);
    t.save(__dirname + '/' + templateFilename + '_spatula.json');

    // Assertions
    test.expect(2);

    function validationCallback(isValid, message){
        test.ok(isValid);
        test.ok(!!message);
        test.done();
    }

    var v = new Validator(filePath, __dirname + '/../../config.json');
    v.validate(validationCallback);

    return true;
}

exports.landscapesMongoTest = function(test){
    ingestTemplate(test, 'Mongo');
};

exports.landscapesVpnTest = function(test){
    ingestTemplate(test, 'OpenVPN');
};

exports.landscapesTwitterTest = function(test){
    ingestTemplate(test, 'Twitter');
};

exports.landscapesVpcTest = function(test){
    ingestTemplate(test, 'VPC');
};
