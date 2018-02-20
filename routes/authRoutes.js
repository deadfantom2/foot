var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');


const bluebird      = require('bluebird');
const crypto        = bluebird.promisifyAll(require('crypto'));
const nodemailer    = require('nodemailer');
var multer          = require('multer');
var fs              = require('fs');
const path          = require('path');


var config      = require('../config/database');
var User        = require('../models/user');    // import data models user


//test route
router.get('/loggedin', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.' + req.user.email);
});



// Création du compte Utilisateur
router.post('/register', function(req, res) {

    if(!req.body.email || !req.body.password || !req.body.email.endsWith("@ynov.com")) {
        res.status(400).send({ success: false, message: 'Please enter a valid email and password.' });
    } else {
        var newUser = new User();
        newUser.nom = req.body.nom;
        newUser.prenom = req.body.prenom;
        newUser.email = req.body.email;
        newUser.password = req.body.password;

        console.log(newUser);
        // Attempt to save the user
        // newUser.save();

        // newUser.save(function(err){
        //     console.log('test');
        // });
        User.findOne({ email: req.body.email }, function(err, existUser) {
            if(err){
                console.log("err" + JSON.stringify(err));
                res.status(400).send({ success: false, message: 'Error'});
            }
            else if(existUser){
                res.status(400).send({ success: false, message: 'Email already exist!'});
            }
            else{
                newUser.save(function(err) {
                    console.log("enter");
                    if (err) {
                        console.log("err" + JSON.stringify(err));
                        res.status(400).send({ success: false, message: 'Error'});
                    }
                    else{
                        console.log("no err");
                        res.status(200).send({ success: true, message: 'User created!' });
                    }
                });
            }
        });
        

        //res.status(200).send({ success: true, message: 'User created!' });
    }
});


// Route pour s'authentifier
router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(user, config.secret, {expiresIn: 9000 }); // 15 minutes

                    console.log("ici");
                    res.json({ success: true, token: 'JWT ' + token });

                } else {
                    res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }

            });

        }
    });
});

// log out
router.get('/logout', function(req, res){
    req.logOut();
    res.status(200).send({ success: true});
});





module.exports = router;  // import routes CRUD into a another file