var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var Boost        = require('../models/boost');    // import data models boost


/* GET listing boosts swith params */
router.get('/', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    Boost.find(req.query,'',function(err,boosts){
        if (err)
        {
            response.hasErrors = true;
            response.message = err; 
            res.status(404).send(response);
        }
        else
        {
            response.data = boosts;
            res.send(response);
        }
    });
});

/* GET boost by id */
router.get('/:_id', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    Boost.findOne({_id: req.params._id},'',function(err,boost){
        if (err)
        {
            response.hasErrors = true;
            response.message = err; 
            res.status(404).send(response);
        }
        else
        {
            response.data = boost;
            res.send(response);
        }
    });
});

/* POST new boost*/
router.post('/', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    var newBoost = new Boost(req.body);
    newBoost.save(function(err,data){
        if (err)
        {
            response.hasErrors = true;
            response.message = err; 
            res.status(400).send(response);
        }
        else
        {
            response.data = data;
            res.location(`/boosts/${data._id}`);
            res.status(201).send(response);
        }
        
    });
});

/* PATCH boost by id */
router.patch('/:_id', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    Boost.update({_id: req.params._id},req.body,{multi: false},function(err,data){
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

/* DELETE Boost by id */
router.delete('/:_id', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    Boost.remove({_id: req.params._id},function(err){
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