var test = require('blue-tape');

var config = require('./../config.js');

var MI5REST = require('./../rest');
var mi5Rest = new MI5REST(config.rest.host, config.auth.user, config.auth.password);

test('Test CloudLinkWorker / Worker needs to be online ===============================================================', function(t){
  t.plan(1);
  t.pass('test-worker.js - file loaded')
});

test('load test orders', function(t){
  var mockOrderItq10010 = {recipeId: 10010, parameters: [], marketPlaceId: 'itq'};
  var mockOrderItq10051 = {recipeId: 10051, parameters: [], marketPlaceId: 'itq'};
  var mockOrderCentigrade  = {recipeId: 10051, parameters: [], marketPlaceId: 'centigrade'};

   var orders = [];
  orders.push(mi5Rest.placeOrder(mockOrderItq10010));
  orders.push(mi5Rest.placeOrder(mockOrderItq10051));
  orders.push(mi5Rest.placeOrder(mockOrderCentigrade));
  orders.push(mi5Rest.placeOrder(mockOrderCentigrade));
  orders.push(mi5Rest.placeOrder(mockOrderCentigrade));
  orders.push(mi5Rest.placeOrder(mockOrderCentigrade));
  orders.push(mi5Rest.placeOrder(mockOrderItq10010));
  orders.push(mi5Rest.placeOrder(mockOrderItq10051));
  orders.push(mi5Rest.placeOrder(mockOrderItq10010));
  orders.push(mi5Rest.placeOrder(mockOrderItq10051));
  orders.push(mi5Rest.placeOrder(mockOrderItq10010));
  orders.push(mi5Rest.placeOrder(mockOrderItq10051));
  orders.push(mi5Rest.placeOrder(mockOrderItq10010));
  orders.push(mi5Rest.placeOrder(mockOrderItq10051));
  orders.push(mi5Rest.placeOrder(mockOrderItq10010));
  orders.push(mi5Rest.placeOrder(mockOrderItq10051));
  orders.push(mi5Rest.placeOrder(mockOrderCentigrade));
  orders.push(mi5Rest.placeOrder(mockOrderCentigrade));
  orders.push(mi5Rest.placeOrder(mockOrderCentigrade));
  orders.push(mi5Rest.placeOrder(mockOrderCentigrade));
  orders.push(mi5Rest.placeOrder(mockOrderItq10051));
  orders.push(mi5Rest.placeOrder(mockOrderItq10010));
  orders.push(mi5Rest.placeOrder(mockOrderItq10051));
  orders.push(mi5Rest.placeOrder(mockOrderItq10010));

  return Promise.all(orders)
    .then(function(results){
      console.log(results);
    });
});