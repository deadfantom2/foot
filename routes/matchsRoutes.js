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
    var response = { hasErrors: false, data: {}, message: ""};
    Match.find(req.query).populate('equipe1_id').populate('equipe2_id').exec(function(err,matchs){
        if (err)
        {
          response.hasErrors = true;
          response.message = err; 
          res.status(404).send(response);
        }
        else
        {
          response.data = matchs;
          res.send(response);
        }
    });
});


/* GET match by id */
router.get('/:_id', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    Match.findOne({_id: req.params._id},'',function(err,match){
      if (err)
      {
        response.hasErrors = true;
        response.message = err; 
        res.status(404).send(response);
      }
      else
      {
        response.data = match;
        res.send(response);
      }
    });
  });
  
/* POST new match*/
router.post('/', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    var newMatch = new Match(req.body);
    newMatch.save(function(err,data){
      if (err)
      {
        response.hasErrors = true;
        response.message = err; 
        res.status(400).send(response);
      }
      else
      {
        response.data = data;
        res.location(`/matchs/${data._id}`);
        res.status(201).send(response);
      }
    });
  });
  
/* PATCH match by id */
router.patch('/:_id', function(req, res, next) {
  var response = { hasErrors: false, data: {}, message: ""};
  Match.update({_id: req.params._id},req.body,{multi: false},function(err,data){
    if (err)
    {
      response.hasErrors = true;
      response.message = err; 
      res.status(404).send(response);
    }
    else
    {
      //1) MAJ des points pour chaque prono du match
      if(data.goals1 != "" && data.goals2 != "")
      {
        Prono.find({match_id: req.params._id}).populate('match_id').populate('utilisateur_id').exec(function(err,pronos){
          if (err)
          {
            response.hasErrors = true;
            response.message = err; 
            res.status(400).send(response);
          }
          else
          {
            pronos.forEach(prono => {
              let points = 0;
              //RULES
              if(prono.goals1 == prono.match_id.goals1 && prono.goals2 == prono.match_id.goals2) points = 6; //score parfait
              else if((prono.goals1 > prono.goals2 && prono.match_id.goals1 > prono.match_id.goals2) || (prono.goals2 > prono.goals1 && prono.match_id.goals2 > prono.match_id.goals1)) points = 3; //vainqueur trouvé
              else if(prono.goals1 == prono.goals2 && prono.match_id.goals1 == prono.match_id.goals2) points = 3; //nul mais pas le bon score
              
              prono.points = points;
              prono.save(function(err) {
                if (err) 
                {
                  response.hasErrors = true;
                  response.message = err; 
                  res.status(400).send(response);
                }
              });
            });
            //2) MAJ des points pour tous les utilisateurs
            User.find().exec(function(err,users){
              if (err)
              {
                response.hasErrors = true;
                response.message = err; 
                res.status(400).send(response);
              }
              else
              {
                users.forEach(user => {
                  user.syncPoints();
                });
              }
            });
          }
        });
      }
      response.data = data;
      res.send(response);
    }
  });
});
  
/* DELETE match by id */
router.delete('/:_id', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    Match.remove({_id: req.params._id},function(err){
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

