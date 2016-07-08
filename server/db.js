var mongodb = require('mongodb');

var uri = 'mongodb://fullstackwizards:pancakes@ds015995.mlab.com:15995/austinart';

mongodb.MongoClient.connect(uri, function(err, db) {

  module.exports = db
  
  if(err) throw err;

});