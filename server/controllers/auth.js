var express = require('express');
var Auth = require('../models/auth');
var utils = require('../utils');

var router = express.Router();

module.exports = router;

// client asking for art data
router.get('/art', function(req,res) {
  //retrieve all art from db
  Auth.getArt()
    .then(art => {
      res.send(art);
    })
})

router.post('/signUp', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
 
  Auth.getUser(username)
  .then(user => {
    if(user[0]){
      res.statusMessage = "Username taken."
      res.status(400).end();
    } else {
      return Auth.signUp(username, password);
    }
  })
  .then(user => 
    Auth.createSession(user._id)
  )
  .then(session => {
    res.send(JSON.stringify(session.sessionId));
  })
})

// Logs in current user as long as username is in users collection and provided a valid password
router.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  let userId;

  Auth.getUser(username)
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
        return Auth.createSession(userId)
      }
    })
    .then(session => {
      res.send(JSON.stringify(session.sessionId))
    })
})

// Retrieve all favorited art for the current logged in user
router.get('/favorites', function(req, res) {
  var sessionId;

  if(req.headers.cookieheader) {
    sessionId = req.headers.cookieheader.substring(10);
  } else {
    res.sendStatus(401);
  }
  // Find the sessionId in sessions collection
  Auth.getSession(sessionId)
     // Grab the user id from the sessions collection
    .then(session => session[0].id)
     // Find all documents in favorites that contain the users id
    .then(userId => Auth.getFavorites(userId))
     // Return all favorited art back to client
    .then(favorites => {
      res.send(favorites)
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

// Will add a favorite with userId and artId to the favorites collection if not already present.
// If it is present it will remove the userId and artId from favorites collection
router.post('/favorites/:artId', function(req, res) {
  const artId = req.params.artId;
  const sessionId = req.body.cookie.substring(10);
  let userId;

  // Checks to see if user has a cookie.
  //  True : assign cookie to sessionID
  //  False: send a 401("Forbidden") status back to client
  if(!sessionId) {
    res.sendStatus(401)
  }

  // Finds the users session object using sessionId from cookie
  Auth.getSession(sessionId)
    .then(session => userId = session[0].id)
    //Check to see if the user has already favorited the artwork
    .then(userId => Auth.hasFavorited(userId, artId))
    // Checks to see if user has already favorited :artId
    .then(hasFavorited => {
      // False: add userId and artId to favorites collection
      if(!hasFavorited[0]) {
        Auth.addFavorite(userId, artId)
          .then(() => {
            res.send({Status: "Successfully added to favorites"});
          });
      // True: remove userId and artId from favorites collection
      } else {
        Auth.removeFavorite(userId, artId)
          .then(() => {
          res.send({Status: "Successfully removed from favorites"})
          });
      }
    });
})

router.post('/like/:id', function(req, res){
  const artId = req.params.id;
  const sessionId = req.body.cookie.substring(10);
  let userId;

  if(!sessionId) {
    res.sendStatus(401);
  } else {
    Auth.getSession(sessionId)
    .then(session => {
      // Get user id from session
      userId = session[0].id;
      return Auth.getUserById(userId)
    })
    .then(user => {
      // Check if user exists
      if(user[0]){
        return Auth.hasLiked(userId, artId)
      } else {
        // User doesn't exist, send back -bad request-
        res.sendStatus(400)
      }
    })
    .then(hasLiked => {
      // Check if user has already liked the art
      if(hasLiked[0]){
        // if so then the user will unlike the art
        return Auth.unlike(userId, artId);
      } else {
        // if not then the user will like the art
        return Auth.like(userId, artId);
      }
    })
    .then(() => {
      res.send({Status: "Success"});
    })
  }
})

router.get('/likes/:id', function(req, res){
  var artId = req.params.id;

  if(!artId) {
    res.status(400).send({"Error": "No art id... Come on now"});
  } else {
    Auth.getLikes(artId)
      .then(likes => {
        res.send({likeCount: likes.map(e => e.userId)});
      });
  }
})
