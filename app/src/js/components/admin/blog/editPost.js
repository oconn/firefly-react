'use strict';
var BlogStore = require('stores/blogStore');
var TagStore = require('stores/tagStore');
var marked = require('marked');
var adminActions = require('actions/adminActions');
var SessionActions = require('actions/sessionActions');
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

var EditPost = React.createClass({
    getInitialState: function() {
        return {
            title: '',
            body: '',
            parsedBody: '',
            tags: TagStore.getAllTags(),
            selectedTags: {}
        }; 
    },

    setSelectedTags: function(tags) {
        var modifiedTags = {};
        _.each(tags, function(tag) {
            _.each(this.state.tags, function(t) {
                if (t._id === tag) {
                    modifiedTags[tag] = t.name;
                }
            });
        }.bind(this)); 
        return modifiedTags;
    },

    componentDidMount: function() {
        TagStore.addChangeListener(this._onChange); 
        var post = BlogStore.getPost(this.props.params.id);
        
        if (!post) { 
            return SessionActions.redirect('/admin');
        }
        
        this.setState({
            title: post.title,
            body: post.body_raw,
            selectedTags: this.setSelectedTags(post.tags)
        });
        this.parseBody();
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
        var post = BlogStore.getPost(this.props.params.id);
        post.title = this.state.title;
        post.body_raw = this.state.body;
        post.body = this.parseBody();
        post.tags = this.getSelectedTags();

        adminActions().updatePost(post);
    },

    getSelectedTags: function() {
        var tags = [];
        for (var tag in this.state.selectedTags) {
            tags.push(tag);
        }
        return tags;
    },

    tagChecked: function(e) {
        var selectedTags = this.state.selectedTags;
        if (e.target.checked) {
            selectedTags[e.target.value] = e.target.name;
        } else {
            delete selectedTags[e.target.value];
        }
        this.setState({selectedTags: selectedTags});
    },

    getTagCheckValue: function(tag) {
        return this.state.selectedTags[tag._id] ? 'checked' : '';
    }, 

    render: function() {
        var title = this.state.title,
            body= this.state.body,
            parsedBody = this.parseBody(),
            tags = _.map(this.state.tags, function(tag) {
                var checked = this.getTagCheckValue(tag);
                return (
                    <div>
                        <p>{tag.name}</p>
                        <input 
                            type="checkbox" 
                            value={tag._id} 
                            name={tag.name} 
                            onChange={this.tagChecked} 
                            checked={checked}
                        /> 
                    </div>       
                );
            }.bind(this));

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
                        <input type='submit' value='Update Post' /> 
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

module.exports = EditPost;
