'use strict';

var Resource = require('../Resource.js');

var EIP = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::EIP', {});
};
require('util').inherits(EIP, Resource);

EIP.prototype.instanceId = function(value) {
   this.node.Properties.InstanceId = value;
   return this;
};

EIP.prototype.domain = function(value) {
   this.node.Properties.Domain = value;
   return this;
};

module.exports = EIP;
