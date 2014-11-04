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

var RecordSet = function (id, description) {
    return Resource.call(this, id, 'AWS::Route53::RecordSet', {});
};
require('util').inherits(RecordSet, Resource);

RecordSet.prototype.aliasTarget = function(value){
    this.node.Properties.AliasTarget = value;
    return this;
};

RecordSet.prototype.comment = function(value){
    this.node.Properties.Comment = value;
    return this;
};

RecordSet.prototype.hostedZoneId = function(value){
    this.node.Properties.HostedZoneId = value;
    return this;
};

RecordSet.prototype.hostedZoneName = function(value){
    this.node.Properties.HostedZoneName = value;
    return this;
};

RecordSet.prototype.name = function(value){
    this.node.Properties.Name = value;
    return this;
};

RecordSet.prototype.region = function(value){
    this.node.Properties.Region = value;
    return this;
};

RecordSet.prototype.resourceRecords = function(value){
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.ResourceRecords = value;
    return this;
};

RecordSet.prototype.setIdentifier = function(value){
    this.node.Properties.SetIdentifier = value;
    return this;
};

RecordSet.prototype.tTL = function(value){
    this.node.Properties.TTL = value;
    return this;
};

RecordSet.prototype.type = function(value){
    this.node.Properties.Type = value;
    return this;
};

RecordSet.prototype.weight = function(value){
    this.node.Properties.Weight = value;
    return this;
};

module.exports = RecordSet;
