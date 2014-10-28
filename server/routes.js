// Middleware

module.exports = function(app, db, passport) {
    var staticPagesController = require('./controllers/staticPagesController');

    // *********************************** //
    // *************** API *************** //
    // *********************************** //

    // ********* STATIC PAGES *********** //
    app.get('*', staticPagesController.index);
};
