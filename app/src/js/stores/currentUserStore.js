'use strict';

var AppDispatcher = require('dispatcher/appDispatcher'),
    assign = require('react/lib/Object.assign'),
    EventEmitter = require('events').EventEmitter,
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    CHANGE_EVENT = 'change';

var _currentUser = {};

var CurrentUserStore = assign({}, EventEmitter.proptype, {
    
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    get: function() {
        return _currentUser;
    }
});

CurrentUserStore.dispatcherToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.SESSION_UPDATE_CURRENT_USER:
            console.log(action);
            break;
    }
});

module.exports = CurrentUserStore;
