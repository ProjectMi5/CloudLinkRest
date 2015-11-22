var test = require('blue-tape');

var config = require('./../config.js');

var MI5REST = require('./../rest');
var mi5Rest = new MI5REST(config.rest.host, config.auth.user, config.auth.password);

test('Test CloudLinkWorkerInterface ===============================================================', function(t){
  t.plan(1);
  t.pass('test-worker.js - file loaded')
});

test('updateOrderStatus', function(t){
  return mi5Rest.placeOrder({recipeId: 10010, parameters: [], marketPlaceId: 'eu'})
    .then(function(body){
      return mi5Rest.updateOrderStatus(body.orderId, 'accepted');
    })
    .then(function(body){
      t.equal(body.status, 'ok', 'status should be ok');
    });
});

test('updateOrder', function(t){
  return mi5Rest.placeOrder({recipeId: 10010, parameters: [], marketPlaceId: 'eu'})
    .then(function(body){
      var order = {
        orderId: body.orderId,
        status: 'done'
      };
      return mi5Rest.updateOrder(order);
    })
    .then(function(body){
      t.equal(body.status, 'ok', 'status should be ok');
    });
});

test('getOrdersByStatus', function(t){
  return mi5Rest.getOrdersByStatus('pending')
    .then(function(body){
      t.assert(typeof body.pop().orderId != 'undefined', 'there should be an order element in body array');
    });
});