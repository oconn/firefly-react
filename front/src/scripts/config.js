require.config({
    // Initialize with main file
    deps: window.mocha ? ['specs/specRunner'] : ['main'],

    paths:  {
        // Libraries
        'jquery': 'vendor/jquery',
        'underscore': 'vendor/underscore',
        'backbone': 'vendor/backbone',
        'marionette': 'vendor/backbone.marionette',
        'backbone.wreqr': 'vendor/backbone.wreqr',
        'backbone.babysitter': 'vendor/backbone.babysitter',
        'handlebars': 'vendor/handlebars',
        'marionette.formview': 'vendor/marionette.formview',
        'fastclick': 'vendor/fastclick',
        'mocha': 'vendor/mocha',
        'chai': 'vendor/chai',
        'sinon': 'vendor/sinon',
        'sinon-chai': 'vendor/sinon-chai'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
          deps : ['jquery', 'underscore'],
          exports : 'Backbone'
        },
        'marionette': {
          deps : ['jquery', 'underscore', 'backbone'],
          exports : 'Marionette'
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    },
    baseUrl: '/scripts/',
    name: "main",
    out: "dist/main.js",
    removeCombined: true
});
