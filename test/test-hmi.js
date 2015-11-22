var test = require('blue-tape');

var config = require('./../config.js');

var MI5REST = require('./../rest');
var mi5Rest = new MI5REST(config.rest.host, config.auth.user, config.auth.password);

// JobBoard
test('Test HMI ===============================================================', function(t){
  t.plan(1);
  t.pass('test-hmi.js - file loaded')
});


test('check connection /helloWorld', function (t) {
  return mi5Rest.checkConnection()
    .then(function(body){
      t.equal(body, 'Hello World!');
    });
});