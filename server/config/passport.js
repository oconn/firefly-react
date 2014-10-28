module.exports = function(passport, User) {

    passport.serializeUser(function(user, done) {    
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
};
