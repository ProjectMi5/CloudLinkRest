var urljoin = require('url-join');
var request = require('request');
var Promise = require('bluebird');

var logger = require('./logger');

function MI5REST(host, user, password){
  this.host = host; // http(s)://x.y.com/
  this.user = user; // basic auth
  this.password = password; // basic auth

  this.rejectUnauthorized = false; // Default param
  this.verbose = true; // log or not
}
module.exports = MI5REST;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connection

MI5REST.prototype.isOnline = function(){
  var options = this._options({
    target: 'helloWorld'
  });

  console.log('/checkConnection');
  logger.debug(options);

  return this._GetRequest(options)
    .then(function(body){
      if ( body == 'Hello World!'){
        return true;
      } else {
        return false;
      }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Orders

MI5REST.prototype.getOrdersByStatus = function(status){
  var options = this._options({
    target: 'getOrdersByStatus',
    form: {status: status}
  });

  logger.info('/getOrdersByStatus', status);
  logger.debug(options);

  return this._PostRequest(options)
    .then(this._safeJsonParse);
};

MI5REST.prototype.placeOrder = function(order){
  var options = this._options({
    target: 'placeOrder',
    form: {order: JSON.stringify(order)}
  });

  logger.info('/placeOrder', order);
  logger.debug(options);

  return this._PostRequest(options)
    .then(this._safeJsonParse);
};

MI5REST.prototype.placeOrderGet = function(order){
  var options = this._options({
    target: 'placeOrder/'+order.recipeId+'/'+JSON.stringify(order.parameters)+'/'+order.marketPlaceId,
  });

  logger.info('/placeOrderGet', order);
  logger.debug(options);

  return this._GetRequest(options)
    .then(this._safeJsonParse);
};

MI5REST.prototype.updateOrderStatus = function(orderid, status){
  var options = this._options({
    target: 'updateOrderStatus',
    form: {id: orderid, status: status}
  });

  logger.info('/updateOrderStatus', orderid, status);
  logger.debug(options);

  return this._PostRequest(options)
    .then(this._safeJsonParse);
};

MI5REST.prototype.updateOrder = function(order){
  var options = this._options({
    target: 'updateOrder',
    form: {order: JSON.stringify(order)}
  });

  logger.info('/updateOrder', order);
  logger.debug(options);

  return this._PostRequest(options)
    .then(this._safeJsonParse);
};

MI5REST.prototype.setBarcode = function(orderId, barcode){
  var options = this._options({
    target: 'setBarcode',
    form: {
      id: orderId,
      barcode : barcode
    }
  });

  logger.info('/setBarcode', orderId, barcode);
  logger.debug(options);

  return this._PostRequest(options)
    .then(this._safeJsonParse);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Recipes

MI5REST.prototype.getRecipes = function(){
  var options = this._options({
    target: 'getRecipes'
  });

  logger.info('/getRecipes');
  logger.debug(options);

  return this._GetRequest(options)
    .then(this._safeJsonParse);
};

MI5REST.prototype.loadDefaultRecipes = function(){
  var options = this._options({
    target: 'loadDefaultRecipes'
  });

  logger.info('/loadDefaultRecipes');
  logger.debug(options);

  return this._GetRequest(options)
    .then(this._safeJsonParse);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Feedback

MI5REST.prototype.giveFeedback = function(orderId, like, feedbackText){
  var feedback = {
    productId:  orderId,
    like:       like,
    feedback:   feedbackText
  };
  var options = this._options({
    target: 'giveFeedback',
    form: { feedback: JSON.stringify(feedback) }
  });

  logger.info('/giveFeedback', orderId, like, feedbackText);
  logger.debug(options);

  return this._PostRequest(options)
    .then(this._safeJsonParse);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Devices GCM

MI5REST.prototype.getRegisteredDevices = function(){
  var options = this._options({
    target: 'getRegIds'
  });

  logger.info('/getRegIds - get all registered devices');
  logger.debug(options);

  return this._GetRequest(options)
    .then(this._safeJsonParse)
    .then(this._safeJsonParse); // do it twice, because it returns a string of regids '["regid1", "regId2", ....]'
};

MI5REST.prototype.registeDevice = function(regId){
  var options = this._options({
    target: 'register',
    form: {regId:  regId }
  });

  logger.info('/register - register a gcm device online', regId);
  logger.debug(options);

  return this._PostRequest(options)
    .then(this._safeJsonParse);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// Helper ////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

MI5REST.prototype._url = function(target){
  return urljoin(this.host, target);
};

MI5REST.prototype._options = function(options){
  options.url = this._url(options.target);
  options.auth = {
    user :      this.user,
    password :  this.password
  };
  options.rejectUnauthorized = this.rejectUnauthorized;

  return options;
};

MI5REST.prototype._GetRequest = function(options){
  return new Promise(function(resolve, reject){
    request.get(options, function(err, res, body){
      if(err) reject(err);
      resolve(body);
    })
  }).bind(this);
};

MI5REST.prototype._PostRequest = function(options){
  return new Promise(function(resolve, reject){
    request.post(options, function(err, res, body){
      if(err) reject(err);
      resolve(body);
    })
  }).bind(this);
};

MI5REST.prototype._safeJsonParse = function(body){
  try {
    var body = JSON.parse(body);
    return new Promise(function(res){ res(body);});
    //return body;
  } catch (err){
    logger.error(body);
    throw new Error('could not parse body json');
    //return err
    return new Promise(function(res, rej){ rej(err);});
  }
};