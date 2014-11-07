'use strict';

var AppDispatcher = require('dispatcher/appDispatcher'),
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    Routes = AppConstants.Routes,
    reqwest = require('reqwest');

var BlogActions = {
    
    fetchPosts: function() {
        reqwest({
            url: Routes.fetchAllPosts,
            type: 'json'
        })
        .then(function(res) {
            AppDispatcher.handleServerAction({
                type: ActionTypes.BLOG_FETCH_ALL_POSTS,
                posts: res
            }); 
        }); 
    }
};

module.exports = BlogActions;
