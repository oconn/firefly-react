define([
    'backbone',
    'backbone.wreqr'
], function( Backbone ) {
    "use strict";

    var state = {
        vent : new Backbone.Wreqr.EventAggregator()
    };

    return state;
});