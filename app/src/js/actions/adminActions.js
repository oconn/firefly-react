'use strict';

var AppDispatcher = require('dispatcher/appDispatcher'),
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    Routes = AppConstants.Routes,
    SessionStore = require('stores/sessionStore'),
    reqwest = require('reqwest');

var AdminActions = function() {
    
    var currentUser = SessionStore.getCurrentUser();
    if (!currentUser || !currentUser.admin) {
        // TODO Handle AUTH err
        return {};
    }
    
    return  {
        submitPost: function(post) {
            reqwest({
                url: Routes.posts,
                method: 'POST',
                data: post
            }).then(function(res) {
                AppDispatcher.handleServerAction({
                    type: ActionTypes.BLOG_ADD_NEW_POST,
                    post: res
                });
            }).fail(function(err) {
                // TODO
            });
        },

        updatePost: function(post) {
            reqwest({
                url: Routes.posts + '/' + post._id,
                method: 'PUT',
                data: post
            }).then(function(res) {
                AppDispatcher.handleServerAction({
                   type: ActionTypes.BLOG_UPDATE_POST,
                   post: res 
                });
            }).fail(function(err) {
                // TODO 
            });
        },

        removePost: function(id) {
            reqwest({
                url: Routes.posts + '/' + id,
                method: 'DELETE'
            }).then(function(res) {
                AppDispatcher.handleServerAction({
                    type: ActionTypes.BLOG_REMOVE_POST,
                    id: id
                });
            }).fail(function(err) {
                // TODO
            });
        },

        addTag: function(name) {
            reqwest({
                url: Routes.tags,
                method: 'POST',
                data: {name: name}
            }).then(function(res) {
                AppDispatcher.handleServerAction({
                    type: ActionTypes.TAGS_ADD_TAG,
                    tag: res 
                });
            }).fail(function(err) {
                // TODO
            });
        },

        removeTag: function(id) {
            reqwest({
                url: Routes.tags + '/' + id,
                method: 'DELETE'
            }).then(function(res) {
                AppDispatcher.handleServerAction({
                    type: ActionTypes.TAGS_REMOVE_TAG,
                    id: id
                }); 
            }).fail(function(err) {
                // TODO
            });
        }
    };
        
};

module.exports = AdminActions;
