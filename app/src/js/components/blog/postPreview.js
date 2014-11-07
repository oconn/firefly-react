'use strict';

var PostPreview = React.createClass({
    
    render: function() {
        var post = this.props.post;
        return (
            <div>
               <h3>{post.title}</h3>
               <p>{post.created_at}</p>
               <p dangerouslySetInnerHTML={{__html: post.description}} />
            </div>
        );
    }
});

module.exports = PostPreview;
