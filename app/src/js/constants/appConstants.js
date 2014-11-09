'use strict';

var keyMirror = require('react/lib/keyMirror');

var AppConstants = {

    ActionTypes: keyMirror({
        BLOG_FETCH_ALL_POSTS: null,
        BLOG_ADD_NEW_POST: null,
        BLOG_UPDATE_POST: null,
        SESSION_UPDATE_CURRENT_USER: null,
        SESSION_LOGOUT: null,
        SESSION_REDIRECT: null,
        TAGS_FETCH_ALL_TAGS: null,
        TAGS_ADD_TAG: null,
        TAGS_REMOVE_TAG: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    Routes: {
        currentUser: '/api/current_user',
        logout: '/logout',
        posts: '/api/posts',
        tags: '/api/tags'
    }
};

module.exports = AppConstants;
