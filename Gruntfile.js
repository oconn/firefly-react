var gruntConfig = require('./server/config/grunt_config');

module.exports = function(grunt) {
    
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        banner: gruntConfig.banner,

        watch: {
            sass: {
                files: [ 'app/src/scss/**/*.scss' ],
                options: { livereload: true },
                tasks: [ 'sass' ]
            },
            app: {
                files: [ 'app/src/js/**/*.js' ],
                options: { livereload: true },
                tasks: [ 'browserify', 'jshint:app' ]
            },
            server: {
                files: '<%= jshint.server %>',
                tasks: [ 'jshint:server' ] 
            },
            assets: {
                files: [
                    'app/src/assets/**',
                    'app/src/scss/sprites/**'
                ],
                tasks: [ 'copy:assets' ]
            }
        },

        browserify: {
            app: {
                files: {
                    'app/public/js/bundle.js' : ['app/src/js/**/*.js']
                },
                options: {
                    transform: [
                        'reactify',
                        'envify'
                    ]
                }   
            }
        },

        sass: {
            options: {
                require: [
                    'susy',
                    'breakpoint'
                ],
                bundleExec: true
            },
            compile: {
                files: { 'app/public/css/app.css': 'app/src/scss/main.scss' }
            }
        },

        copy: {
            assets: {
                files: [
                    {   
                        expand: true,
                        cwd: 'app/src/assets',
                        src: ['**/*'],
                        dest: 'app/public/assets/'
                    },
                    {
                        expand: true,
                        cwd: 'app/src/scss/sprites',
                        src: ['**/*'],
                        dest: 'app/public/css/'
                    }
                ]
            } 
        },

        concurrent: {
            start: {
                tasks: ['nodemon:dev', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        
        nodemon: {
            dev: {
                script: 'bin/www',
                options: {
                    env: {
                        NODE_ENV: 'local_development'
                    },
                    watch: 'server'
                }
            } 
        },

        jshint: {
            options: gruntConfig.jshintOptions,
            app: [ 'app/src/js/**/*.js' ],
            server: [
                'Gruntfile.js',
                'server/**/*.js'
            ] 
        }
    });

    grunt.util._.each([
        'contrib-watch',
        'contrib-sass',
        'contrib-copy',
        'concurrent',
        'browserify',
        'nodemon',
        'jsxhint'
    ], function(task) {
        grunt.loadNpmTasks('grunt-' + task);
    });

    grunt.registerTask('start', ['concurrent:start']);
};
