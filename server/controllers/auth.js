var express = require('express');
var passport   = require("passport");
var LocalStrategy   = require('passport-local').Strategy;

var Auth = require('../models/auth');

var router = express.Router();
module.exports = router;


////////////////////////////////////////////////////////////
//////////////////// LOCAL AUTH //////////////////////////
////////////////////////////////////////////////////////////

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash:false
}));


// router.post('/login', passport.authenticate('local-login', { 
//   successRedirect: '/',
//   failureRedirect: '/login' 
// }));


  router.post('/login', function(req, res, next) { passport.authenticate('local-login'),  
  function(req, res) {
    console.log("WTFWTFWTFWTFWTF", req.body)
    const username = req.body.username;
    const password = req.body.password;
    var userID
  
  res.send(JSON.stringify(req.sessionId))}(req, res, next)});



  // router.post('/api/me',
  // passport.authenticate('basic', { session: false }),
  // function(req, res) {
  //   res.json(req.user);
  // });

////////////////////////////////////////////////////////////
//////////////////// FACEBOOK AUTH //////////////////////////
////////////////////////////////////////////////////////////

router.post('/authFbook/callback', passport.authenticate('facebook', {
  successRedirect : '/profile',
  failureRedirect : '/'
}));

router.post('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}

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

////////////////////////////////////////////////////////////
/////////////////// trash pending /////////////////////////

//   app.get('/profile', isLoggedIn, function(req, res){
//     res.render('profile.ejs', { user: req.user });
//   });

//   app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));




//   res.redirect('/login');
// }

