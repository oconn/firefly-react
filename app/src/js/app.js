'use strict';

window.React = require('react');

var Router = require('react-router'),
    Route = Router.Route,
    Routes = Router.Routes,
    NotFoundRoute = Router.NotFoundRoute,
    DefaultRoute = Router.DefaultRoute,
    Link = Router.Link;

var About = require('components/about/aboutIndex'),
    Admin = require('components/admin/adminIndex'),
    Blog = require('components/blog/blogIndex'),
    Contact = require('components/contact/contactIndex'),
    Home = require('components/home/homeIndex'),
    Login = require('components/sessions/loginIndex'),
    NewPost = require('components/admin/newPost'),
    Portfolio = require('components/portfolio/portfolioIndex'),
    Post = require('components/blog/showPost'),
    Signup = require('components/sessions/signupIndex');

var CurrentUserStore = require('stores/currentUserStore'),
    BlogStore = require('stores/blogStore');

var BlogActions = require('actions/blogActions'),
    SessionActions = require('actions/sessionActions');

var App = React.createFactory( React.createClass({
    getInitialState: function() {
        return {
            user: null
        };
    },

    componentDidMount: function() {
        CurrentUserStore.addChangeListener(this._onChange);
        SessionActions.fetchCurrentUser();
        BlogActions.fetchPosts();
    },

    componentWillUnmount: function() {
        CurrentUserStore.removeChangeListener(this._onChange);
    },
    
    _onChange: function() {
        this.setState({user: CurrentUserStore.getCurrentUser()});
    },

    logout: function() {
        SessionActions.logout();
    },
    
    _guestLinks: function() {
        return (
            <ul>
                <li><Link to="portfolio">Portfolio</Link></li>
                <li><Link to="about">About</Link></li>
                <li><Link to="blog">Blog</Link></li>
                <li><Link to="contact">Contact</Link></li>
                <li><Link to="login">Login</Link></li>  
            </ul>
        );
    },

    _userLinks: function() {
        return (
            <ul>
                <li><Link to="portfolio">Portfolio</Link></li>
                <li><Link to="about">About</Link></li>
                <li><Link to="blog">Blog</Link></li>
                <li><Link to="contact">Contact</Link></li>
                <li><a onClick={this.logout}>Logout</a></li>
            </ul>
        );
    },

    _adminLinks: function() {
                
        return (
            <ul>
                <li><Link to="admin">Admin</Link></li>
                <li><Link to="portfolio">Portfolio</Link></li>
                <li><Link to="about">About</Link></li>
                <li><Link to="blog">Blog</Link></li>
                <li><a onClick={this.logout}>Logout</a></li>
            </ul>      
        );
    },

    render: function() {
        var navbar = this.state.user ? 
            this.state.user.admin ? 
                this._adminLinks() : this._userLinks() :
            this._guestLinks();

        return (
            <div>
              <header id="navbar">
                <nav>
                  <h1 id="brand"><Link to="app">Firefly Photography</Link></h1>
                  {navbar} 
                </nav>
              </header>
              <div id="main">
                {this.props.activeRouteHandler()}
              </div>
            </div>
        );
    }
}));

React.render((
    <Routes location="history">
        <Route name="app" path="/" handler={App}>
            <Route name="portfolio" handler={Portfolio} />
            <Route name="about" handler={About} />
            <Route name="blog" handler={Blog}>
                <Route name="showPost" path="*" handler={Post} />
            </Route>
            <Route name="contact" handler={Contact} />
            <Route name="login" handler={Login} />
            <Route name="signup" handler={Signup} />
            <Route name="admin" handler={Admin}>
                <Route name="new_post" handler={NewPost} />
            </Route> 
            <DefaultRoute handler={Home} />
        </Route>
    </Routes>
    ), document.getElementById('app-wrapper')
);
