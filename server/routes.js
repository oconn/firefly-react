// Middleware

function isLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).redirect('/');
    }

    return next();
}

function isAdmin(req, res, next) {
    if (!req.isAuthenticated() || !req.user.admin) {
        return res.status(401).send();
    } 

    return next();
}

module.exports = function(app, io, db, passport) {
    var staticPagesController = require('./controllers/r/staticPagesController'),
        usersController = require('./controllers/r/usersController')(db);
    
    // ************** TESTS ************** //
    // if (__env !== 'production') {
    //     app.get('/_test', staticPagesController.tests);
    // }

    // *********************************** //
    // *************** API *************** //
    // *********************************** //
    app.get('/api/current_user', usersController.getCurrentUser);
    app.get('/api/users', [isAdmin], usersController.getUsers);

    // *********************************** //
    // ************ SESSIONS ************* //
    // *********************************** //
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: false 
    }));    

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });    
    // *********************************** //
    // ********* STATIC PAGES *********** //
    // *********************************** //
    app.get('*', staticPagesController.index);

    // *********************************** //
    // ************* SOCKETS ************* //
    // *********************************** //
};
