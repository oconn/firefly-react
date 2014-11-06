'use strict';

var F = require('branches/components/form');

var Login = React.createClass({
    
    getInitialState: function() {
        return {};
    },

    render: function() {
        return (
            <div>
              <h1>Login</h1>
              <F.Form 
                action={'/login'}
                method={'POST'}
              >
                <F.Input 
                    type={'email'} 
                    name={'email'} 
                    placeholder={'Email Address'}
                    validateWith={F.Validate.email} 
                />
            
                <F.Input 
                    type={'password'} 
                    name={'password'} 
                    required={'required'}
                    placeholder={'Password'}
                />
              </F.Form>
            </div>
        );
    }
});

module.exports = Login;
