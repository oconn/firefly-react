var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    csurf = require('csurf'),
    session = require('express-session'),
    sessionSecret = process.env.SESSION_COOKIE_SECRET || 'session secret shh...',
    cookieParser = require('cookie-parser'),
    MongoStore = require('connect-mongo')(session);
    
var staticPath = __env === 'production' ? 
        __base + '/app/dist' : 
        __base + '/app/public';

module.exports = function(db, passport) {
    
    var app = express(),
        server = require('http').Server(app),
        io = require('socket.io')(server);

    server.listen(7000);

    var sessionMiddleware = session({
        secret: sessionSecret,
        saveUninitialized: true,
        resave: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 Days
        },
        store: new MongoStore({
            db: db,
            collection: 'sessions'
        })
    });
    
    // Serializes User on socket connections
    io.use(function(socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next);
    });
    
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
    app.use(sessionMiddleware);
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    return {
        app: app, 
        io: io
    };
};
