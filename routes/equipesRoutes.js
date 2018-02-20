var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user
var Equipe        = require('../models/equipe');    // import data models user


router.post('/create',  function(req, res) {

        var newEquipe = new Equipe();
            newEquipe.nomEquipe = req.body.nomEquipe;
            newEquipe.photo     = req.body.photo;

        console.log(newEquipe);

        newEquipe.save(function(err) {
            if (err) {
                console.log("err" + JSON.stringify(err));
                res.status(400).send({ success: false, message: 'Error'});
            }
            else{
                console.log("no err");
                res.status(200).send({ success: true, message: 'Equipe created!' });
            }
        });



});

router.put('/:id',  function(req, res) {
    Equipe.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {

        Equipe.findOne({_id: req.params.id}).then(function (equipe) {
            res.send(equipe);
        });
    });
});

router.delete('/:id', function(req, res) {
    Equipe.findByIdAndRemove({_id: req.params.id}).then(function (equipe) {
        res.send(equipe);
    });
});

module.exports = router;  // import routes CRUD into a another file
