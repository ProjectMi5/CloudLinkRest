var _ = require('underscore');
var test = require('blue-tape');

var config = require('./../config.js');

var MI5REST = require('./../rest');
var mi5Rest = new MI5REST(config.rest.host, config.auth.user, config.auth.password);

test('Test Ordering All Recipes Interface ===============================================================', function(t){
  t.plan(1);
  t.pass('test-orderAllRecipes.js - file loaded')
});

test('first, get all recipes', function(t){
  return mi5Rest.getRecipes()
    .then(function(recipes){
      t.true(_.isArray(recipes), 'all recipes loaded');
    });
});