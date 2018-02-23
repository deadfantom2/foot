var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user



/* GET listing utilisateurs par son classement descandant*/
router.get('/', function(req, res, next) {
    User.find(req.query,function(err,users){ }).sort([['points', 'desc']]).exec(function(err, data){
        if (err)
            res.status(404).send(err);
        else
            res.send(data);
        });
});


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