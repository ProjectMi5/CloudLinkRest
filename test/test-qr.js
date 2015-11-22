var test = require('blue-tape');

var config = require('./../config.js');

var MI5REST = require('./../rest');
var mi5Rest = new MI5REST(config.rest.host, config.auth.user, config.auth.password);

test('Test CloudLinkQRGenerator ===============================================================', function(t){
  t.plan(1);
  t.pass('test-qr.js - file loaded')
});

test('test CloudLinkQRGenerator', function (t) {
  t.plan(1);
  t.pass('test the qr code generator in this file');
});
