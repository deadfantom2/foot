var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user

/* GET listing utilisateurs par son classement descandant*/
router.get('/', function(req, res, next) {
    var response = { hasErrors: false, data: {}, message: ""};
    User.find(req.query,function(err,users){ }).sort([['points', 'desc']]).exec(function(err, data){
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


// Utilisateur met à jour son profile
router.put('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
    var response = { hasErrors: false, data: {}, message: ""};
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {   // met à jour les idintifiants selon son id
        // Rechercher utilisateur après inscription pour finir la requete
        User.findOne({_id: req.params.id}).then(function (user) {
            response.data = user;
            res.send(response);
        });
    });
});

// Supprimer utilisateur dans la DB
router.delete('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
    var response = { hasErrors: false, data: {}, message: ""};
    User.findByIdAndRemove({_id: req.params.id}).then(function (user) {         // On passe dans la requete id d'utilisateur pour supprimmer son compte
        response.data = user;
        res.send(response);
    });
});


module.exports = router;  // import routes CRUD into a another file