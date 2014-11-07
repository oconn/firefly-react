'use strict';

var keyMirror = require('react/lib/keyMirror');

var AppConstants = {

    ActionTypes: keyMirror({
        SESSION_UPDATE_CURRENT_USER: null,
        SESSION_LOGOUT: null,
        BLOG_FETCH_ALL_POSTS: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    Routes: {
        currentUser: '/api/current_user',
        fetchAllPosts: '/api/posts'
    }
};

module.exports = AppConstants;
