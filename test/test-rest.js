var test = require('blue-tape');

var rest = require('./../rest');
var mi5Rest = new rest('http://localhost:3001/', 'foo', 'bar');

test('check connection /helloWorld', function (t) {
  return mi5Rest.checkConnection()
    .then(function(body){
      t.equal(body, 'Hello World!');
    });
});

test('getOrdersByStatus', function(t){
  return mi5Rest.getOrdersByStatus('done')
    .then(function(body){
      t.pass();
    })
});

test('placeOrder', function(t){
  return mi5Rest.placeOrder({recipeId: 10010, parameters: [], marketPlaceId: 'eu'})
    .then(function(body){
      t.equal(body.status, 'ok', 'status should be ok');
      t.assert(!isNaN(body.orderId), 'orderId must be a number');
      t.equal(body.orderStatus, 'pending', 'new orders are always pending');
    });
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

test.only('placeOrderGet', function(t){
  return mi5Rest.placeOrderGet({recipeId: 10051, parameters:[100,40,30,10,1], marketPlaceId: 'eu'})
    .then(function(body){
      t.equal(body.status, 'ok', 'status of request: ok');
      t.equal(body.orderStatus, 'pending', 'orderStatus pending');
    })
})