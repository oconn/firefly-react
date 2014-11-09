var Tag = require('../../models/tag'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function(db) {
    var c = {},
        tagsCollection = db.collection('tags'),
        postsController = require('./postsController')(db);

    tagsCollection.ensureIndex(
        {name: 1},
        {
            unique: true,
            dropDups: true
        }, 
        function(err, results) {
        
        }      
    );

    c.getTags = function(req, res) {
        tagsCollection.find().toArray(function(err, tags) {
            if (err) {
                res.status(400).json({error: err});
                return;
            }

            res.json(tags);
            return;
        });
    };

    c.createTag = function(req, res) {
        var tag = new Tag(req.body);
        tagsCollection.insert(tag, function(err, write) {
            if (err) {
                switch(err.code) {
                    case 11000:
                        res.status(409).send("Name: '" + tag.name + "' has already been used");
                        break;
                    default:
                        res.status(500).json({error: err});
                }
                return;
            } 

            res.json(tag);
            return;
        });
    };

    c.deleteTag = function(req, res) {
        tagsCollection.remove({'_id': new ObjectID(req.params.id)}, function(err, result) {
            if (err) {
                res.status(400).json({error: err});
                return;
            }
            
            postsController.removeTagFromPosts(req.params.id);
            res.json({success: 'Tag Removed'});
            return;
        });
    };

    return c;
};
