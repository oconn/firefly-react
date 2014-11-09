'use strict';
var _ = require('lodash');
var AppDispatcher = require('dispatcher/appDispatcher'),
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    Routes = AppConstants.Routes,
    reqwest = require('reqwest'),
    Promise = require('es6-promise').Promise;

var SessionActions = {
    
    fetchCurrentUser: function() {
        return new Promise(function(resolve, reject) {
            if (window.localStorage && window.localStorage.getItem('user')) {
                AppDispatcher.handleServerAction({
                    type: ActionTypes.SESSION_UPDATE_CURRENT_USER,
                    user: JSON.parse(window.localStorage.getItem('user'))
                });
                resolve();
            } else {
                reqwest({
                    url: Routes.currentUser,
                    type: 'json'
                }).then(function(res) {
                    if (!_.isEmpty(res)) {
                        if (window.localStorage) {
                            window.localStorage.setItem('user', JSON.stringify(res));
                        }
                        AppDispatcher.handleServerAction({
                            type: ActionTypes.SESSION_UPDATE_CURRENT_USER,
                            user: res
                        });
                        resolve();
                    } else {
                        resolve();
                    }
                }).fail(function(err) {
                    // TODO
                    reject();
                })
            }
        });
    },

    logout: function() {
        if (window.localStorage) {
            window.localStorage.removeItem('user');
        }
        
        reqwest({
            url: Routes.logout,
            method: 'GET'
        }).then(function(res) {
            AppDispatcher.handleServerAction({
                type: ActionTypes.SESSION_LOGOUT
            });
            AppDispatcher.handleViewAction({
                type: ActionTypes.SESSION_REDIRECT,
                path: '/'
            });
        });
    },

    redirect: function(path) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SESSION_REDIRECT,
            path: path
        });
    }
};

module.exports = SessionActions;
