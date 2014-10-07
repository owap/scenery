'use strict';

var Resource = require('../Resource.js');

var SecurityGroupIngress = function (id) {
    Resource.call(this, id, 'AWS::EC2::SecurityGroupIngress');
    return this;
};

require('util').inherits(SecurityGroupIngress, Resource);

SecurityGroupIngress.prototype.tcpIn = function (properties) {
    var args = Array.prototype.slice.call(arguments, 1);
    args.forEach(function (arg) {
        var rule = {};
        for (var key in properties) {
            rule[key] = properties[key];
        }
        rule.IpProtocol = 'tcp';
        if (arg instanceof Array) {
            if (arg.length === 2) {
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

module.exports = SecurityGroupIngress;
