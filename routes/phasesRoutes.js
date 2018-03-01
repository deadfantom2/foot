var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user
var Phase        = require('../models/phase');    // import data models user

/* GET listing phases swith params */
router.get('/', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    Phase.find(req.query,function(err,phases){
        if (err)
        {
            response.hasErrors = true;
            response.message = err; 
            res.status(404).send(response);
        }
        else
        {
            response.data = phases;
            res.send(response);
        }
    });
});

/* GET buteur by id */
router.get('/getcurrent', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    var today = new Date();
    Phase.find({dateDebut: {$lte: today},dateFin: {$gte: today}},'',function(err,phase){
        if (err)
        {
            response.hasErrors = true;
            response.message = err; 
            res.status(404).send(response);
        }
        else
        {
            response.data = phase;
            res.send(response);
        }
    });
});


/* POST new buteur*/
router.post('/', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    var newPhase = new Phase(req.body);
    newPhase.save(function(err,data){
        if (err)
        {
            response.hasErrors = true;
            response.message = err; 
            res.status(400).send(response);
        }
        else
        {
            res.status(201).send(response);
        }
    });
});

/* PATCH buteur by id */
router.patch('/:_id', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    Phase.update({_id: req.params._id},req.body,{multi: false},function(err,data){
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
    var response = { hasErrors: false, data: {}, message: ""};
    Phase.remove({_id: req.params._id},function(err){
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