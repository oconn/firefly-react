var routes = require('./routes'),
    log = require('util').log;

var app = require('./express')();

routes(app);

module.exports = app;
