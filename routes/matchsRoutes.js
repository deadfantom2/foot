var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user
var Equipe        = require('../models/equipe');    // import data models user
var Match        = require('../models/match');    // import data models user
var Resultat        = require('../models/resultat');    // import data models user



/* GET listing equipes swith params */
router.get('/', function(req, res, next) {

    Match.find(req.query,function(err,matchs){
      if (err)
            res.status(404).send(err);
      else
            res.send(matchs);


        matchs.forEach(function(match) {

            Match.find({_id: match.id}, function(err, req) {
                var goals1 = match.goals1;
                var goals2 = match.goals2;
                var matches = match;
                Resultat.find(req.query,function(err,resultats){
                    resultats.forEach(function(resultat) {

                        //console.log(resultat.equipeUserGoal1 + " : " + goals1);
                        if(resultat.matchId == matches.id)
                        {
                            console.log( resultat.matchId + " : " + matches.id );
                            if(resultat.equipeUserGoal1 > goals1)
                            {
                                console.log("User a gagner");
                            }else
                                console.log("User a perdu");
                        }


                    });
                });

            });
        });

    });
  });

//result    1)      6:5     2)   4:5
//match     1)      2:0     2)   3:1




/* POST new equipe*/
router.post('/', function(req, res, next) {
    var newmatch = new Match(req.body);
    newmatch.save(function(err,data){
        if (err)
            res.status(400).send(err);
        else

        res.status(201).send(data);
    });
});


/* POST new result*/
router.post('/res', function(req, res, next) {
    var newresult = new Resultat(req.body);
    newresult.save(function(err,data){
        if (err)
            res.status(400).send(err);
        else

            res.status(201).send(data);
    });
});



module.exports = router;  // import routes CRUD into a another file

