var devMode = true;

module.exports = function (grunt) {

    // Configuration
    grunt.initConfig({
        // Pass in options to plugins, references to files, ect

        // Plugin to combine files
        concat: {

            js: {

                src: ['app/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',
                      'app/components/jQuery/jquery-3.1.1.js',
                      'app/bower_components/angular/angular.js',
                      'app/bower_components/angular-route/angular-route.js',
                    'app/js/app.js',
                    'app/js/Controllers/*.js',
                      'app/components/version/version.js',
                      'app/components/version/version-directive.js',
                      'app/components/version/interpolate-filter.js',
                      'app/components/Bootstrap/js/*.js',
                    'app/components/InputEffects/js/classie.js',
                    'app/components/InputEffects/js/input.js'
                     ],
                dest: 'app/build/js/scripts.js'

            },

            css: {

                src: 'app/components/Custom/style.css',
                dest: 'app/build/css/style.css'

            }
        },
        sass: {

            build: {

                files: [{

                    src: 'app/components/Custom/style.scss',
                    dest: 'app/components/Custom/style.css'

                }]
            }
        },
        uglify: {

            build: {

                files: [{

                    src: 'app/build/js/scripts.js',
                    dest: 'app/build/js/scripts.min.js'

                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 8 versions']
            },
            dist: {
                files: {
                    'app/components/Custom/style.css': 'app/components/Custom/style.css'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'app/build/css',
                    src: ['style.css'],
                    dest: 'app/build/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['default']
            },
            scripts: {
                files: ['**/*.js'],
                tasks: ['default']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Registered Tasks
    grunt.registerTask('concat-js', ['concat:js']);
    grunt.registerTask('concat-css', ['concat:css']);
    if (devMode) {
        grunt.registerTask('default', ['sass', 'concat', 'autoprefixer']);
    }
    else {
        grunt.registerTask('default', ['sass', 'concat', 'autoprefixer', 'uglify', 'cssmin']);
    }

};

