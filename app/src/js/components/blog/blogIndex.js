'use strict';

var BlogStore = require('stores/blogStore');

var PostPreview = require('./postPreview');

var Blog = React.createClass({
    getInitialState: function() {
        return {
            posts: BlogStore.getAllPosts()
        }
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

        return (
            <ul>
                {this.state.posts.map(function(post) {
                    return <PostPreview post={post} />
                })}
            </ul>
        );
    }
});

module.exports = Blog;
