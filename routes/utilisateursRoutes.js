var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user





// Utilisateur met à jour son profile
router.put('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {   // met à jour les idintifiants selon son id

        // Rechercher utilisateur après inscription pour finir la requete
        User.findOne({_id: req.params.id}).then(function (user) {
            res.send(user);
        });
    });
});

// Supprimer utilisateur dans la DB
router.delete('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
    User.findByIdAndRemove({_id: req.params.id}).then(function (user) {         // On passe dans la requete id d'utilisateur pour supprimmer son compte
        res.send(user);
    });
});


module.exports = router;  // import routes CRUD into a another file
