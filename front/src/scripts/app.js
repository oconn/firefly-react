define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Marionette = require('marionette'),
        state = require('state'),
        Router = require('routers/appRouter');
    
    var App = Backbone.Marionette.Application.extend({

        initialize: function() {
            this.on("before:start", function(options){
                this.bootstrap(options);
            }.bind(this));

            this.on("start", function(options){
                // this.startApp(options);
            }.bind(this));

            this.addRegions({
                wrapper: "#app-wrapper",
                modal: '#modal'
            });

            this.start();
        },

        bootstrap: function(options) {
            // this.listenTo(state.vent, 'show:app', this.showApp);
            // this.listenTo(state.vent, 'show:modal', this.showModal);
            this.router = new Router();
            // this.initializeState();

            if (Backbone.history) {
                Backbone.history.start({pushState: true, root: '/'});
            }
        }
    });

    return App;
});
