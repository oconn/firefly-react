'use strict';

var Router = require('react-router'),
    Link = Router.Link;

var PostPreview = React.createClass({
     
    render: function() {
        var post = this.props.post;
        var params = { splat: post.slug };
        return (
            <div>
               <h3><Link to="showPost" params={params}>{post.title}</Link></h3>
               <p>{post.created_at}</p>
               <p dangerouslySetInnerHTML={{__html: post.description}} />
            </div>
        );
    }
});

module.exports = PostPreview;
