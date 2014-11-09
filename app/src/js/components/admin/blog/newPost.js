'use strict';

var marked = require('marked');
var adminActions = require('actions/adminActions');
var TagStore = require('stores/tagStore');
var _ = require('lodash');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

var NewPost = React.createClass({
    
    getInitialState: function() {
        return {
            title: '',
            body: '',
            tags: []
        }; 
    },
    
    componentDidMount: function() {
        TagStore.addChangeListener(this._onChange); 
    },
    
    componentWillUnmount: function() {
        TagStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({tags: TagStore.getAllTags()});
    }, 
    
    updateField: function(e) {
        var state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state); 
    },

    parseBody: function() {
        return marked(this.state.body);     
    },

    onSubmit: function(e) {
        e.preventDefault();
        
        this.submitPost(); 
    },

    submitPost: function() {
        var post = {
            title: this.state.title,
            body_raw: this.state.body,
            body: this.parseBody()
        };

        adminActions().submitPost(post);
    },

    render: function() {
        var title = this.state.title,
            body= this.state.body,
            parsedBody = this.parseBody(),
            tags = _.map(this.state.tags, function(tag) {
                console.log(tag);
                return tag.name;
            });
        
        return (
            <div className="new-post-container">
                <form id="new-post-form" onSubmit={this.onSubmit} >
                    <fieldset>
                        <label>Title</label>
                        <input type='text' name='title' value={title} onChange={this.updateField} />
                    </fieldset>

                    <fieldset>
                        <label>Body</label>
                        <textarea name='body' value={body} onChange={this.updateField} />
                    </fieldset>

                    <fieldset>
                        <label>Tags</label>
                        {tags}
                    </fieldset>
                    
                    <fieldset>
                        <input type='submit' value='Submit Post' /> 
                    </fieldset>
                </form>   
                <div id="new-post-preview">
                    <h1>{this.state.title}</h1>

                    <div dangerouslySetInnerHTML={{__html: parsedBody}} />
                </div>
            </div>    
        );
    }
});

module.exports = NewPost;
