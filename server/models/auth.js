var db = require('../db');
var utils = require('../utils');


// Get user record by username
exports.getUser = username => {
  return db.collection('users').find({username: username});
};

// Get user record by userId
exports.getUserById = userId => {
  return db.collection('users').find({_id: userId});
};

// Insert new user record after hashing password
exports.signUp = (username, password) => {
  return utils.hashPassword(password)
    .then(hash => 
      db.collection('users').insert({username: username, password: hash})
    );
};

// Create new session record associated with userId
exports.createSession = userId => {
  return db.collection('sessions').insert({
    id: userId, 
    sessionId: utils.createSessionId()
  });
};

// Get session record by sessionId
exports.getSession = sessionId => {
  return db.collection('sessions').find({sessionId: sessionId});
};


