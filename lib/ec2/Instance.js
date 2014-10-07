'use strict';

var Resource = require('../Resource.js');
var fs = require('fs');
var Handlebars = require('Handlebars');

Handlebars.registerHelper('stringify', function (obj) {
    return new Handlebars.SafeString(JSON.stringify(obj));
});

var Instance = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::Instance', { Tags: [], GroupDescription: description});
};

require('util').inherits(Instance, Resource);

Instance.prototype.keyName = function (keyName) {
    this.node.Properties.KeyName = keyName;
    return this;
};

Instance.prototype.imageId = function (imageId) {
    this.node.Properties.ImageId = imageId;
    return this;
};

Instance.prototype.instanceType = function (instanceType) {
    this.node.Properties.InstanceType = instanceType;
    return this;
};

Instance.prototype.instanceProfile = function (instanceProfile) {
    this.node.Properties.IamInstanceProfile = instanceProfile;
    return this;
};

Instance.prototype.securityGroupIds = function (securityGroupIds) {
    if (!(securityGroupIds instanceof Array)) {
        securityGroupIds = [securityGroupIds];
    }
    this.node.Properties.SecurityGroupIds = securityGroupIds;
    return this;
};

Instance.prototype.name = function (name) {
    this.node.Properties.Tags.push({'Key': 'Name', Value: name, 'PropagateAtLaunch': 'true'});
    return this;
};

Instance.prototype.subnetId = function (subnetId) {
    this.node.Properties.SubnetId = subnetId;
    return this;
};

Instance.prototype.userData = function (userData) {
    this.node.Properties.UserData = userData;
    return this;
};

Instance.prototype.userDataTemplateFile = function (path, data) {
    var template = fs.readFileSync(path, 'utf8');
    var txt = Handlebars.compile(template, {noEscape: true})(data);

    var lines = txt.split('\n');
    var lines2 = [];
    lines.forEach(function (line) {
        if ('' !== line) {
            lines2.push('"' + line + '"');
            lines2.push('"\\n"\n');
        }
    });

    var userDataStr = '{"Fn::Base64": { "Fn::Join": ["", [' + lines2.join(',') + ']]}}';
    var userData = JSON.parse(userDataStr);
    this.userData(userData);
};

module.exports = Instance;
