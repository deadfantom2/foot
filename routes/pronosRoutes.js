var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var Prono        = require('../models/prono');    // import data models prono
var Match        = require('../models/match');    // import data models match


/* GET listing pronos swith params */
router.get('/', function(req, res, next) {
  var response = { hasErrors: false, data: {}, message: ""};
    Prono.find(req.query).populate('match_id').populate('utilisateur_id').exec(function(err,pronos){
        if (err)
        {
          response.hasErrors = true;
          response.message = err; 
          res.status(404).send(response);
        }
        else
        {
          response.data = pronos;
          res.send(response);
        }
    });
  });


/* GET prono by id */
router.get('/:_id', function(req, res, next) {
  var response = { hasErrors: false, data: {}, message: ""};
    Prono.findOne({_id: req.params._id},'',function(err,prono){
      if (err)
      {
        response.hasErrors = true;
        response.message = err; 
        res.status(404).send(response);
      }
      else
      {
        response.data = prono;
        res.send(response);
      }
    });
  });
  
/* POST new prono*/
router.post('/', function(req, res, next) {
  var response = { hasErrors: false, data: {}, message: ""};
    var newProno = new Prono(req.body);
    newProno.save(function(err,data){
      if (err)
      {
        response.hasErrors = true;
        response.message = err; 
        res.status(400).send(response);
      }
      else
      {
        response.data = data;
        res.location(`/pronos/${data._id}`);
        res.status(201).send(response);
      }
    });
  });
  
/* PATCH prono by id */
router.patch('/:_id', function(req, res, next) {
  var response = { hasErrors: false, data: {}, message: ""};
    Prono.update({_id: req.params._id},req.body,{multi: false},function(err,data){
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
  
/* DELETE prono by id */
router.delete('/:_id', function(req, res, next) {
  var response = { hasErrors: false, data: {}, message: ""};
    Prono.remove({_id: req.params._id},function(err){
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