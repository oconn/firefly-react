'use strict';

var Router = require('react-router'),
    Link = Router.Link;

var adminActions = require('actions/adminActions');

var PostRow = React.createClass({
    
    removePost: function() {
        adminActions().removePost(this.props.post._id);
    },

    render: function() {
        var post = this.props.post;
        var id = {id: post._id};
        
        return (
            <li>
                <Link to="edit_post" params={id}>Edit</Link>
                <button onClick={this.removePost}>Delete</button>
                <p>{post.title}</p>
            </li>      
        );
    }
});

module.exports = PostRow;
