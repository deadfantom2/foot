var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user
var Equipe        = require('../models/equipe');    // import data models user

/* GET listing equipes swith params */
router.get('/', function(req, res, next) {
    Equipe.find(req.query,'',function(err,equipes){
      if (err)
        res.status(404).send(err);
      else
        res.send(equipes);
    });
  });

/* GET equipe by id */
router.get('/:_id', function(req, res, next) {
    Equipe.find({_id: req.params._id},'',function(err,equipes){
      if (err)
        res.status(404).send(err);
      else
        res.send(equipes[0]);
    });
  });
  
/* POST new equipe*/
router.post('/', function(req, res, next) {
    var newEquipe = new Equipe(req.body);
    newEquipe.save(function(err,data){
      if (err)
        res.status(400).send(err);
      else
        res.location(`/equipes/${data._id}`);
        res.status(201).send(data);
    });
  });
  
/* PATCH equipe by id */
router.patch('/:_id', function(req, res, next) {
    Equipe.update({_id: req.params._id},req.body,{multi: false},function(err,data){
      if (err)
        res.status(400).send(err);
      else
        res.send(data);
    });
  });
  
/* DELETE equipe by id */
router.delete('/:_id', function(req, res, next) {
    Equipe.remove({_id: req.params._id},function(err){
      if (err)
        res.status(404).send(err);
      else
        res.status(204).send();
    });
  });

module.exports = router;  // import routes CRUD into a another file
