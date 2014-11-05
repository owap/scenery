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

var VPCGatewayAttachment = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::VPCGatewayAttachment');
};

require('util').inherits(VPCGatewayAttachment, Resource);

VPCGatewayAttachment.prototype.internetGatewayId = function(value) {
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }

    this.node.Properties.InternetGatewayId = value;
    return this;
};

VPCGatewayAttachment.prototype.vpcId = function(value) {
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }
    this.node.Properties.VpcId = value;
    return this;
};

VPCGatewayAttachment.prototype.vpnGatewayId = function(value) {
    if(typeof value === 'string'){
        value = { 'Ref': value };
    }
    this.node.Properties.VpnGatewayId = value;
    return this;
};

module.exports = VPCGatewayAttachment;
