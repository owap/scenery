// Copyright 2014 OpenWhere, Inc.
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

var SecurityGroupIngress = function (id) {
    Resource.call(this, id, 'AWS::EC2::SecurityGroupIngress');
    return this;
};

require('util').inherits(SecurityGroupIngress, Resource);

SecurityGroupIngress.prototype.tcpIn = function (properties) {
    var args = Array.prototype.slice.call(arguments, 1);
    args.forEach(function (arg) {
        var rule = {};
        for (var key in properties) {
            rule[key] = properties[key];
        }
        rule.IpProtocol = 'tcp';
        if (arg instanceof Array) {
            if (arg.length === 2) {
                rule.FromPort = arg[0];
                rule.ToPort = arg[1];
            }
        } else {
            rule.FromPort = arg;
            rule.ToPort = arg;
        }
        this.push(rule);
    });
    return this;
};

module.exports = SecurityGroupIngress;
