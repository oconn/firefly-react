'use strict';

var Router = require('react-router'),
    Link = Router.Link;

var Admin = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Admin</h1>
                <ul>
                    <li><Link to="new_post">New Post</Link></li>
                    <li><Link to="manage_posts">Manage Posts</Link></li>
                    <li><Link to="manage_tags">Manage Tags</Link></li>
                    <li><Link to="manage_users">Manage Users</Link></li>
                </ul>
                {this.props.activeRouteHandler()}
            </div> 
        );
    }
});

module.exports = Admin;
