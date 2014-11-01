// Middleware

function isAuthed(req, res, next) {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect('/login');
}

module.exports = function(app, io, db, passport) {
    var staticPagesController = require('./controllers/staticPagesController');
    
    // ************** TESTS ************** //
    // if (__env !== 'production') {
    //     app.get('/_test', staticPagesController.tests);
    // }

    // *********************************** //
    // *************** API *************** //
    // *********************************** //

    // *********************************** //
    // ********* STATIC PAGES *********** //
    // *********************************** //
    app.get('*', staticPagesController.index);

    // *********************************** //
    // ************* SOCKETS ************* //
    // *********************************** //
};
