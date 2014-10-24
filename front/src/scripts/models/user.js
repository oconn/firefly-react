define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');
    
    var User = Backbone.Model.extend({
        idAttribute: '_id',
        url: '/api/current_user'
    });

    return User;
});
