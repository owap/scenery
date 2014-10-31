'use strict';

var Resource = require('../Resource.js');
var Route = require('./Route.js');

var RouteTable = function (id, description, template) {
    return Resource.call(this, id, 'AWS::EC2::RouteTable', { Tags: [{ Key: 'Description', Value: description}] }, template);
};
require('util').inherits(RouteTable, Resource);

RouteTable.prototype.tags = function(value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.Tags = value;
    return this;
};

RouteTable.prototype.vpcId = function(value) {
        if(typeof value === 'string'){
        value = { 'Ref': value };
    }

    this.node.Properties.VpcId = value;
    return this;
};

RouteTable.prototype.addRoute = function(id, description) {
    var r = this.template.addResource(new Route(id, description,this.template));
    r.routeTableId(this.id);
    return r;
};

module.exports = RouteTable;
