// Copyright 2015 OpenWhere, Inc.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var _ = require('lodash');
var AWSClass = require('../lib/AWSClass.js');
var Resource = require('../lib/Resource.js');
var Table = require('../lib/DynamoDB/Table.js');
var Template = require('../lib/Template.js');
var AttributeDefinition = require('../lib/properties/DynamodbAttributedef.js');

exports.registerPropertyPrototypesTest = function(test){
    // Set up the class to extend Resource
    var TestClass = function(id) {
        return Resource.call(this, id, 'TestClass', {});
    };
    require('util').inherits(TestClass, Resource);

    // Create test properties for the registerPropertyPrototypes function
    var propertyMap = {
        'StringList' : { 'list': true, 'type': 'string' },
        'StringSingle' : { 'list': false, 'type': 'string' },
        'PropertyList' : { 'list': true, 'type': AttributeDefinition },
        'PropertySingle' : { 'list': false, 'type': AttributeDefinition }
    };

    TestClass = AWSClass.registerPropertyPrototypes(TestClass, propertyMap);

    test.expect(6);

    // If it expects a list and doesn't get one, it should fail.
    test.throws(
        function() {
            var t = new TestClass();
            t.StringList('just a string');
        },
        Resource.InvalidPropertyException,
        'Should throw an error when invalid type added to property'
    );

    // If it expects a string and gets a number, it should fail
    test.throws(
        function() {
            var t = new TestClass();
            t.StringSingle(9001);
        },
        Resource.InvalidPropertyException,
        'Should throw an error passing a number when a string is expected'
    );

    // If it expects an object and gets a string, it should fail
    test.throws(
        function() {
            var t = new TestClass();
            t.PropertySingle('myGreatProperty');
        },
        Resource.InvalidPropertyException,
        'Should throw an error passing a string when an AttributeDefinition is expected'
    );

    // Should throw when an AttributeException is expected and a normal object is passed
    test.throws(
        function() {
            var t = new TestClass();
            t.PropertySingle({'my': 'test object'});
        },
        Resource.InvalidPropertyException,
        'Should throw an error passing an object when an AttributeDefinition is expected'
    );

    // All valid entries should be permitted!
    test.doesNotThrow(function() {
        var t = new TestClass();
        t.StringList(['valid', 'strings']);
        t.StringSingle('cause the tests to pass');
    }, 'Issue testing primitives');

    test.doesNotThrow(function() {
        var t = new TestClass();
        var ad1 = new AttributeDefinition();
        var ad2 = new AttributeDefinition();
        t.PropertySingle(ad1);
        t.PropertyList([ad1, ad2]);
    }, 'Issue adding properties to the document');

    // All done!
    test.done();
};

exports.testCanAddPropertyTypes = function(test) {
    var t = new Template();
    var attDef = new AttributeDefinition('asdf').AttributeName('testName').AttributeType('testType');
    var table = new Table('myTestTable').AttributeDefinitions([ attDef ]);
    t.addResource(table);

    // Make sure we only get the "node" of the property types
    test.expect(2);
    test.ok(t.template.Resources.myTestTable.Properties.AttributeDefinitions);
    test.deepEqual(
        attDef.node,
        t.template.Resources.myTestTable.Properties.AttributeDefinitions[0]
    );
    test.done();
};

exports.testShouldFailIfNoArray = function(test) {
    test.expect(1);
    test.throws(function(){
        var attDef = new AttributeDefinition('asdf').AttributeName('testName').AttributeType('testType');
        // We should error if we try to add attDef by itself, instead of as an array member
        var table = new Table('myTestTable').AttributeDefinitions( attDef );
    });
    test.done();
};

exports.testCanAddReferenceTypes = function(test) {
    var Instance = require('../lib/EC2/Instance.js');
    var SecurityGroup = require('../lib/EC2/SecurityGroup.js');
    var t = new Template();
    var i = new Instance('myFantasticTestInstance');
    var sg = new SecurityGroup('myMostExcellentSecurityGroup');
    var expectedRefObj = { Ref: 'myMostExcellentSecurityGroup' };

    i.SecurityGroupIds([sg]);
    t.addResource(i);
    t.addResource(sg);

    test.expect(2);
    test.ok(t.template.Resources);
    test.deepEqual(
        expectedRefObj,
        t.template.Resources.myFantasticTestInstance.Properties.SecurityGroupIds[0]
    );

    test.done();
};
