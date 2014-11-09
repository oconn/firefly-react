'use strict';

var Router = require('react-router'),
    Link = Router.Link,
    moment = require('moment');

var adminActions = require('actions/adminActions');

var PostRow = React.createClass({
    
    removePost: function() {
        adminActions().removePost(this.props.post._id);
    },

    render: function() {
        var post = this.props.post;
        var id = {id: post._id};
        var date = moment(post.updated_at).format('MMMM Do YYYY');
        
        return (
            <li>
                <h4 className='title'>{post.title}</h4>
                <p className='date'>{date}</p>
                <p className='count'>Views: ({post.total_views})</p>
                <Link className='edit' to='edit_post' params={id}>Edit</Link>
                <p className='delete' onClick={this.removePost}>Delete</p>
            </li>      
        );
    }
});

module.exports = PostRow;
