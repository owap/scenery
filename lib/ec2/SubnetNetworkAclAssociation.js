'use strict';

var Resource = require('../Resource.js');

var SubnetNetworkAclAssociation = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::SubnetNetworkAclAssociation', {});
};
require('util').inherits(SubnetNetworkAclAssociation, Resource);

SubnetNetworkAclAssociation.prototype.subnetId = function(value) {
    this.node.Properties.SubnetId = value;
    return this;
};

SubnetNetworkAclAssociation.prototype.networkAclId = function(value) {
    this.node.Properties.NetworkAclId = value;
    return this;
};

module.exports = SubnetNetworkAclAssociation;
