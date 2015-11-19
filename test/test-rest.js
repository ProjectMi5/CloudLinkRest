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
      t.equal(body.orderStatus, 'pending', 'new orders are always pending');
    });
});
