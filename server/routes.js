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
        usersController = require('./controllers/r/usersController')(db),
        postsController = require('./controllers/r/postsController')(db);
    
    // ************** TESTS ************** //
    // if (__env !== 'production') {
    //     app.get('/_test', staticPagesController.tests);
    // }

    // *********************************** //
    // *************** API *************** //
    // *********************************** //
    
    // ************* POSTS *************** //
    app.get('/api/posts', postsController.getPosts);
    app.get('/api/posts/slug', postsController.getPostBySlug);
    app.get('/api/posts/:id', postsController.getPost);
    app.post('/api/posts', isAdmin, postsController.createPost);
    app.put('/api/posts/:id', isAdmin, postsController.updatePost);
    app.del('/api/posts/:id', isAdmin, postsController.deletePost);
    
    
    // ************* USERS *************** //
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
