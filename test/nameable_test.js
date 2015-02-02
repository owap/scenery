// Copyright 2015 OpenWhere, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var Instance = require ('../lib/EC2/Instance.js');
var Nameable = require ('../lib/Nameable.js');
var _ = require('lodash');

exports.NameableTypeTest = function(test){
    var myInstance = new Instance();

    test.expect(2);
    test.ok(myInstance.isInstance(Nameable));
    test.ok(myInstance.Name);
    test.done();
};

exports.CanNameTest = function(test){
    var myInstance = new Instance();
    var name = 'testName';
    myInstance.Name(name);

    test.expect(1);
    test.ok( _.isEqual({ 'Key': 'Name', 'Value': name}, myInstance.node.Properties.Tags[0]) );
    test.done();
};
