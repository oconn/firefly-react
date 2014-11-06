var ObjectID = require('mongodb').ObjectID,
    _ = require('lodash');

module.exports = function(db) {
    var c = {},
        User = db.collection('users');
    
    c.getCurrentUser = function(req, res) {
        if (!req.isAuthenticated()) {
            res.json({});
            return;
        }

        User.findOne({_id: new ObjectID(req.user._id)}, function(err, user) {
            if (err) {
                res.status(500).json({error: err});
                return;
            }

            var safeUser = {
                name: user.name,
                email: user.email,
                admin: user.admin
            };

            res.json(safeUser);
            return;
        });
    };

    c.getUsers = function(req, res) {
        User.find({}).toArray(function(err, users){
            if (err) {
                res.status(500).json({error: err});
                return;
            } 
            users = _.map(users, function(user) {
                delete user.password;
                delete user._id;
                return user;
            });
            res.json(users);
        });
    };

    return c;
};
