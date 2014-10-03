var MongoClient = require('mongodb').MongoClient,
    passport = require('passport'),
    database = require('./config/database'),
    routes = require('./routes'),
    Promise = require('es6-promise').Promise,
    log = require('util').log;

module.exports = new Promise(function(resolve, reject) {
    MongoClient.connect(database.url, function(err, db) {
        if (err) {
            reject(err);
            return;
        }
        
        // Configure Passport 
        require('./config/passport')(passport, db.collection('users'));
        
        // Initialize Express 4 
        var app = require('./express')(db, passport);
        
        // Start Routes
        routes(app, db, passport);
    
        log("Connected to MongoDB on port(s) " + database.servers);

        resolve(app);
        return;
    });
});
