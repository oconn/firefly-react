'use strict';

var BlogStore = require('stores/blogStore'),
    BlogActions = require('actions/blogActions'),
    SessionActions = require('actions/sessionActions');

var ShowPost = React.createClass({
    
    getInitialState: function() {
        return {
            post: BlogStore.getPostBySlug(this.props.params.splat)
        }; 
    },

    componentWillMount: function() {
        this.validPost();
    },

    componentDidMount: function() {
        BlogActions.incrementViewCount(this.state.post._id); 
    },

    validPost: function() {
        if(!this.state.post) {
            SessionActions.redirect('/');
        }
    },
    
    render: function() {

        return (
            <h1>Test</h1> 
        );
    }
});

module.exports = ShowPost;
