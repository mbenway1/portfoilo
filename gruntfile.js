var devMode = true;

module.exports = function (grunt) {

    // Configuration
    grunt.initConfig({
        // Pass in options to plugins, references to files, ect

        // Plugin to combine files
        concat: {

            js: {

                src: 'app/components/Bootstrap/js/*.js',
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
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Registered Tasks
    grunt.registerTask('concat-js', ['concat:js']);
    grunt.registerTask('concat-css', ['concat:css']);
    if (devMode) {
        grunt.registerTask('default', ['sass', 'concat']);
    }
    else {
        grunt.registerTask('default', ['sass', 'concat', 'uglify', 'cssmin']);
    }

};

