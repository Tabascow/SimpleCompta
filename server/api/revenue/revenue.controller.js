'use strict';

var _ = require('lodash');
var Revenue = require('./revenue.model');

// Get list of revenues
exports.index = function(req, res) {
  Revenue.find({'user':req.user._id},function (err, revenues) {
    if(err) { return handleError(res, err); }
    return res.json(200, revenues);
  });
};

exports.recents = function(req,res){
  Revenue.loadRecent(req.user._id,function(err,revenues){
    if(err){ return handleError(res,err);}
    return res.json(200,revenues);
  });
};

// Get a single revenue
exports.show = function(req, res) {
  Revenue.findById(req.params.id, function (err, revenue) {
    if(err) { return handleError(res, err); }
    if(!revenue) { return res.send(404); }
    return res.json(revenue);
  });
};

// Creates a new revenue in the DB.
exports.create = function(req, res) {
  var reqBody = req.body;
  reqBody.user = req.user;
  Revenue.create(reqBody, function(err, revenue) {
    if(err) { return handleError(res, err); }
    return res.json(201, revenue);
  });
};

// Updates an existing revenue in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Revenue.findById(req.params.id, function (err, revenue) {
    if (err) { return handleError(res, err); }
    if(!revenue) { return res.send(404); }
    var updated = _.merge(revenue, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, revenue);
    });
  });
};

// Deletes a revenue from the DB.
exports.destroy = function(req, res) {
  Revenue.findById(req.params.id, function (err, revenue) {
    if(err) { return handleError(res, err); }
    if(!revenue) { return res.send(404); }
    revenue.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
