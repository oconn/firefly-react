var ObjectID = require('mongodb').ObjectID,
    marked = require('marked');

function titlize(title) {
    return title.toLowerCase().replace(/ /g, '_');
}

function slugify(title) {
    var date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1;

    return year + '/' + month + '/' + titlize(title);
    
}

module.exports = function(options) {
    options = options || {};
    options._id = options._id ? new ObjectID(options._id) : undefined;

    this._id = options._id || new ObjectID();
    this.title = options.title || undefined;
    this.body = options.body ||  undefined;
    this.body_raw = options.body_raw || undefined;
    this.tags = options.tags || [];
    this.slug = options.slug || slugify(this.title);
    this.unique_views = options.unique_views || 0;
    this.total_views = options.total_views || 0;
    this.created_at = options.created_at || new Date();
    this.updated_at = new Date();
};
