var express = require('express');
var passport   = require("passport");
var LocalStrategy   = require('passport-local').Strategy;

let Auth = require('../models/auth');
let utils = require('../utils')
let configAuth = require('./authFbook')
let router = express.Router();

module.exports = router;



////////////////////////////////////////////////////////////
//////////////////// LOCAL AUTH //////////////////////////
////////////////////////////////////////////////////////////

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash:false
}));

  router.post('/login', function(req, res, next) { passport.authenticate('local-login'),  
    function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    var userID;Auth.getUser(username)
        .then(user => {
          if(!user[0]) {
            res.statusMessage = "Incorrect username or password"
            res.status(400).end();
          } else {
            userId = user[0]._id;
            return utils.comparePassword(user[0].password, password)
          }
        })
        .then(isValidPassword => {
          if(!isValidPassword) {
            res.statusMessage = "Incorrect username or password"
            res.status(401).end();
          } else {
            console.log("---CREATING SESSION ID")
            return Auth.createSession(userId)
          }
        })
        .then(session => {
          console.log("SESSION ID", JSON.stringify(session.sessionId))
          res.send(JSON.stringify(session.sessionId))
        })}(req, res, next)});

////////////////////////////////////////////////////////////
//////////////////// FACEBOOK AUTH //////////////////////////
////////////////////////////////////////////////////////////

// router.post('/authFbook/callback', passport.authenticate('facebook', {
//   successRedirect : '/profile',
//   failureRedirect : '/'
// }));

// router.post('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/');
// });

// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {
//   // if user is authenticated in the session, carry on
//   if (req.isAuthenticated())
//     return next();
//   // if they aren't redirect them to the home page
//   res.redirect('/');
// }

////////////////////////////////////////////////////////////
//////////// Not Modified post Refractoring /////////////////
////////////////////////////////////////////////////////////

router.get('/username', function(req, res) {
  var sessionId;

  if(req.headers.cookieheader) {
    sessionId = req.headers.cookieheader.substring(10);
  } else {
    res.sendStatus(401);
  }
  // Find the sessionId in sessions collection
  Auth.getSession(sessionId)
    // Grab the user id from the sessions collection
    .then(session =>
      Auth.getUserById(session[0].id)
    )
    // Send back just the username to client
    .then(user => {
      res.send(JSON.stringify(user[0].username))
    })
})

router.get('/user', function(req, res) {
  var sessionId;

  if(req.headers.cookieheader) {
    sessionId = req.headers.cookieheader.substring(10);
  } else {
    res.sendStatus(401);
  }
  // Find the sessionId in sessions collection
  Auth.getSession(sessionId)
     // Grab the user id from the sessions collection
    .then(session => {
      res.send(session[0].id)
    })
})


