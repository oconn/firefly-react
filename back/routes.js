// Middleware

function isAuthed(req, res, next) {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect('/login');
}

module.exports = function(app, db, passport) {
    var staticPagesController = require('./controllers/staticPagesController');
        
    
    // *********************************** //
    // *************** API *************** //
    // *********************************** //

    // ********* STATIC PAGES *********** //
    app.get('*', staticPagesController.index);
};
