/**
 * Require all the tests
 * @type {exports|module.exports}
 */

// Set Test env variable: Windows > set TEST=true
// Reset it in Windows: > set TEST=
//process.env.TEST = true; //run it with test configurations if not setting env variables

//require('./test/test-orderAllRecipes');
//require('./test/test-feedback');
//require('./test/test-devices');
//require('./test/test-recipe');
//require('./test/test-misc');
//require('./test/test-worker');
require('./test/test-worker-loadOrders');
//require('./test/test-qr');
//require('./test/test-jobboard');
//require('./test/test-placeOrderGet');