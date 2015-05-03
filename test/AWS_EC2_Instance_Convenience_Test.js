'use strict';

exports.testUserDataFromFile = function(test) {
    var Instance = require('../lib/EC2/Instance.js');
    var i = new Instance();
    test.expect(2);
    test.ok(i.userDataFromFile);

    i.userDataFromFile(__dirname + '/userDataSample.sh').then(
        function(instance){
            test.ok(instance.node.Properties.UserData);
            test.done();
        }
    );
};

// TODO: We may also wish to add tests asserting that the UserData
// section matches the contents of the file passed to the function.
