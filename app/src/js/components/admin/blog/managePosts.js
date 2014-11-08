'use strict';

var BlogStore = require('stores/blogStore');
var PostRow = require('./postRow.js');
var _ = require('lodash');

var ManagePosts = React.createClass({
    getInitialState: function() {
        return {
            posts: BlogStore.getAllPosts()
        };
    },

    componentDidMount: function() {
        BlogStore.addChangeListener(this._onChange); 
    },
    
    componentWillUnmount: function() {
        BlogStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({posts: BlogStore.getAllPosts()});
    },   
    
    render: function() {
        var posts = _.map(this.state.posts, function(post) {
            return <PostRow key={post._id} post={post} />;
        });

        return (
            <div className="manage-posts">
                <ul className="admin-post-list">
                    {posts}         
                </ul>
            </div>     
        );
    }
});

module.exports = ManagePosts;
