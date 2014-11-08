'use strict';

var AppDispatcher = require('dispatcher/appDispatcher'),
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    Routes = AppConstants.Routes,
    CurrentUserStore = require('stores/currentUserStore'),
    reqwest = require('reqwest');

var AdminActions = function() {
    
    var currentUser = CurrentUserStore.getCurrentUser();
    if (!currentUser || !currentUser.admin) {
        // TODO Handle AUTH err
        return {};
    }
    
    return  {
        submitPost: function(post) {
            reqwest({
                url: Routes.admin.submitPost,
                method: 'POST',
                data: post, 
            }).then(function(res) {
                console.log(res); 
            }).fail(function(err, msg) {
                 
            });
        }
    };
        
};

module.exports = AdminActions;
