var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user
var Resultat        = require('../models/resultat');    // import data models user


router.post('/create',  function(req, res) {

        var newResultat = new Resultat();
            newResultat.adefinir = req.body.adefinir;
            newResultat.adefinir     = req.body.adefinir;

        console.log(newResultat);

        newResultat.save(function(err) {
            if (err) {
                console.log("err" + JSON.stringify(err));
                res.status(400).send({ success: false, message: 'Error'});
            }
            else{
                console.log("no err");
                res.status(200).send({ success: true, message: 'Resultat created!' });
            }
        });



});

router.put('/:id',  function(req, res) {
    Resultat.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {

        Resultat.findOne({_id: req.params.id}).then(function (resultat) {
            res.send(resultat);
        });
    });
});

router.delete('/:id', function(req, res) {
    Resultat.findByIdAndRemove({_id: req.params.id}).then(function (resultat) {
        res.send(resultat);
    });
});

module.exports = router;  // import routes CRUD into a another file
