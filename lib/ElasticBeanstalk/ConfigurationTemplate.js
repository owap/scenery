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

var AWSClass = require('../AWSClass.js');
var Resource = require('../Resource.js');
var BeanstalkOptionSetting = require('../properties/BeanstalkOptionSetting.js');
var BeanstalkConfigurationtemplateSourceconfiguration = require('../properties/BeanstalkConfigurationtemplateSourceconfiguration.js');

var propertyMap = {'ApplicationName': {'list': false, 'type': 'string'},
 'Description': {'list': false, 'type': 'string'},
 'EnvironmentId': {'list': false, 'type': 'string'},
 'OptionSettings': {'list': true, 'type': BeanstalkOptionSetting},
 'SolutionStackName': {'list': false, 'type': 'string'},
 'SourceConfiguration': {'list': false,
                            'type': BeanstalkConfigurationtemplateSourceconfiguration}};

var Class = function (id) {
    return Resource.call(this, id, 'AWS::ElasticBeanstalk::ConfigurationTemplate', {});
};
require('util').inherits(Class, Resource);

Class = AWSClass.registerPropertyPrototypes(Class, propertyMap);
module.exports = Class;