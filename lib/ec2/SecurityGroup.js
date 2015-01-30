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
////////////////////////////////
// Security Group - specific Properties
////////////////////////////////
var propertyMap = {
    'vpcId': 'reference',
    'tags': 'array'
};
var SecurityGroup = function (id, description) {
    Resource.call(this, id, 'AWS::EC2::SecurityGroup');
    this.node.Properties.GroupDescription = description;
    return this;
};
require('util').inherits(SecurityGroup, Resource);
SecurityGroup = Resource.registerPropertyPrototypes(SecurityGroup, propertyMap);

///////////////////////////////////////
// Security Group - specific Functions
///////////////////////////////////////

SecurityGroup.prototype.CidrIngressRule = function(cidrIP, to, from, protocal) {
    var ingress = this.node.Properties.SecurityGroupIngress;
    if (!ingress) {
        ingress = this.node.Properties.SecurityGroupIngress = [];
    }
    var rule = {'CidrIp':cidrIP,'FromPort':from,'ToPort':to,'IpProtocol':protocal};
    ingress.push(rule);
    return this;
};


SecurityGroup.prototype.tcpIn = function (properties) {
    var args = Array.prototype.slice.call(arguments, 1);
    var ingress = this.node.Properties.SecurityGroupIngress;
    if (!ingress) {
        ingress = this.node.Properties.SecurityGroupIngress = [];
    }
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
        ingress.push(rule);
    });
    return this;
};

module.exports = SecurityGroup;
