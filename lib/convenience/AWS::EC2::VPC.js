'use strict';

var NetworkAcl = require('../EC2/NetworkAcl.js');
var RouteTable = require('../EC2/RouteTable.js');
var Subnet = require('../EC2/Subnet.js');

function VPC (){ }

VPC.prototype.addSubnet = function (template, subnetId, cidrBlock, tags) {
    if(!template) {
        throw 'Cannot addSubnet: No template provided';
    }
    var sub = new Subnet(subnetId);
    if(cidrBlock){
        sub.CidrBlock(cidrBlock);
    }
    if(tags){
        sub.Tags(tags);
    }
    sub.VpcId(this);
    template.addResource(sub);
    return this;
};

VPC.prototype.addRouteTable = function (rtid, template, tags) {
    if(!template) {
        throw 'Cannot addRouteTable: No template provided';
    }
    var rt = new RouteTable(rtid);
    if(tags){
        rt.Tags(tags);
    }
    rt.VpcId(this);
    template.addResource(rt);
    return this;
};

VPC.prototype.addNetworkAcl = function (aclId, template, tags) {
    if(!template) {
        throw 'Cannot addNetworkAcl: No template provided';
    }
    var nacl = new NetworkAcl(aclId);
    if(tags){
        nacl.Tags(tags);
    }
    nacl.VpcId(this);
    template.addResource(nacl);
    return this;
};

module.exports = VPC;