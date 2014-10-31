'use strict';

var Resource = require('../Resource.js');
var Subnet = require('./Subnet.js');
var RouteTable = require('./RouteTable');
var NetworkAcl = require('./NetworkAcl');

var VPC = function (id, description, cidrBlock, template) {
    

    Resource.call(this, id, 'AWS::EC2::VPC', { Tags: [{ Key: 'Description', Value: 'description'}] }, template );
    this.node.Properties.CidrBlock = cidrBlock;
    return this;
};

require('util').inherits(VPC, Resource);

VPC.prototype.cidrBlock = function(value) {
    this.node.Properties.CidrBlock = value;
    return this;
};

VPC.prototype.enableDnsSupport = function(value) {
    this.node.Properties.EnableDnsSupport = value;
    return this;
};

VPC.prototype.enableDnsHostnames = function(value) {
    this.node.Properties.EnableDnsHostnames = value;
    return this;
};

VPC.prototype.instanceTenancy = function(value) {
    this.node.Properties.InstanceTenancy = value;
    return this;
};

VPC.prototype.tags = function(value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.Tags = value;
    return this;
};


VPC.prototype.addSubnet = function (id, description) {
    var sub = this.template.addResource(new Subnet(id, description, this.template));
    sub.vpcId(this.id);
    return sub;
};

VPC.prototype.addRouteTable = function (id, description) {
    var rt = this.template.addResource(new RouteTable(id, description,this.template));
    rt.vpcId(this.id);
    return rt;
};

VPC.prototype.addNetworkAcl = function (id, description) {
    var nacl = this.template.addResource(new NetworkAcl(id, description,this.template));
    nacl.vpcId(this.id);
    return nacl;
};

module.exports = VPC;
