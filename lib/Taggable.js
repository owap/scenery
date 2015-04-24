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

var _ = require('lodash');
var Resource = require('./Resource.js');

var Taggable = function(id, type, properties, template) {
    var r =  Resource.call(this, id, type, properties, template );
    if( r.node.Properties.Tags === null){
        r.node.Properties.Tags = [];
    }
    return r;
};
require('util').inherits(Taggable, Resource);

/////////////////////////////////
// Taggable-specific functions //
/////////////////////////////////
Taggable.prototype.addTag = function (key, value) {
    if (!(this.node.Properties.Tags instanceof Array)) {
        this.node.Properties.Tags = [];
    }

    //  If tag exists, remove original before adding updated version
    var existingTag = _.find(this.node.Properties.Tags, function(tag){
        return tag.Key === key;
    });
    if (existingTag){
        this.node.Properties.Tags = _.without(this.node.Properties.Tags, existingTag);
    }

    this.node.Properties.Tags.push({'Key': key, 'Value': value ||''});
    return this;
};

Taggable.prototype.getTags = function() {
    return this.node.Properties.Tags;
};

Taggable.prototype.addName = function (name) {
    return this.addTag('Name', name);
};

Taggable.prototype.addDescription = function (desc) {
    return this.addTag('Description', desc);
};

module.exports = Taggable;
