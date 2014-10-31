'use strict';

var Resource = require('../Resource.js');
var NetworkAclEntry = require('./NetworkAclEntry');

var NetworkAcl = function (id, description, template) {
    return Resource.call(this, id, 'AWS::EC2::NetworkAcl', { Tags: [] }, template);
};
require('util').inherits(NetworkAcl, Resource);

NetworkAcl.prototype.tags = function(value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.Tags = value;
    return this;
};

NetworkAcl.prototype.vpcId = function(value) {
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }

    this.node.Properties.VpcId = value;
    return this;
};

NetworkAcl.prototype.addAclEntry = function(id, description) {
    var acl = this.template.addResource(new NetworkAclEntry(id, description,this.template));
    acl.networkAclId(this.id);
    return acl;
};

module.exports = NetworkAcl;
