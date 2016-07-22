var pmongo = require('promised-mongo');



var uri = 'mongodb://jad:carson@ds023485.mlab.com:23485/austin_art';



var db = pmongo(uri, {
  authMechanism: 'ScramSHA1'
});

module.exports = db