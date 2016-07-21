var express = require('express');
var Like = require('../models/like');
var Auth = require('../models/auth');

var router = express.Router();

module.exports = router;

router.post('/:id', function(req, res){
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
        return Like.hasLiked(userId, artId)
      } else {
        // User doesn't exist, send back -bad request-
        res.sendStatus(400)
      }
    })
    .then(hasLiked => {
      // Check if user has already liked the art
      if(hasLiked[0]){
        // if so then the user will unlike the art
        return Like.unlike(userId, artId);
      } else {
        // if not then the user will like the art
        return Like.like(userId, artId);
      }
    })
    .then(() => {
      res.send({Status: "Success"});
    })
  }
})

router.get('/:id', function(req, res){
  var artId = req.params.id;

  if(!artId) {
    res.status(400).send({"Error": "No art id... Come on now"});
  } else {
    Like.getLikes(artId)
      .then(likes => {
        res.send({likeCount: likes.map(e => e.userId)});
      });
  }
})
