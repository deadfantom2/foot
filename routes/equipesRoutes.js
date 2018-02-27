var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user
var Equipe        = require('../models/equipe');    // import data models user


/* GET listing equipes swith params */
router.get('/', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    Equipe.find(req.query,'',function(err,equipes){
        if (err)
        {
            response.hasErrors = true;
            response.message = err; 
            res.status(404).send(response);
        }
        else
        {
            response.data = equipes;
            res.send(response);
        }
    });
});

/* GET equipe by id */
router.get('/:_id', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    Equipe.findOne({_id: req.params._id},'',function(err,equipe){
        if (err)
        {
            response.hasErrors = true;
            response.message = err; 
            res.status(404).send(response);
        }
        else
        {
            response.data = equipe;
            res.send(response);
        }
    });
});

/* POST new equipe*/
router.post('/', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    var newEquipe = new Equipe(req.body);
    newEquipe.save(function(err,data){
        if (err)
        {
            response.hasErrors = true;
            response.message = err; 
            res.status(400).send(response);
        }
        else
        {
            response.data = data;
            res.location(`/equipes/${data._id}`);
            res.status(201).send(response);
        }
        
    });
});

/* PATCH equipe by id */
router.patch('/:_id', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    Equipe.update({_id: req.params._id},req.body,{multi: false},function(err,data){
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

/* DELETE equipe by id */
router.delete('/:_id', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    Equipe.remove({_id: req.params._id},function(err){
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