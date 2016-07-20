var path = require('path');
var db = require('../db');
var utils = require('../utils');

exports.getArt = () => {
  return db.art.find();
};

exports.getUser = username => {
  return db.collection('users').find({username: username});
};

exports.getUserById = userId => {
  return db.collection('users').find({_id: userId})
    .then(user => user);
};

exports.signUp = (username, password) => {
  return utils.hashPassword(password)
    .then(hash => 
      db.collection('users').insert({username: username, password: hash})
    );
};

exports.createSession = userId => {
  return db.collection('sessions').insert({
    id: userId, 
    sessionId: utils.createSessionId()
  });
};

exports.getSession = sessionId => {
  return db.collection('sessions').find({sessionId: sessionId});
};

exports.getFavorites = userId => {
  return db.collection('favorites').find({userId: userId});
};

exports.hasFavorited = (userId, artId) => {
  return db.collection('favorites').find({userId: userId, artId: artId});
}

exports.addFavorite = (userId, artId) => {
  return db.collection('favorites').insert({userId: userId, artId: artId});
};

exports.removeFavorite = (userId, artId) => {
  return db.collection('favorites').find({userId: userId, artId: artId})
    .then(returnedDocument => 
      db.collection('favorites').remove({_id: returnedDocument[0]._id})
    );
};

exports.hasLiked = (userId, artId) => {
  return db.collection('likes').find({userId: userId, artId: artId});
};

exports.like = (userId, artId) => {
  return db.collection('likes').insert({userId: userId, artId: artId});
};

exports.unlike = (userId, artId) => {
  return db.collection('likes').remove({userId: userId, artId: artId});
};

exports.getLikes = artId => {
  return db.collection("likes").find({artId: artId});
};
