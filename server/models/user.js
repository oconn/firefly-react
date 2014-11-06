var bcrypt = require('bcrypt'),
    ObjectID = require('mongodb').ObjectID;

var User = function(options) {
    options = options || {};
    
    this._id = new ObjectID(options._id) || new ObjectID();
    this.name = options.name || undefined;
    this.email = options.email || undefined;
    this.password = options.password || undefined;
};

User.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

User.prototype.validPassword = function(password, hash) {
    return bcrypt.compareSync(password, hash);
};

module.exports = User;
