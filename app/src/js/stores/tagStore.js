'use strict';

var AppDispatcher = require('dispatcher/appDispatcher'),
    assign = require('react/lib/Object.assign'),
    EventEmitter = require('events').EventEmitter,
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    CHANGE_EVENT = 'change',
    _ = require('lodash');

var _tags = [];

var TagStore = assign({}, EventEmitter.prototype, {
    
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback); 
    },

    getAllTags: function() {
        return _posts;
    }
});

TagStore.dispatcherToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.BLOG_FETCH_ALL_TAGS:

            break;
            
    }
});

module.exports = TagStore;
