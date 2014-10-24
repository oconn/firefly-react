define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Wreqr = require('backbone.wreqr');

    var state = {
        vent: new Backbone.Wreqr.EventAggregator() 
    };

    return state;
});
