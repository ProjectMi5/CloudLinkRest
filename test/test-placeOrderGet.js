var test = require('blue-tape');

var config = require('./../config.js');

var MI5REST = require('./../rest');
var mi5Rest = new MI5REST(config.rest.host, config.auth.user, config.auth.password);

test('Test placeOrderGet ===============================================================', function(t){
  t.plan(1);
  t.pass('test-placeOrderGet.js - file loaded')
});

test('placeOrderGet', function(t){
  return mi5Rest.placeOrderGet({recipeId: 10051, parameters:[100,40,30,10,1], marketPlaceId: 'eu'})
    .then(function(body){
      console.log(body);
      t.fail('not yet implemented correctly');
    });
});

test('placeOrderGet with wrong parameters', function(t){
  return mi5Rest.placeOrderGet({recipeId: 10051, parameters:[40,30,10,1], marketPlaceId: 'eu'})
    .then(function(body){
      t.fail('not yet implemented correctly');
    });
});