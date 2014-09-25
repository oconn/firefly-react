var path = require('path');
var gruntConfig = require('./config/grunt_config');

module.exports = function(grunt) {
    
    var env = grunt.option('env') || 'dev';
    
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        banner: gruntConfig.banner,

        watch: {
            sass: {
                files: [
                    'front/src/styles/**/*.scss',
                    '!front/src/styles/fontawesome/**'
                ],
                tasks: [ 'sass' ]
            },
            jsFront: {
                files: '<%= jshint.front %>',
                tasks:
                [
                    'jshint:front'
                ]
            },
            jsServer: {
                files: '<%= jshint.server %>',
                tasks: ['jshint:server'] 
            },
            handlebars: {
                files: [
                    'front/src/scripts/templates/helpers.js',
                    'front/src/templates/**/*.hbs'
                ],
                tasks: [
                    'handlebars:compile',
                    'concat:handlebars'
                ]
            },
            assets: {
                files: [
                    'front/src/assets/**',
                    'front/src/styles/sprites/**'
                ],
                tasks: [
                    'copy:assets'
                ]
            }
        },

        jshint: {
            options: {
                bitwise: false,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                es3: true,
                globals: {
                    // for node/browser compat
                    "global": false,
                    "module": false,
                    "Buffer": false,
                    "process": false,
                    "__dirname": false,
                    'static': false,
                    // requirejs
                    "define": false,
                    "require": true,
                    // handlebars, for helpers file
                    "Handlebars": false,
                    // jasmine
                    "beforeEach": false,
                    "describe": false,
                    "xdescribe": false,
                    "expect": false,
                    "it": false,
                    "xit": false,
                    "jasmine": false,
                    "runs": false,
                    "spyOn": false,
                    "waits": false,
                    "waitsFor": false
                }
            },
            front: [
                'front/src/scripts/**/*.js',
                '!front/src/scripts/vendor/**/*.js',
                '!front/src/scripts/templates/**/*.js'
            ],
            server: [
                'server.js',
                'back/**/*.js',
                'config/**/*.js',
                'Gruntfile.js',
                'test/spec/**/*.js',
                'utils/**/*.js'
            ]
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
                files: {
                    'front/src/styles/main.css': 'front/src/styles/main.scss'
                }
            }
        },

        handlebars: {
            compile: {
                options: {
                    amd: true,
                    namespace: false,
                    partialRegex: /.*\.hbs/,
                    partialsPathRegex: /\/partials\//,
                    processPartialName: function (filePath) {
                        var frags = filePath.split('/');
                        var fileName = grunt.util._.last(frags);
                        var fileFrag = fileName.split('.')[0];
                        var partialFrag = frags.indexOf('partials');

                        frags = grunt.util._.rest(frags, partialFrag + 1);
                        frags.splice(frags.length - 1, 1, fileFrag);

                        return frags.join('/');
                    }
                },
                expand: true,
                cwd: 'front/src/templates/',
                src: '**/*.hbs',
                dest: 'front/src/scripts/templates/',
                ext: '.js'
            }
        },

        concat: {
            // options: {
            //     banner: '<%= banner %>',
            //     stripBanners: true
            // },
            handlebars: {
                src: [
                    'front/src/vendor/handlebars.js/handlebars.runtime.js',
                    'front/src/scripts/templates/helpers.js'
                ],
                dest: 'front/public/scripts/handlebars.js'
            },
            js: {
                src: [
                    'front/public/packages/almond/almond.js',
                    'dist/build/public/scripts/app.js'
                ],
                dest: 'dist/release/public/scripts/app.js'
            }
        },

        copy: {
            build: {
                files: gruntConfig.buildFiles
            },
            assets: {
                files: gruntConfig.assetFiles
            }
        },
        
        requirejs: {
            compile: {
                options: {
                    name: 'main',
                    baseUrl: './front/src/scripts/',
                    mainConfigFile: './front/src/scripts/main.js',
                    out: './front/public/scripts/app.js',
                    optimize: 'none',
                    include: ['vendor/require.js']
                }
            }
        }
    });

    grunt.util._.each([
        'contrib-watch',
        'contrib-jshint',
        'contrib-sass',
        'contrib-handlebars',
        'contrib-copy',
        'contrib-jasmine',
        'contrib-concat',
        'contrib-requirejs'
    ], function(task) {
        grunt.loadNpmTasks('grunt-' + task);
    });

    grunt.registerTask('templates', [
        'handlebars:compile',
        'concat:handlebars'
    ]);

    grunt.registerTask('release', [
        'requirejs',
        'copy:release'
    ]);
};


// ************ GRUNT TASKS ************* //
/* 


grunt watch

- monitors .hbs templates and compiles them
- monitors .js app & server (jshint)
- monitors .scss & compiles to .css in src
- monitors assets & copys to public

grunt copy:build 

- copys minimum files from bower to src (run first time)

grunt release

- runs r.js to package js files and copys main.css to public
*/

