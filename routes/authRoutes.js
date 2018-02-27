var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');


const bluebird      = require('bluebird');
const crypto        = bluebird.promisifyAll(require('crypto'));

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user

//test route
router.get('/loggedin', passport.authenticate('jwt', { session: false }), function(req, res) {
    var response = { hasErrors: false, data: {}, message: ""};
    response.message = 'It worked! User id is: ' + req.user._id + '.' + req.user.email;
    res.send(response);
});



// Création du compte Utilisateur
router.post('/register', function(req, res) {
    var response = { hasErrors: false, data: {}, message: ""};
    var newUser = new User();
    newUser.nom = req.body.nom;
    newUser.prenom = req.body.prenom;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    newUser.save(function(err, data) {
        if (err) {
            console.log("err" + JSON.stringify(err));
            response.hasErrors = true;
            response.message = err; 
            res.status(400).send(response);
        }
        else{
            response.data = data;
            response.message = "User created!";
            res.status(201).send(response);
        }
    });
});


// Route pour s'authentifier
router.post('/login', function(req, res) {
    var response = { hasErrors: false, data: {}, message: ""};
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) throw err;

        if (!user) {
            response.hasErrors = true;
            response.message = 'Authentication failed. User not found.'; 
            res.status(404).send(response);
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(user, config.secret, {expiresIn: 9000 }); // 15 minutes
                    response.data.token = 'JWT ' + token;
                    res.json(response);
                } else {
                    response.hasErrors = true;
                    response.message = 'Authentication failed. Passwords did not match.'; 
                    res.status(400).send(response);
                }

            });

        }
    });
});

// log out
router.get('/logout', passport.authenticate('jwt', { session: false }), function(req, res){
    var response = { hasErrors: false, data: {}, message: ""};
    req.logOut();
    res.status(200).send(response);
});





module.exports = router;  // import routes CRUD into a another file