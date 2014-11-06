'use strict';

window.React = require('react');

var Router = require('react-router'),
    Route = Router.Route,
    Routes = Router.Routes,
    NotFoundRoute = Router.NotFoundRoute,
    DefaultRoute = Router.DefaultRoute,
    Link = Router.Link;

var Blog = require('components/blog/blogIndex'),
    About = require('components/about/aboutIndex'),
    Contact = require('components/contact/contactIndex'),
    Home = require('components/home/homeIndex'),
    Portfolio = require('components/portfolio/portfolioIndex'),
    Login = require('components/sessions/loginIndex'),
    Signup = require('components/sessions/signupIndex'),
    AppActions = require('actions/sessionActions'),
    CurrentUserStore = require('stores/currentUserStore');

var App = React.createClass({
    getInitialState: function() {
        return {
            user: null
        };
    },

    componentWillMount: function() {
        AppActions.fetchCurrentUser(); 
    },

    render: function() {
        var navbar = this.state.user ? 
            (
              <ul>
                <li><Link to="portfolio">Portfolio</Link></li>
                <li><Link to="about">About</Link></li>
                <li><Link to="blog">Blog</Link></li>
                <li><Link to="contact">Contact</Link></li>
                <li><Link to="/logout">Logout</Link></li>
              </ul>   
            ) : 
            (
              <ul>
                <li><Link to="portfolio">Portfolio</Link></li>
                <li><Link to="about">About</Link></li>
                <li><Link to="blog">Blog</Link></li>
                <li><Link to="contact">Contact</Link></li>
                <li><Link to="login">Login</Link></li>
              </ul>
            );
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
});

var routes = (
    <Routes location="history">
        <Route name="app" path="/" handler={App}>
            <Route name="portfolio" handler={Portfolio} />
            <Route name="about" handler={About} />
            <Route name="blog" handler={Blog} />
            <Route name="contact" handler={Contact} />
            <Route name="login" handler={Login} />
            <Route name="signup" handler={Signup} />
            <DefaultRoute handler={Home} />
        </Route>
    </Routes>
);

React.renderComponent(routes, document.getElementById('app-wrapper'));
