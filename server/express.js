var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    csurf = require('csurf'),
    session = require('express-session'),
    cookieParser = require('cookie-parser');
    
var staticPath = __env === 'production' ? 
        __base + '/app/dist' : 
        __base + '/app/public';

module.exports = function() {
    
    var app = express();
    
    // Set up the view engine
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    
    // Middleware
    app.use('/', express['static'](staticPath));
    if (__env !== 'production') {
        app.use(morgan('dev'));
    }
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({
        secret: process.env.SESSION_COOKIE_SECRET || 'session secret shh...',
        saveUninitialized: true,
        resave: true
    }));
    
    return app;
};
