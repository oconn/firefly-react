var options = {};

options.banner = '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
    '<%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n';

options.buildFiles = [
    {
        src: 'packages/modernizr/modernizr.js',
        dest: 'front/src/scripts/vendor/modernizr.js'
    },
    {
        src: 'packages/requirejs/require.js',
        dest: 'front/src/scripts/vendor/require.js'
    },
    {
        src: 'packages/jquery/dist/jquery.js',
        dest: 'front/src/scripts/vendor/jquery.js'
    },
    {
        src: 'packages/underscore/underscore.js',
        dest: 'front/src/scripts/vendor/underscore.js'
    },
    {
        src: 'packages/backbone/backbone.js',
        dest: 'front/src/scripts/vendor/backbone.js'
    },
    {
        src: 'packages/marionette/lib/core/backbone.marionette.js',
        dest: 'front/src/scripts/vendor/backbone.marionette.js'
    },
    {
        src: 'packages/backbone.wreqr/lib/backbone.wreqr.js',
        dest: 'front/src/scripts/vendor/backbone.wreqr.js'
    },
    {
        src: 'packages/backbone.babysitter/lib/backbone.babysitter.js',
        dest: 'front/src/scripts/vendor/backbone.babysitter.js'
    },
    {      
        src: 'packages/handlebars/handlebars.js',
        dest: 'front/src/scripts/vendor/handlebars.js'
    },
    {
        src: 'packages/marionette.formview/dist/FormView.js',
        dest: 'front/src/scripts/vendor/marionette.formview.js'
    },
    {
        src: 'packages/chosen/chosen.jquery.js',
        dest: 'front/src/scripts/vendor/chosen.jquery.js'
    },
    {
        src: 'packages/lodash/dist/lodash.js',
        dest: 'front/src/scripts/vendor/lodash.js'
    },
    {
        src: 'packages/modernizr/modernizr.js',
        dest: 'front/public/scripts/modernizr.js'
    },  
    {
        src: 'front/src/scripts/login.js',
        dest: 'front/public/scripts/login.js'
    }
];

options.assetFiles = [
    {   
        expand: true,
        cwd: 'front/src/assets',
        src: ['**/*'],
        dest: 'front/public/assets/'
    },
    {
        expand: true,
        cwd: 'front/src/styles/sprites',
        src: ['**/*'],
        dest: 'front/public/styles/'
    }
];

options.releaseFiles = [
    {
        src: 'front/src/styles/main.css',
        dest: 'front/public/styles/main.css'
    }
];

module.exports = options;
