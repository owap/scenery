'use strict';

var Resource = require('../Resource.js');

var InternetGateway = function (id, description) {
    return Resource.call(this, id, 'AWS::EC2::InternetGateway', { Tags: [] });
};

require('util').inherits(InternetGateway, Resource);

InternetGateway.prototype.tags = function(value) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    this.node.Properties.Tags = value;
    return this;
};

module.exports = InternetGateway;
