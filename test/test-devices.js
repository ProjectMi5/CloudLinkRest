var _ = require('underscore');
var test = require('blue-tape');

var config = require('./../config.js');

var MI5REST = require('./../rest');
var mi5Rest = new MI5REST(config.rest.host, config.auth.user, config.auth.password);

test('Test GCM Devices Functionality ===============================================================', function(t){
  t.plan(1);
  t.pass('test-devices.js - file loaded')
});

var mockRegId = 'asdf';

test('/register -- register a gcm device', function(t){
  return mi5Rest.registerDevice(mockRegId)
    .then(function(result){
      console.log(result);
    })
});

test('/getRegIds -- get all regIds from mongodb', function(t){
  return mi5Rest.getRegisteredDevices()
    .then(function(devices){
      t.true(_.contains(devices, mockRegId), 'find '+mockRegId+' in the registered devices array');
    })
});