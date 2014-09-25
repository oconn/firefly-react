var express = require('express'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    csrf = require('csurf'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    
    // Vendor Modules
    MongoClient = require('mongodb').MongoClient,
    passport = require('passport'),
    
    // Nodejs Modules
    path = require('path'),

    // Custome Modules
    database = require('./config/database'),
    routes = require('./back/routes'),
    env = process.env.NODE_ENV || 'development';

var app = express(),
    staticPath = env === 'production' ? 'front/public' : 'front/src';

// Set up the view engine
app.set('views', path.join(__dirname, 'back', 'views'));
app.set('view engine', 'jade');

// Middleware
// app.use(cors());
app.use('/', express['static'](path.join(__dirname, staticPath)));
// app.use(favicon(__dirname, + '/frontend/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: '<mysecret>', 
    saveUninitialized: true,
    resave: true
}));

var db = MongoClient.connect(database.url, function(err, db) {
    if (err) {
        throw err;
    }

    require('./config/passport')(passport, db.collection('users'));

    app.use(passport.initialize());
    app.use(passport.session());

    routes(app, db, passport);
    require('util').log("Connected to MongoDB on port(s) " + database.servers);
});

module.exports = app;
