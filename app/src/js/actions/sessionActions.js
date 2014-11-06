'use strict';

var AppDispatcher = require('dispatcher/appDispatcher'),
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    Routes = AppConstants.Routes,
    reqwest = require('reqwest');

var SessionActions = {
    
    //login: function(email, password) {
    //    AppDispatcher.handleServerAction({
    //        type: ActionTypes.SESSION_LOGIN_ATTEMPT,
    //        email: email,
    //        password: password
    //    });
    //}
    fetchCurrentUser: function() {
        reqwest({
            url: Routes.currentUser,
            type: 'json'
        })
        .then(function(res) {
            AppDispatcher.handleServerAction({
                type: ActionTypes.SESSION_UPDATE_CURRENT_USER,
                user: res
            });
        });
        
    }
};

module.exports = SessionActions;
