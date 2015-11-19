/**
 *
 * @type {*|exports|module.exports}
 */
var urljoin = require('url-join');
var request = require('request');
var Promise = require('bluebird');
var logger  = require('./logger');

function MI5REST(host, user, password){
  this.host = host; // http(s)://x.y.com/
  this.user = user; // basic auth
  this.password = password; // basic auth

  this.rejectUnauthorized = false; // Default param
  //this.verbose = true; // log or not
}
module.exports = MI5REST;

MI5REST.prototype.checkConnection = function(){
  var options = this._modifyRequestOptions({
    url: this._url('helloWorld')
  });

  logger.info('/checkConnection');
  logger.debug(options);

  return this._GetRequest(options)
    .then(function(body){
      return body
    });
};

MI5REST.prototype.getOrdersByStatus = function(status){
  var options = this._modifyRequestOptions({
    url:  this._url('getOrdersByStatus'),
    form: {status: status}
  });

  logger.info('/getOrdersByStatus', status);
  logger.debug(options);

  return this._PostRequest(options)
    .then(this._safeJsonParse);
};

MI5REST.prototype.placeOrder = function(order){
  var options = this._modifyRequestOptions({
    url:  this._url('placeOrder'),
    form: {order: JSON.stringify(order)}
  });

  logger.info('/placeOrder', order);
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

MI5REST.prototype._modifyRequestOptions = function(options){
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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


MI5REST.prototype.updateOrderStatus = function(orderid, status){
  var options = {
    url:  urljoin(config.MI5REST.host, config.MI5REST.updateOrderStatus),
    rejectUnauthorized: false, // TODO certificate needs to be bundled correctly
    form: {id: orderid, status: status},
    auth: config.auth
  };

  return new Promise(function(resolve, reject){
    request.post(options, function(err, res, body){
      if(err) reject(err);
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch (err){
        console.log(err, body);
        reject('problems in JSON.parse, probably return is not JSON formatted');
      }
    });
  });
};

MI5REST.prototype.updateOrder = function(order){
  var options = {
    url:  urljoin(config.MI5REST.host, config.MI5REST.updateOrder),
    rejectUnauthorized: false, // TODO certificate needs to be bundled correctly
    form: {order: JSON.stringify(order)},
    auth: config.auth
  };

  return new Promise(function(resolve, reject){
    request.post(options, function(err, res, body){
      if(err) reject(err);
      try {
        body = JSON.stringify(body);
        resolve(body);
      } catch (err){
        console.log(err, body);
        reject('problems in JSON.stringify, probably return is not JSON formatted');
      }
    });
  });
};
