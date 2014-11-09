var Post = require('../../models/post'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function(db) {
    var c = {},
        postsCollection = db.collection('posts');
    
    postsCollection.ensureIndex(
        {
            title: 1,
            slug: 1
        },
        {
            unique: true,
            dropDups: true
        },
        function(err, results) {
             
        }
    );
    
    c.getPosts = function(req, res) {
        var hideFields = (req.user && req.user.admin) ? {} : {
            total_views: 0,
            unique_views: 0
        };

        postsCollection.find({}, hideFields).toArray(function(err, posts) {
            if (err) {
                res.status(400).json({error: err});
                return;
            } 

            res.json(posts);
            return;
        });
    };
    
    c.getPost = function(req, res) {
        postsCollection.find({'_id': new ObjectID(req.params.id)}, function(err, post) {
            if (err) {
                res.status(400).json({error: err});
                return;
            }

            res.json(post);
            return;
        });
    };

    c.getPostBySlug = function(req, res) {
        postsCollection.findOne({'slug': req.query.slug}, function(err, post) {
            if (err) {
                res.status(400).json({error: err});
                return;
            }

            res.json(post);
            return;
        });
    };

    c.createPost = function(req, res) {
        var post = new Post(req.body);
        postsCollection.insert(post, function(err, write) {
            if (err) {
                switch(err.code) {
                    case 11000:
                        res.status(409).send("Title: '" + post.title + "' has already been used");
                        break;
                    default:
                        res.status(500).json({error: err});
                }
                return;
            } 

            res.json(post);
            return;
        });
    };
    
    c.updatePost = function(req, res) {
        var post = new Post(req.body);
        postsCollection.update(
            {'_id': new ObjectID(req.params.id)},
            post, 
            function(err, write) {
                if (err) {
                    switch(err.code) {
                        case 11000:
                            res.status(409).send("Title: '" + post.title + "' has already been used");
                            break;
                        default:
                            res.status(500).json({error: err});
                    }
                    return;
                }

                res.json(post);
                return;
            }    
        ); 
    };
    
    c.deletePost = function(req, res) {
        postsCollection.remove({'_id': new ObjectID(req.params.id)}, function(err, result) {
            if (err) {
                res.status(400).json({error: err});
                return;
            }
            
            res.json({success: 'Post Removed'});
            return;
        });
    };

    c.removeTagFromPosts = function(tagId) {
        postsCollection.update(
            {},
            {$pull: {tags: tagId}},
            {   
                w: -1,
                multi: true
            },
            function(err, write) {
                // TODO 
            }
        );
    };

    c.updateViewCount = function(req, res) {
        postsCollection.update(
            {'_id': new ObjectID(req.params.id)},
            {$inc: {total_views: 1}},
            {
                w: -1,
                multi: false
            }, function(err, write) {
                if (err) {
                    res.status(500).json({error: err});
                    return;
                }
                
                res.status(200).send("Success");
                return;
            }
        );
    };

    return c;
};
