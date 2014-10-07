var Resource = require('../Resource.js');

var SecurityGroup = function (id, description) {
    Resource.call(this, id, "AWS::EC2::SecurityGroup");
    this.node.Properties.GroupDescription = description;
    return this;
};

require('util').inherits(SecurityGroup, Resource);

SecurityGroup.prototype.vpcId = function (value) {
    this.node.Properties.VpcId = value;
    return this;
};

SecurityGroup.prototype.tags = function (tags) {
    if (!(tags instanceof Array)) {
        tags = [ tags];
    }
    this.node.Properties.Tags = tags;
    return this;
};

SecurityGroup.prototype.tcpIn = function (properties) {
    var args = Array.prototype.slice.call(arguments, 1);
    var ingress = this.node.Properties.SecurityGroupIngress;
    if (!ingress) {
        ingress = this.node.Properties.SecurityGroupIngress = [];
    }
    args.forEach(function (arg) {
        var rule = {};
        for (key in properties) {
            rule[key] = properties[key];
        }
        rule.IpProtocol = "tcp";
        if (arg instanceof Array) {
            if (arg.length == 2) {
                rule.FromPort = arg[0];
                rule.ToPort = arg[1];
            }
        } else {
            rule.FromPort = arg;
            rule.ToPort = arg;
        }
        ingress.push(rule);
    });
    return this;
};

module.exports = SecurityGroup;
