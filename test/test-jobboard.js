var test = require('blue-tape');

var config = require('./../config.js');

var MI5REST = require('./../rest');
var mi5Rest = new MI5REST(config.rest.host, config.auth.user, config.auth.password);

// JobBoard
test('Test Jobboard ===============================================================', function(t){
  t.plan(1);
  t.pass('test-jobboard.js - file loaded')
});

test('Jobboard - getOrdersByStatus', function(t){
  return mi5Rest.getOrdersByStatus('accepted')
    .then(function(body){
      t.assert(typeof body.pop().orderId != 'undefined', 'there should be an order element in body array');
    });
});

test('Jobboard - getOrdersByStatus', function(t){
  return mi5Rest.getOrdersByStatus('accepted')
    .then(function(body){
      t.assert(typeof body.pop().orderId != 'undefined', 'there should be an order element in body array');
    });
});
