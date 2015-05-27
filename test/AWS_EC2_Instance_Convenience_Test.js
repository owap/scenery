'use strict';
var fs = require('fs');

exports.testUserDataFromFile = function(test) {
    test.expect(3);

    var Instance = require('../lib/EC2/Instance.js');
    var i = new Instance();
    test.ok(i.userDataFromFile);            // Assert the function exists
    test.ok(!i.node.Properties.UserData);   // Assert we don't already have data

    // Fetch the data
    i.userDataFromFile(__dirname + '/userDataSample.sh').then(function(){
        test.ok(i.node.Properties.UserData);    // Assert we now have data
        test.done();                            // Wrap up the test
    });
};
// TODO: We may also wish to add tests asserting that the UserData
// section matches the contents of the file passed to the function.

exports.testUserDataFromInvalidFile = function(test) {
    test.expect(3);
    var Instance = require('../lib/EC2/Instance.js');
    var i = new Instance();
    test.ok(i.userDataFromFile);            // Assert the function exists
    test.ok(!i.node.Properties.UserData);   // Assert we don't already have data

    // Fetch the data
    i.userDataFromFile(__dirname + '/invalidFile.sh').then(function(){
        test.ok(!i.node.Properties.UserData);   // Assert we still have no data
        test.done();                            // Wrap up the test
    });
};

exports.testUserDataFromFileIsFluent = function(test) {
    test.expect(5);
    var Instance = require('../lib/EC2/Instance.js');
    var i = new Instance();
    test.ok(i.userDataFromFile);            // Assert the function exists
    test.ok(!i.node.Properties.UserData);   // Assert we don't already have data

    i.KeyName('TestKey')
    .ImageId('TestImageId')
    .userDataFromFile(__dirname + '/userDataSample.sh').then(function(){
        test.ok(i.node.Properties.KeyName);
        test.ok(i.node.Properties.ImageId);
        test.ok(i.node.Properties.UserData);    // Assert we now have data
        test.done();                            // Wrap up the test
    });
    // TODO: This is not fluent, unfortunately, because Promises.
    // We'll need to wait until ES7 and `await`
};

exports.testUserDataFromFileCallbackVer = function(test) {
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
    i.userDataFromFileCallback(__dirname + '/userDataSample.sh', callback);
};
