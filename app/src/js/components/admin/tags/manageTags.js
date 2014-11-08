'use strict';

var TagStore = require('stores/tagStore');

var ManageTags = React.createClass({
   
    getInitialState: function() {
        return {
            tags: TagStore.getAllTags()
        }
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

    render: function() {
         
        return (
            <div className='manage-tags'>
                 
            </div>      
        );
    }
});

module.exports = ManageTags;
