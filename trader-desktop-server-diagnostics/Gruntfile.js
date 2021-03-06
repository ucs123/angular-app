'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Runs application in a web server
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            connect.static('src')
                        ];
                    }
                }
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: [
                    'src/app.js',
                    'Gruntfile.js'
                ],
                tasks: ['jshint']
            },
            src: {
                files: [
                    'src/**/*'
                ],
                options: {
                    livereload: true
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'src/app.js',
                'Gruntfile.js'
            ]
        }

    });

    grunt.registerTask('default', [
        'connect:livereload',
        'jshint',
        'watch'
    ]);
};
