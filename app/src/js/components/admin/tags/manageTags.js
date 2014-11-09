'use strict';

var TagStore = require('stores/tagStore');
var adminActions = require('actions/adminActions');
var _ = require('lodash');

var ManageTags = React.createClass({
   
    getInitialState: function() {
        return {
            tags: TagStore.getAllTags(),
            value: ''
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
    
    addTag: function(e) {
        e.preventDefault();
        if (this.state.value !== '') {
            adminActions().addTag(this.state.value);
            this.setState({value: ''});
        }
    },

    updateName: function(e) {
        this.setState({value: e.target.value});
    },

    removeTag: function(e) {
        adminActions().removeTag(e.target.id);
    },

    render: function() {
        var value = this.state.value;
        var tags = _.map(this.state.tags, function(tag, index) {
            return (
                <li key={index}>
                    <p>{tag.name}</p>
                    <p id={tag._id} onClick={this.removeTag}>Delete</p>
                </li>    
            );
        }.bind(this));
        
        return (
            <div className='manage-tags'>
                <form onSubmit={this.addTag}>
                    <fieldset>
                        <label>Name</label>
                        <input name="name" value={value} onChange={this.updateName} />
                    </fieldset>

                    <fieldset>
                        <input type="submit" value="Add Tag" />
                    </fieldset>
                </form>
                <ul>{tags}</ul>
            </div>      
        );
    }
});

module.exports = ManageTags;
