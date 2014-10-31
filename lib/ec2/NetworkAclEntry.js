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
NetworkAclEntry.prototype.egress = function(value){
    this.node.Properties.Egress = value;
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

NetworkAclEntry.prototype.tcp = function(){
    //http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml
    this.node.Properties.Protocol = 6; 
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

NetworkAclEntry.prototype.ruleNumber = function(value){
    this.node.Properties.RuleNumber = value;
    return this;
};

module.exports = NetworkAclEntry;
