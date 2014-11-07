'use strict';

var AppDispatcher = require('dispatcher/appDispatcher'),
    assign = require('react/lib/Object.assign'),
    EventEmitter = require('events').EventEmitter,
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    CHANGE_EVENT = 'change';

var _currentUser = null;

var CurrentUserStore = assign({}, EventEmitter.prototype, {
    
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback); 
    },

    getCurrentUser: function() {
        return _currentUser;
    }
});

CurrentUserStore.dispatcherToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.SESSION_UPDATE_CURRENT_USER:
            _currentUser = action.user;
            CurrentUserStore.emitChange();
            break;
        case ActionTypes.SESSION_LOGOUT:
            _currentUser = null;
            CurrentUserStore.emitChange();
            break;
    }
});

module.exports = CurrentUserStore;
