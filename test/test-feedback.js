var _ = require('underscore');
var test = require('blue-tape');

var config = require('./../config.js');

var MI5REST = require('./../rest');
var mi5Rest = new MI5REST(config.rest.host, config.auth.user, config.auth.password);

test('Test Feedback Functionality ===============================================================', function(t){
  t.plan(1);
  t.pass('test-feedback.js - file loaded')
});

test('prepare an order with a barcode', barcodeOrder);
// define for reuse
function barcodeOrder(t){
  var reuse = {};
  var mockBarcode = 12345678;

  return mi5Rest.loadDefaultRecipes()
    .then(mi5Rest.getRecipes)
    .then(function(recipes){
      // find the barcode recipe (usually 10051)
      var barcodeRecipe = _.findWhere(recipes, {recipeId: 10051});
      var order = {
        recipeId: barcodeRecipe.recipeId,
        parameters: [200, 10, 10, 50, 1],
        marketPlaceId: 'centigrade'
      };
      return mi5Rest.placeOrder(order);
    })
    .then(function(result){
      reuse.orderId = result.orderId;
      reuse.barcode = mockBarcode;

      return mi5Rest.setBarcode(result.orderId, mockBarcode);
    })
    .then(function(result){
      t.equal(result.status, 'ok', 'setBarcode should return status "ok"');

      return reuse;
    });
}

test('giveFeedback Too Sweet (does not work with local CloudLink)', function(t){
  return barcodeOrder(t)
    .then(function(reuse){
      return mi5Rest.giveFeedback(reuse.orderId, false, 'Too sweet');
    })
    .then(function(result){
      if(!process.env.TEST){
        t.equal(result.status, 'ok', 'status must be ok for giveFeedback (does not work with local CloudLink)');
      } else {
        t.pass('this test only works with online CloudLink - some issue with gcm?');
      }
    });
});

test('giveFeedback Too Sweet', function(t){
  return barcodeOrder(t)
    .then(function(reuse){
      return mi5Rest.giveFeedback(reuse.orderId, false, 'Too sour');
    })
    .then(function(result){
      if(!process.env.TEST){
        t.equal(result.status, 'ok', 'status must be ok for giveFeedback (does not work with local CloudLink)');
      } else {
        t.pass('this test only works with online CloudLink - some issue with gcm?');
      }
    });
});