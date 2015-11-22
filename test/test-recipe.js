var _ = require('underscore');
var test = require('blue-tape');

var config = require('./../config.js');

var MI5REST = require('./../rest');
var mi5Rest = new MI5REST(config.rest.host, config.auth.user, config.auth.password);

test('Test Recipe Functionality ===============================================================', function(t){
  t.plan(1);
  t.pass('test-recipe.js - file loaded')
});

test('load Default Recipes', function(t){
  return mi5Rest.loadDefaultRecipes()
    .then(function(result){
      t.equal(result.status, 'ok', 'status should be ok');
      t.ok(_.isArray(result.results), 'results must be an array');
      t.notOk(_.isEmpty(result.results), 'results must not be empty');
    });
});

// Needs to be implemented
test.skip('manage a Recipe', function(t){
});

