var express = require('express');
var bodyParser = require('body-parser');
var AluminiUser = require('../models/user');
var mongoose = require('mongoose');
var passport = require('passport');
var passportLocal = require('passport-local');
var { Verification, Welcome } = require('../emails/emails');
var upload = require('../images/uploading');
var back = require('express-back');




var router = express.Router();



//Rendering Register files
router.get('/', (req, res) => {
    res.render('landing');
});
router.get('/signup', (req, res) => {
    res.render('signup');
})

//Sucess route for registered Members
router.get('/registered', (req, res) => {
    res.render('sr');
});


// Posting registered users
router.post('/signup', (req, res) => {
    var newUser = new AluminiUser({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        collegeid: req.body.collegeid
    });
    console.log(newUser);
    AluminiUser.register(newUser, req.body.password, (err, data) => {
        if (err) {
            console.log(err);
            res.redirect('/login')
        } else {
            console.log(data);
            var userUrl = req.protocol + '://' + req.get('host') + '/' + data._id; ///Modify
            Welcome(data.username, 'Prady');
            Verification(data.username, userUrl) /*Need to Modilfy */
            passport.authenticate('local')(req, res, function() {
                res.redirect('/registered');
            })
        }
    });
});




// gET login page
router.get('/signin', (req, res) => {
    res.render('signin');
});


// Success login
router.get('/logged', (req, res) => {
    res.render('ls', { currentUser: req.user });
});


//  Login User
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/logged',
    failureRedirect: '/signin'
}))


//Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});





//back
router.get('/back', (req, res) => {
    res.back();
});


module.exports = router;