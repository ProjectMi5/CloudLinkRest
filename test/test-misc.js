var test = require('blue-tape');

var config = require('./../config.js');

var MI5REST = require('./../rest');
var mi5Rest = new MI5REST(config.rest.host, config.auth.user, config.auth.password);

// JobBoard
test('Test Misc Functionallity ===============================================================', function(t){
  t.plan(1);
  t.pass('test-misc.js - file loaded')
});

test('check connection /helloWorld', function (t) {
  return mi5Rest.isOnline()
    .then(function(result){
      t.true(result, 'must be true if connection could be established to helloWorld and body is correct');
    });
});

test('reportMachineStatus - out of order', function (t) {
  return mi5Rest.reportMachineStatus('out of order')
    .then(function(result){
      t.equal(result.status, 'ok', 'status must be ok');
    });
});

test('reportMachineStatus - working', function (t) {
  return mi5Rest.reportMachineStatus('working')
    .then(function(result){
      t.equal(result.status, 'ok', 'status must be ok');
    });
});

test('reportMachineStatus - not valid', function (t) {
  return mi5Rest.reportMachineStatus('asdf')
    .then(function(result){
      t.equal(result.status, 'err', 'status must be err, because status is not valid');
    });
});