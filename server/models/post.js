var ObjectID = require('mongodb').ObjectID,
    highlight = require('highlight.js'),
    marked = require('marked');

highlight.configure({
    tabReplace: '    '
});

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

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
    this.description = options.description ? marked(options.description) : undefined;
    this.description_raw = options.description || undefined;
    this.body = options.body ? marked(options.body) : undefined;
    this.body_raw = options.body || undefined;
    this.tags = options.tags || [];
    this.slug = options.slug || slugify(this.title);
    this.unique_views = options.unique_views || 0;
    this.total_views - options.total_views || 0;
    this.created_at = options.created_at || new Date();
    this.updated_at = new Date();
};
