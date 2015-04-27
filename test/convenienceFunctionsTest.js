'use strict';

exports.testConvenienceFunctionsExist = function(test) {
    var VPC = require('../lib/EC2/VPC.js');
    var Template = require('../lib/Template.js');
    var myVPC = new VPC();
    
    test.expect(5);
    
    // Check to make sure functions from the AWS Documentation exist
    test.ok(myVPC.EnableDnsHostnames);
    
    // Check to make sure our convenience functions exist
    test.ok(myVPC.addSubnet);
   
    // Assert our convenience function works in standard conditions
    test.doesNotThrow(function() {
        var t = new Template();
        var myTestVpc = new VPC('vpcLogicalId').addSubnet(t, 'myTestSubnet', '10.0.0.0/8');
        t.addResource(myTestVpc);
        test.deepEqual(t.template.Resources.myTestSubnet.Properties.VpcId, {Ref: 'vpcLogicalId'});
        test.ok(t.template.Resources.myTestSubnet.Properties.CidrBlock === '10.0.0.0/8');
    });
    test.done();
};

exports.testEasyUserData = function(test) {
    var Instance = require('../lib/EC2/Instance.js');

    test.expect(5);
    // Assert the easyUserData function exists
    var i1 = new Instance();
    test.ok(i1.easyUserData);

    // Assert we error when we pass a non-array to easyUserData
    var i2 = new Instance();
    test.throws(function(){
        i2.easyUserData('We excect an error to be thrown');
    });

    // Assert that, when we pass an array with a shebang in the first element,
    // everything works great
    var i3 = new Instance();
    test.doesNotThrow(function(){
        var commands = [
            '#!/bin/bash -e\n',
            'echo "valid test"'
        ];
        var expectedUserData =  { 
         'Fn::Base64' : { 
            'Fn::Join' : [ '', commands ] 
         }
     };
        i3.easyUserData(commands);
        test.deepEqual(expectedUserData, i3.node.Properties.UserData);
    });

    // Assert that, when we pass an array without a sheband in the first element,
    // a bash invocation line is added
    var i4 = new Instance();
    var commands = [
        'echo "valid test"'
    ];
    var expectedCommands = [
        '#!/bin/bash -e\n',
        'echo "valid test"'
    ];
    i4.easyUserData(commands);
    test.deepEqual(
        expectedCommands,
        i4.node.Properties.UserData['Fn::Base64']['Fn::Join'][1]
    );

    test.done();
};