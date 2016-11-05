var db = require('../db');


// Get all likes for an art
exports.getLikes = artId => {
  return db.collection("likes").find({artId: artId});
};

// Check if user has liked an art
exports.hasLiked = (userId, artId) => {
  return db.collection('likes').find({userId: userId, artId: artId});
};

// Insert new record to show user liked an art
exports.like = (userId, artId) => {
  return db.collection('likes').insert({userId: userId, artId: artId});
};

// Delete record where user liked an art
exports.unlike = (userId, artId) => {
  return db.collection('likes').remove({userId: userId, artId: artId});
};

