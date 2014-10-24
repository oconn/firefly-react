define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');
    
    var Users = Backbone.Collection.extend({
        idAttribute: '_id',
        url: '/api/users'
    });

    return Users;  
});

