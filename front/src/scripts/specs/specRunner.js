define(function(require) {
    require('jquery');
    require('mocha');
    var chai = require('chai'),
        sinon = require('sinon'),
        sinonChai = require('sinon-chai');

    window.expect = chai.expect;
    chai.use(sinonChai);

    mocha.setup('bdd');
    
    var tests = [
        // Models
        'specs/models/user',

        // Collections
        'specs/collections/users'
    ];
    
    require(tests, function() {
        mocha.run();
    });
});
