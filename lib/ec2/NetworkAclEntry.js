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

var NetworkAclEntry = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::NetworkAclEntry', {});
};
require('util').inherits(NetworkAclEntry, Resource);

NetworkAclEntry.prototype.cidrBlock = function(value){
    this.node.Properties.CidrBlock = value;
    return this;
};
NetworkAclEntry.prototype.egress = function (value) {
    if (value) { 
        this.node.Properties.Egress = value;
    } else {
        this.node.Properties.Egress = 'true';
    }
    return this;
};

NetworkAclEntry.prototype.ingress = function () {
    this.node.Properties.Egress = 'false';
    return this;
};

NetworkAclEntry.prototype.icmp = function(value){
    this.node.Properties.Icmp = value;
    return this;
};

NetworkAclEntry.prototype.networkAclId = function(value){
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }

    this.node.Properties.NetworkAclId = value;
    return this;
};

NetworkAclEntry.prototype.portRange = function(from, to){
    this.node.Properties.PortRange = {From: from,To:to};
    return this;
};

NetworkAclEntry.prototype.protocol = function(value){
    this.node.Properties.Protocol = value;
    return this;
};

NetworkAclEntry.prototype.tcp = function(from, to){
    //http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml
    this.node.Properties.Protocol = 6;
    this.node.Properties.PortRange = { From: from, To: to };
    return this;
};


NetworkAclEntry.prototype.ruleAction = function(value){
    this.node.Properties.RuleAction = value;
    return this;
};

NetworkAclEntry.prototype.allow = function(){
    this.node.Properties.RuleAction = 'allow';
    return this;
};

NetworkAclEntry.prototype.deny = function () {
    this.node.Properties.RuleAction = 'deny';
    return this;
};

NetworkAclEntry.prototype.ruleNumber = function(value){
    this.node.Properties.RuleNumber = value;
    return this;
};

module.exports = NetworkAclEntry;
