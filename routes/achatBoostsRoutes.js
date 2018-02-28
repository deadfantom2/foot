var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var AchatBoost  = require('../models/achatBoost');    // import data models prono


/* GET listing achatBoosts swith params */
router.get('/', function(req, res, next) {
  var response = { hasErrors: false, data: {}, message: ""};
  AchatBoost.find(req.query).populate('boost_id').populate('utilisateur_id').exec(function(err,achatBoosts){
        if (err)
        {
          response.hasErrors = true;
          response.message = err; 
          res.status(404).send(response);
        }
        else
        {
          response.data = achatBoosts;
          res.send(response);
        }
    });
  });


/* GET achatBoost by id */
router.get('/:_id', function(req, res, next) {
  var response = { hasErrors: false, data: {}, message: ""};
  AchatBoost.findOne(req.query).populate('boost_id').populate('utilisateur_id').exec(function(err,achatBoost){
      if (err)
      {
        response.hasErrors = true;
        response.message = err; 
        res.status(404).send(response);
      }
      else
      {
        response.data = achatBoost;
        res.send(response);
      }
    });
  });
  
/* POST new achatBoost*/
router.post('/', function(req, res, next) {
  var response = { hasErrors: false, data: {}, message: ""};
    var newAchatBoost = new AchatBoost(req.body);
    newAchatBoost.save(function(err,data){
      if (err)
      {
        response.hasErrors = true;
        response.message = err; 
        res.status(400).send(response);
      }
      else
      {
        response.data = data;
        res.location(`/achatBoosts/${data._id}`);
        res.status(201).send(response);
      }
    });
  });
  
/* PATCH achatBoost by id */
router.patch('/:_id', function(req, res, next) {
  var response = { hasErrors: false, data: {}, message: ""};
  AchatBoost.update({_id: req.params._id},req.body,{multi: false},function(err,data){
      if (err)
      {
        response.hasErrors = true;
        response.message = err; 
        res.status(404).send(response);
      }
      else
      {
        response.data = data;
        res.send(response);
      }
    });
  });
  
/* DELETE achatBoost by id */
router.delete('/:_id', function(req, res, next) {
  var response = { hasErrors: false, data: {}, message: ""};
  AchatBoost.remove({_id: req.params._id},function(err){
      if (err)
      {
        response.hasErrors = true;
        response.message = err; 
        res.status(404).send(response);
      }
      else
        res.status(204).send(response);
    });
});

module.exports = router;  // import routes CRUD into a another file