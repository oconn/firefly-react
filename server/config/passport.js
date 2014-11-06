var LocalStrategy = require('passport-local').Strategy,
    ObjectID = require('mongodb').ObjectID,
    UserModel = require('../models/user');

module.exports = function(passport, User) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({_id: new ObjectID(id)}, function(err, user) {
            done(null, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        process.nextTick(function() {

            User.findOne({ 'email' :  email }, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false, req.flash('message', 'That email is already taken.'));
                } else {

                    var newUser = new UserModel();
                    
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.name = req.body.name;
                    
                    User.insert(newUser, function(err, write) {
                        if (err) {
                            return done(err);
                        }

                        return done(null, newUser);
                    });

                }    
            });
        });

    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {

        process.nextTick(function() {
            User.findOne({ email: email }, function(err, user) {

                if (err) { 
                    return done(err); 
                }
                
                if (!user) {
                    return done(null, false, req.flash = 'Incorrect username or password');
                }

                if (!UserModel.prototype.validPassword(password, user.password)) {
                    return done(null, false, req.flash = 'Incorrect username or password');
                }

                return done(null, user);  
            });
        
        });
    }));
};
