var fs = require("fs");
var Handlebars = require("Handlebars");

var LaunchConfiguration = function (description) {
    this.node = {
        "Type": "AWS::AutoScaling::LaunchConfiguration",
        Properties: {
            GroupDescription: description
        }
    };
    return this;
};

LaunchConfiguration.prototype.dependsOn = function (dependencies) {
    if (!(dependencies instanceof Array)) {
        dependencies = [dependencies];
    }
    this.node.DependsOn = dependencies;
    return this;
};

LaunchConfiguration.prototype.keyName = function (keyName) {
    this.node.Properties.KeyName = keyName;
    return this;
};

LaunchConfiguration.prototype.imageId = function (imageId) {
    this.node.Properties.ImageId = imageId;
    return this;
};

LaunchConfiguration.prototype.instanceType = function (instanceType) {
    this.node.Properties.InstanceType = instanceType;
    return this;
};

LaunchConfiguration.prototype.instanceProfile = function (instanceProfile) {
    this.node.Properties.IamInstanceProfile = instanceProfile;
    return this;
};

LaunchConfiguration.prototype.securityGroups = function (securityGroups) {
    if (!(securityGroups instanceof Array)) {
        securityGroups = [securityGroups];
    }
    this.node.Properties.SecurityGroups = securityGroups;
    return this;
};

LaunchConfiguration.prototype.subnetId = function (subnetId) {
    this.node.Properties.SubnetId = subnetId;
    return this;
};

LaunchConfiguration.prototype.userData = function (userData) {
    this.node.Properties.UserData = userData;
    return this;
};

LaunchConfiguration.prototype.userDataTemplateFile = function (path, data) {
    var template = fs.readFileSync(path, 'utf8');
    var txt = Handlebars.compile(template, {noEscape: true})(data);

    var lines = txt.split("\n");
    var lines2 = [];
    lines.forEach(function (line) {
        if ("" != line) {
            lines2.push('"' + line + '"');
            lines2.push('"\\n"\n');
        }
    });

    var userDataStr = '{"Fn::Base64": { "Fn::Join": ["", [' + lines2.join(",") + ']]}}';
    var userData = JSON.parse(userDataStr);
    this.userData(userData);
};

module.exports = LaunchConfiguration;
