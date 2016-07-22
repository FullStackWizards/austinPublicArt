var pmongo = require('promised-mongo');

<<<<<<< c370a02d5173c88b14ac1027ea65d69d0fd30c6c
var uri = 'mongodb://jad:carson@ds023485.mlab.com:23485/austin_art';
=======
var uri ='mongodb://jad:carson@ds023485.mlab.com:23485/austin_art';
>>>>>>> Have a working map and now adding extra info to it

var db = pmongo(uri, {
  authMechanism: 'ScramSHA1'
});

module.exports = db