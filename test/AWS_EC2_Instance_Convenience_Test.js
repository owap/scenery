'use strict';
var fs = require('fs');

exports.testUserDataFromFile = function(test) {
    test.expect(5);

    var Instance = require('../lib/EC2/Instance.js');
    var i = new Instance();
    test.ok(i.userDataFromFile);

    var callback = function(error, data) {
        test.ok(data);
        test.ok(!error);
        test.ok(i.node.Properties.UserData);

        var assertFileContentsEqual = function(err, data){
            if(err){
                throw('Test failed to assert file contents are equal:', err);
            }

            var fileContents = data.toString().split(/(\n)/g);
            test.deepEqual(
                fileContents,
                i.node.Properties.UserData['Fn::Base64']['Fn::Join'][1]
            );
            test.done();
        };

        fs.readFile(__dirname + '/userDataSample.sh', assertFileContentsEqual);
    };

    i.userDataFromFile(__dirname + '/userDataSample.sh', callback);
};

// TODO: We may also wish to add tests asserting that the UserData
// section matches the contents of the file passed to the function.
