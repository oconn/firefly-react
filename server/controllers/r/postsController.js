var Post = require('../../models/post'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function(db) {
    var c = {},
        postsCollection = db.collection('posts');
        postsCollection.ensureIndex(
            {title: 1},
            {
                unique: true,
                dropDups: true
            },
            function(err, results) {
            
            }
        );
    
    c.getPosts = function(req, res) {           
        postsCollection.find().toArray(function(err, posts) {
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
                res.status(500).json({error: err});
                return;
            } 

            res.json(post);
            return;
        });
    };
    
    c.updatePost = function(req, res) {
        postsCollection.update(
            {'_id': new ObjectID(req.params.id)},
            new Post(req.body), 
            function(err, post) {
                if (err) {
                    res.status(400).json({error: err});
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

    return c;
};
