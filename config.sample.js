/**
 * Sample Configuration
 */
var config = {};

// Secure config
config.auth = {}; // used with request - keep object properties user and password!
config.auth.user = 'foo';
config.auth.password = 'bar';

config.rest = {};
config.rest.host = 'https://xz.foo.de';

// Override some configuration for local tests
if(process.env.TEST){
    console.log('TEST set');

    // Secure config
    config.auth = {};
    config.auth.user = 'foo';
    config.auth.password = 'bar';
    config.rest.host = 'http://localhost:3001/';
}

module.exports = config;