var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user
var Buteur        = require('../models/buteur');    // import data models user

/* GET listing buteurs swith params */
router.get('/', function(req, res, next) {
    Buteur.find(req.query,function(err,buteurs){
        if (err)
            res.status(404).send(err);
        else
            res.send(buteurs);
    });
});

/* GET buteur by id */
router.get('/:_id', function(req, res, next) {
    Buteur.find({_id: req.params._id},'',function(err,buteurs){
        if (err)
            res.status(404).send(err);
        else
            res.send(buteurs[0]);
    });
});

/* POST new buteur*/
router.post('/', function(req, res, next) {
    var newButeur = new Buteur(req.body);
    newButeur.save(function(err,data){
        if (err)
            res.status(400).send(err);
        else
            res.location(`/buteurs/${data._id}`);
        res.status(201).send(data);
    });
});

/* PATCH buteur by id */
router.patch('/:_id', function(req, res, next) {
    Buteur.update({_id: req.params._id},req.body,{multi: false},function(err,data){
        if (err)
            res.status(400).send(err);
        else
            res.send(data);
    });
});

/* DELETE buteur by id */
router.delete('/:_id', function(req, res, next) {
    Buteur.remove({_id: req.params._id},function(err){
        if (err)
            res.status(404).send(err);
        else
            res.status(204).send();
    });
});

module.exports = router;  // import routes CRUD into a another file