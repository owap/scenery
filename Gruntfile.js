'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        nodeunit: {
            all: ['test/*_test.js']
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'lib/**/*.js',
                'test/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    // Load the tasks defined in the config above
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the 'test' task is run, run some basic tests.
    var path = require('path');
    grunt.registerTask('test', function(which) {
        var test = path.join(__dirname, 'test', which + '.js');
        if (grunt.file.exists(test)) {
            grunt.config('nodeunit.tests', test);
        }
        grunt.task.run('nodeunit');
    });


    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);
};
