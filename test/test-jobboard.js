var test = require('blue-tape');

var config = require('./../config.js');

var MI5REST = require('./../rest');
var mi5Rest = new MI5REST(config.rest.host, config.auth.user, config.auth.password);

// JobBoard
test('Test Jobboard ===============================================================', function(t){
  t.plan(1);
  t.pass('test-jobboard.js - file loaded')
});

test('Jobboard - getOrdersSince', function(t){
  return mi5Rest.getOrdersSince()
    .then(function(result){
      console.log(result);
    });
});

test('Jobboard - getOrdersUpdateSince', function(t){
  return mi5Rest.getOrdersUpdatedSince(300)
    .then(function(result){
      console.log(result);
    });
});

// Experimental - makes orders appear multiple times
test.skip('Jobboard Hack', function(t){
  return mi5Rest.reloadJobboardHack()
    .then(function(result){
      console.log(result);
    })
});

test.skip('Reload Special Order', function(t){
  return mi5Rest.reloadOrderInJobboard(3)
    .then(function(result){
      console.log(result);
    })
});