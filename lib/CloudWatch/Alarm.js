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

var Resource = require('../Resource.js');
var Dimension = require('../properties/Dimension.js');

var propertyMap = {'ActionsEnabled': {'list': false, 'type': 'boolean'},
 'AlarmActions': {'list': true, 'type': 'string'},
 'AlarmDescription': {'list': false, 'type': 'string'},
 'AlarmName': {'list': false, 'type': 'string'},
 'ComparisonOperator': {'list': false, 'type': 'string'},
 'Dimensions': {'list': true, 'type': Dimension},
 'EvaluationPeriods': {'list': false, 'type': 'string'},
 'InsufficientDataActions': {'list': true, 'type': 'string'},
 'MetricName': {'list': false, 'type': 'string'},
 'Namespace': {'list': false, 'type': 'string'},
 'OKActions': {'list': true, 'type': 'string'},
 'Period': {'list': false, 'type': 'string'},
 'Statistic': {'list': false, 'type': 'string'},
 'Threshold': {'list': false, 'type': 'string'},
 'Unit': {'list': false, 'type': 'string'}};

var Class = function (id) {
    return Resource.call(this, id, 'Alarm', {});
};
require('util').inherits(Class, Resource);

Class = Resource.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;
