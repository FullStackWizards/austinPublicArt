var express = require('express');
var Favorite = require('../models/favorite');
var Auth = require('../models/auth');

var router = express.Router();

module.exports = router;

// Retrieve all favorited art for the current logged in user
router.get('/', function(req, res) {
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
    .then(userId => Favorite.getFavorites(userId))
     // Return all favorited art back to client
    .then(favorites => {
      res.send(favorites)
    })
})

// Will add a favorite with userId and artId to the favorites collection if not already present.
// If it is present it will remove the userId and artId from favorites collection
router.post('/:artId', function(req, res) {
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
    .then(userId => Favorite.hasFavorited(userId, artId))
    // Checks to see if user has already favorited :artId
    .then(hasFavorited => {
      // False: add userId and artId to favorites collection
      if(!hasFavorited[0]) {
        Favorite.addFavorite(userId, artId)
          .then(() => {
            res.send({Status: "Successfully added to favorites"});
          });
      // True: remove userId and artId from favorites collection
      } else {
        Favorite.removeFavorite(userId, artId)
          .then(() => {
          res.send({Status: "Successfully removed from favorites"})
          });
      }
    });
})
