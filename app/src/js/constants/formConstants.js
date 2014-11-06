'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = {
    ActionTypes: keyMirror({
        FORM_REGISTER_FIELD: null,
        FORM_REGISTER_FORM: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    })
};
