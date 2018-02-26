var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user
var Buteur        = require('../models/buteur');    // import data models user

var response = { hasErrors: false, data: {}, message: ""};

/* GET listing buteurs swith params */
router.get('/', function(req, res, next) {
    Buteur.find(req.query,function(err,buteurs){
        if (err)
        {
            response.hasErrors = true;
            response.message = err; 
            res.status(404).send(response);
        }
        else
        {
            response.data = buteurs;
            res.send(response);
        }
    });
});

/* GET buteur by id */
router.get('/:_id', function(req, res, next) {
    Buteur.findOne({_id: req.params._id},'',function(err,buteur){
        if (err)
        {
            response.hasErrors = true;
            response.message = err; 
            res.status(404).send(response);
        } 
        else
        {
            response.data = buteur;
            res.send(response);
        }
    });
});

/* POST new buteur*/
router.post('/', function(req, res, next) {
    var newButeur = new Buteur(req.body);
    newButeur.save(function(err,data){
        if (err)
        {
            response.hasErrors = true;
            response.message = err; 
            res.status(400).send(response);
        }
        else
        {
            response.data = data;
            res.location(`/buteurs/${data._id}`);
            res.status(201).send(response);
        }
    });
});

/* PATCH buteur by id */
router.patch('/:_id', function(req, res, next) {
    Buteur.update({_id: req.params._id},req.body,{multi: false},function(err,data){
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

/* DELETE buteur by id */
router.delete('/:_id', function(req, res, next) {
    Buteur.remove({_id: req.params._id},function(err){
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