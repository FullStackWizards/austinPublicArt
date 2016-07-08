var pmongo = require('promised-mongo');

var uri = 'mongodb://fullstackwizards:pancakes@ds015995.mlab.com:15995/austinart';

var db = pmongo(uri, {
  authMechanism: 'ScramSHA1'
});

module.exports = db