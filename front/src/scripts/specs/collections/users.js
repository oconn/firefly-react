define(function(require) {
    'use strict';
    
    var Users = require('collections/users');

    var users = new Users();
    
    describe('Users Collection', function() {
        describe('after initialized', function() {
            it('should have a MongoDB id attribute', function() {
                expect(users.idAttribute).to.equal('_id');
            });
            it('should have the correct url attribute', function() {
                expect(users.url).to.equal('/api/users');
            });
        });      
    });
});
