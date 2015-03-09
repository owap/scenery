// Copyright 2015 OpenWhere, Inc.
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

var fs = require('fs');

var Parameter = require('./Parameter.js');
var Resource = require('./Resource.js');

// EC2 Resources
var Instance = require('./EC2/Instance.js');
var InternetGateway = require('./EC2/InternetGateway.js');
var SecurityGroup = require('./EC2/SecurityGroup.js');
var Subnet = require('./EC2/Subnet.js');
var VPC = require('./EC2/VPC.js');
var VPCGatewayAttachment = require('./EC2/VPCGatewayAttachment.js');
var SubnetRouteTableAssociation = require('./EC2/SubnetRouteTableAssociation.js');
var SubnetNetworkAclAssociation = require('./EC2/SubnetNetworkAclAssociation.js');

// IAM Resources
var InstanceProfile = require('./IAM/InstanceProfile.js');
var Policy = require('./IAM/Policy.js');
var Role = require('./IAM/Role.js');

// Autoscaling Resources
var AutoScalingGroup = require('./AutoScaling/AutoScalingGroup.js');
var LaunchConfiguration = require('./AutoScaling/LaunchConfiguration.js');

// Other Resources
var ElastiCacheCluster = require('./ElastiCache/CacheCluster.js');
var LoadBalancer = require('./ElasticLoadBalancing/LoadBalancer.js');
var Registry = require('./Registry.js');

/**
 * Used when constructing a CF Template file from JSON to ensure that the
 * loaded object is equal to the object that created the template
 **/
function buildParameterObjects(parameters){
    var localObj = {};
    for(var key in parameters){
        var node = parameters[key];
        localObj[key] = { id: key, node: node };
    }
    return localObj;
}

function instantiateResourceObjects(resources){
    var newSection = {};
    var registry = new Registry();

    for(var resource in resources){
        var node = resources[resource];
        if(!node.Type){
            continue;
        }
        var ResourceClass = registry.getClass(node.Type);

        if(typeof ResourceClass === 'undefined'){
            console.log('WARNING: Unable to find Scenery class for', node.Type);
            newSection[resource] = node;
            continue;
        }

        var object = new ResourceClass(resource);
        object.node = node;
        newSection[resource] = object;
    }

    return newSection;
}

// Template constructor
var Template = function (doc) {
    doc = doc || {};
    this.template = {
        AWSTemplateFormatVersion: doc.AWSTemplateFormatVersion || '2010-09-09',
        Description: doc.Description || '',
        Parameters: doc.Parameters || {},
        Mappings: doc.Mappings || {},
        Conditions: doc.Conditions || {},
        Resources: doc.Resources || {},
        Outputs: doc.Outputs || {}
    };
    this.parameters = {};
    if (doc.Parameters){
        this.parameters = buildParameterObjects(doc.Parameters);
    }
    this.resources = {};
    if (doc.Resources){
        this.resources = instantiateResourceObjects(doc.Resources);
    }
};

Template.parseJSON = function (path) {
    var fileContents = fs.readFileSync(path, 'utf8');
    var json = JSON.parse(fileContents);
    return json;
};

Template.parse = function (path) {
    var template = new Template(Template.parseJSON(path));
    return template;
};

Template.prototype.save = function (path) {
    var contents = JSON.stringify(this.template, null, '    ');
    fs.writeFileSync(path, contents);
};

Template.Ref = function (refId) {
    return { 'Ref': refId };
};

Template.prototype.addResource = function (obj) {
    this.template.Resources[obj.id] = obj.node;
    this.resources[obj.id] = obj;
    return obj;
};

Template.prototype.getResource = function (id) {
    return this.resources[id];
};

Template.prototype.getResourcesByType = function (type) {
    var objects = [];
    for(var key in this.resources) {
        var object = this.resources[key];
        if(object.node.Type && type === object.node.Type){
            objects.push(object);
        }
    }
    return objects;
};

Template.prototype.removeResourceByKey = function(key) {
    try {
        delete this.resources[key];
        delete this.template.Resources[key];
    } catch (e) {
        console.log('Failed to remove resource for key', key, ':', e);
        return false;
    }
    return true;
};

Template.prototype.removeParameterByKey = function(key) {
    try {
        delete this.parameters[key];
        delete this.template.Parameters[key];
    } catch (e) {
        console.log('Failed to remove parameter with key', key, ':', e);
        return false;
    }
    return true;
};

Template.prototype.resource = function (id, type, properties) {
    return this.addResource(new Resource(id, type, properties));
};

Template.prototype.parameter = function (obj) {
    this.template.Parameters[obj.id] = obj.node;
    this.parameters[obj.id] = obj;
    return obj;
};

Template.prototype.ref = function (refId) {
    return Template.Ref(refId);
};

Template.FnGetAtt = function (resource, attribute) {
    return { 'Fn::GetAtt': [ resource, attribute]};
};

Template.prototype.fnGetAtt = function (resource, attribute) {
    return Template.FnGetAtt(resource, attribute);
};

Template.prototype.toJSON = function () {
    console.log(JSON.stringify(this.template, 2, ' '));
};

Template.prototype.securityGroup = function (id, description) {
    return this.addResource(new SecurityGroup(id, description));
};

Template.prototype.strParam = function (id, defaultValue, description) {
    return this.parameter(new Parameter(id, 'String', defaultValue, description));
};

Template.prototype.numParam = function (id, defaultValue, description, options) {
    return this.parameter(new Parameter(id, 'Number', defaultValue, description, options));
};

Template.prototype.output = function (id, value, description) {
    this.template.Outputs[id] = {
        Description: description,
        Value: value
    };
    return this;
};

Template.prototype.ec2Instance = function (id, description) {
    return this.addResource(new Instance(id, description));
};

Template.prototype.internetGateway = function (id, description) {
    return this.addResource(new InternetGateway(id, description));
};

Template.prototype.subnet = function (id, description) {
    return this.addResource(new Subnet(id, description));
};

Template.prototype.vpc = function (id, description, cidrBlock) {
    return this.addResource(new VPC(id, description, cidrBlock,this));
};

Template.prototype.vpcGatewayAttachment = function (id, description) {
    return this.addResource(new VPCGatewayAttachment(id, description));
};

Template.prototype.subnetRouteTableAssociation = function (id,description){
     return this.addResource(new SubnetRouteTableAssociation(id, description));
};

Template.prototype.subnetNetworkAclAssociation = function (id,description){
     return this.addResource(new SubnetNetworkAclAssociation(id, description));
};

Template.prototype.elastiCacheCluster = function (id, description) {
    return this.addResource(new ElastiCacheCluster(id, description));
};

Template.prototype.launchConfiguration = function (id) {
    var config = new LaunchConfiguration();
    this.template.Resources[id] = config.node;
    return config;
};

Template.prototype.autoScalingGroup = function (id) {
    return this.addResource(new AutoScalingGroup(id));
};

Template.prototype.iamInstanceProfile = function (id, path, roles) {
    var profile = new InstanceProfile(path, roles);
    this.template.Resources[id] = profile.node;
    return this;
};

Template.prototype.iamRole = function (id) {
    var role = new Role();
    this.template.Resources[id] = role.node;
    return role;
};

Template.prototype.iamPolicy = function (id) {
    var policy = new Policy();
    policy.name(id);
    this.template.Resources[id] = policy.node;
    return policy;
};

Template.prototype.loadBalancer = function (id, description) {
    return this.addResource(new LoadBalancer(id, description));
};

module.exports = Template;
