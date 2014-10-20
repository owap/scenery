'use strict';

var Resource = require('../Resource.js');

var NetworkAclEntry = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::NetworkAclEntry', {});
};
require('util').inherits(NetworkAclEntry, Resource);

NetworkAclEntry.prototype.CidrBlock = function(value){
    this.node.Properties.CidrBlock = value;
    return this;
};
NetworkAclEntry.prototype.egress = function(value){
    this.node.Properties.Egress = value;
    return this;
};

NetworkAclEntry.prototype.icmp = function(value){
    this.node.Properties.Icmp = value;
    return this;
};

NetworkAclEntry.prototype.networkAclId = function(value){
    this.node.Properties.NetworkAclId = value;
    return this;
};

NetworkAclEntry.prototype.portRange = function(value){
    this.node.Properties.PortRange = value;
    return this;
};

NetworkAclEntry.prototype.protocol = function(value){
    this.node.Properties.Protocol = value;
    return this;
};

NetworkAclEntry.prototype.ruleAction = function(value){
    this.node.Properties.RuleAction = value;
    return this;
};

NetworkAclEntry.prototype.ruleNumber = function(value){
    this.node.Properties.RuleNumber = value;
    return this;
};

module.exports = NetworkAclEntry;
