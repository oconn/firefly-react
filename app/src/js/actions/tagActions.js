'use strict';

var AppDispatcher = require('dispatcher/appDispatcher'),
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    Routes = AppConstants.Routes,
    reqwest = require('reqwest');

var TagActions = {
    
    fetchTags: function() {
        reqwest({
            url: Routes.tags,
            type: 'json'
        })
        .then(function(res) {
            AppDispatcher.handleServerAction({
                type: ActionTypes.TAGS_FETCH_ALL_TAGS,
                posts: res
            }); 
        }); 
    }
};

module.exports = TagActions;
