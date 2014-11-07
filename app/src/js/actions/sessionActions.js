'use strict';
var _ = require('lodash');
var AppDispatcher = require('dispatcher/appDispatcher'),
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    Routes = AppConstants.Routes,
    reqwest = require('reqwest');

var SessionActions = {
    
    fetchCurrentUser: function() {
        if (window.localStorage && window.localStorage.getItem('user')) {
            AppDispatcher.handleServerAction({
                type: ActionTypes.SESSION_UPDATE_CURRENT_USER,
                user: JSON.parse(window.localStorage.getItem('user'))
            });
        } else {
            reqwest({
                url: Routes.currentUser,
                type: 'json'
            })
            .then(function(res) {
                if (!_.isEmpty(res)) {
                    if (window.localStorage) {
                        window.localStorage.setItem('user', JSON.stringify(res));
                    }

                    AppDispatcher.handleServerAction({
                        type: ActionTypes.SESSION_UPDATE_CURRENT_USER,
                        user: res
                    });
                }
            });
        }
    },

    logout: function() {
        if (window.localStorage) {
            window.localStorage.removeItem('user');
        }
        AppDispatcher.handleServerAction({
            type: ActionTypes.SESSION_LOGOUT
        });
    }
};

module.exports = SessionActions;
