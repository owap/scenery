'use strict';

var NetworkAcl = require('../EC2/NetworkAcl.js');
var RouteTable = require('../EC2/RouteTable.js');
var Subnet = require('../EC2/Subnet.js');

function VPC (){ }

VPC.prototype.addSubnet = function (subnetId, description) {
    if(!this.template) {
        throw 'Cannot addSubnet: VPC does not belong to a template yet';
    }
    var sub = this.template.addResource( new Subnet(subnetId, {}, description, this.template) );
    sub.VpcId(this.id);
    return sub;
};

VPC.prototype.addRouteTable = function (rtid, description) {
    if(!this.template) {
        throw 'Cannot addRouteTable: VPC does not belong to a template yet';
    }
    var rt = this.template.addResource(new RouteTable(rtid, {}, description, this.template));
    rt.VpcId(this.id);
    return rt;
};

VPC.prototype.addNetworkAcl = function (aclId, description) {
    if(!this.template) {
        throw 'Cannot addNetworkAcl: VPC does not belong to a template yet';
    }
    var nacl = this.template.addResource(new NetworkAcl(aclId, {}, description, this.template));
    nacl.VpcId(this.id);
    return nacl;
};

module.exports = VPC;