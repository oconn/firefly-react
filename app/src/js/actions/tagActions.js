'use strict';

var AppDispatcher = require('dispatcher/appDispatcher'),
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes,
    Routes = AppConstants.Routes,
    reqwest = require('reqwest'),
    Promise = require('es6-promise').Promise;

var TagActions = {
    
    fetchTags: function() {
        return new Promise(function(resolve, reject) {
            reqwest({
                url: Routes.tags,
                type: 'json'
            }).then(function(res) {
                AppDispatcher.handleServerAction({
                    type: ActionTypes.TAGS_FETCH_ALL_TAGS,
                    tags: res
                });
                resolve();
            }).fail(function(err) {
                // TODO
                reject();
            }); 
        });
    }
};

module.exports = TagActions;
