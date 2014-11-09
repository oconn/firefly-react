'use strict';

var AppDispatcher = require('dispatcher/appDispatcher'),
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    Routes = AppConstants.Routes,
    reqwest = require('reqwest'),
    Promise = require('es6-promise').Promise;

var BlogActions = {
    
    fetchPosts: function() {
        return new Promise(function(resolve, reject) {
            reqwest({
                url: Routes.posts,
                type: 'json'
            }).then(function(res) {
                AppDispatcher.handleServerAction({
                    type: ActionTypes.BLOG_FETCH_ALL_POSTS,
                    posts: res
                }); 
                resolve();
            }).fail(function(res) {
                // TODO 
                reject();
            }); 
        });
    },

    incrementViewCount: function(id) {
        reqwest({
            url: Routes.posts + '/' + id + '/view',
            method: 'PUT'
        }).then(function(res) {
            AppDispatcher.handleServerAction({
                type: ActionTypes.BLOG_ADD_VIEW_TO_POST,
                posts: res
            }); 
        });
    }
};

module.exports = BlogActions;
