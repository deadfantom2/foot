var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var Match        = require('../models/match');    // import data models match
var User        = require('../models/user');    // import data models user
var Prono        = require('../models/prono');    // import data models prono

/* GET listing matchs swith params */
router.get('/', function(req, res, next) {

    Match.find(req.query).populate('equipe1_id').populate('equipe2_id').exec(function(err,matchs){
        if (err)
            res.status(404).send(err);
        else
            res.send(matchs);
    });
  });


/* GET match by id */
router.get('/:_id', function(req, res, next) {
    Match.find({_id: req.params._id},'',function(err,matchs){
      if (err)
        res.status(404).send(err);
      else
        res.send(matchs[0]);
    });
  });
  
/* POST new match*/
router.post('/', function(req, res, next) {
    var newMatch = new Match(req.body);
    newMatch.save(function(err,data){
      if (err)
        res.status(400).send(err);
      else
        res.location(`/matchs/${data._id}`);
        res.status(201).send(data);
    });
  });
  
/* PATCH match by id */
router.patch('/:_id', function(req, res, next) {
    Match.update({_id: req.params._id},req.body,{multi: false},function(err,data){
      if (err)
        res.status(400).send(err);
      else
      {
        User.findOne({prenom : 'Bachir'}).exec(function(err,user){
          if (err)
              res.status(404).send(err);
          else
          {
            res.send(user.syncPoints());
          }
              //res.send(matchs);
      });
        //res.send(data);
      }
    });
  });
  
/* DELETE match by id */
router.delete('/:_id', function(req, res, next) {
    Match.remove({_id: req.params._id},function(err){
      if (err)
        res.status(404).send(err);
      else
        res.status(204).send();
    });
});



module.exports = router;  // import routes CRUD into a another file

