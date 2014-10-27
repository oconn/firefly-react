define(function(require) {
    require('jquery');
    var chai = require('chai'),
        sinon = require('sinon'),
        sinonChai = require('sinon-chai');

    window.expect = chai.expect;
    chai.use(sinonChai);

    window.mocha.setup('bdd');
    
    var tests = [
        // Models
        'specs/models/user',

        // Collections
        'specs/collections/users'
    ];
    
    require(tests, function() {
        window.mocha.run();
    });
});
