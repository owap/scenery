'use strict';

var Resource = require ('../lib/Resource.js');
var Taggable = require ('../lib/Taggable.js');
var _ = require('lodash');

exports.TaggableTypeTest = function(test){
    var notTaggable = new Resource('notTaggableResource');
    var taggable = new Taggable('taggableResource');

    test.expect(4);
    test.ok(taggable instanceof Taggable);
    test.ok(!(notTaggable instanceof Taggable));

    test.doesNotThrow(function(){
        taggable.addTag('key', 'value');
        var myTags = taggable.getTags();
    }, 'Taggable resources should be able to call "addTag"');

    test.throws(function(){
        notTaggable.addTag('key', 'value');
    });

    test.done();
};

exports.NameableTest = function(test){
    var notTaggable = new Resource('notTaggableResource');
    var taggable = new Taggable('taggableResource');

    test.expect(3);
    test.doesNotThrow(function(){
        taggable.addName('testName');
        var tags = taggable.getTags();
        test.ok('testName' === tags[0].Value);
    });

    test.throws(function(){
        notTaggable.addName('testName');
    });

    test.done();
};
