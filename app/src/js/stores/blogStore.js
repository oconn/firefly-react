'use strict';

var AppDispatcher = require('dispatcher/appDispatcher'),
    assign = require('react/lib/Object.assign'),
    EventEmitter = require('events').EventEmitter,
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    CHANGE_EVENT = 'change',
    _ = require('lodash');

var _posts = [];

var BlogStore = assign({}, EventEmitter.prototype, {
    
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback); 
    },

    getAllPosts: function() {
        return _posts;
    },

    getPost: function(id) {
        return _.filter(_posts, function(post) {
            return post._id === id;
        })[0];
    }
});

BlogStore.dispatcherToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.BLOG_FETCH_ALL_POSTS:
            _posts = action.posts;
            BlogStore.emitChange();
            break;
        case ActionTypes.BLOG_ADD_NEW_POST:
            _posts.push(action.post);
            BlogStore.emitChange();
            break;
        case ActionTypes.BLOG_UPDATE_POST:
            var updatedPost = action.post;
            _posts = _.map(_posts, function(post) {
                return post._id === updatedPost._id ? updatedPost : post;
            }); 
            BlogStore.emitChange();
            break;
        case ActionTypes.BLOG_REMOVE_POST:
            _posts = _.reject(_posts, function(post) {
                return post._id === action.id;
            });
            BlogStore.emitChange();
            break;
    }
});

module.exports = BlogStore;
