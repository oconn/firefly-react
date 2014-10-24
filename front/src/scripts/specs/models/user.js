define(function(require) {
    'use strict';
    
    var User = require('models/user');

    var user = new User(); 

    describe('User Model', function() {
        describe('after initialized', function() {
            it('should have a MongoDB id attribute', function() {
                expect(user.idAttribute).to.equal('_id');
            });
            it('should have the correct url attribute', function() {
                expect(user.url).to.equal('/api/current_user');
            });
        });
    });
});
