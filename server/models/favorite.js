var db = require('../db');


// Get favorites for a user
exports.getFavorites = userId => {
  return db.collection('favorites').find({userId: userId});
};

// Check if user has favorited a piece of art
exports.hasFavorited = (userId, artId) => {
  return db.collection('favorites').find({userId: userId, artId: artId});
}

// Insert a new record to show user favoriting a piece of art
exports.addFavorite = (userId, artId) => {
  return db.collection('favorites').insert({userId: userId, artId: artId});
};

// Find the record that shows user has favorited a piece of art, and remove
exports.removeFavorite = (userId, artId) => {
  return db.collection('favorites').remove({userId: userId, artId: artId});
};
