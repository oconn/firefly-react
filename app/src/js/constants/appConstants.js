'use strict';

var keyMirror = require('react/lib/keyMirror');

var AppConstants = {

    ActionTypes: keyMirror({
        SESSION_UPDATE_CURRENT_USER: null,
        SESSION_LOGOUT: null,
        SESSION_REDIRECT: null,
        BLOG_FETCH_ALL_POSTS: null,
        BLOG_ADD_NEW_POST: null,
        BLOG_UPDATE_POST: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    Routes: {
        currentUser: '/api/current_user',
        logout: '/logout',
        fetchAllPosts: '/api/posts',
        
        admin: {
            apiPosts: '/api/posts'
        }
    }
};

module.exports = AppConstants;
