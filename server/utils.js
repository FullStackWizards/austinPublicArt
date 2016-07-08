var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid-js');

var Utils = {
 hashPassword: function(password) {
   return new Promise(function(resolve, reject){
     bcrpyt.hash(password, null, null, function(err, hash){
       if(err) console.log("bcrpyt error:", err);
         resolve(hash);
     })
   })
 },

 comparePassword: function(hash, attemptedPassword) {
   return new Promise(function(resolve, reject){
     bcrpyt.compare(attemptedPassword, hash, function(err, isCorrect){
       if(err) console.log("bcrpyt error:", err);
         resolve(isCorrect);
     })
   })
 },

 createSessionId: function() {
   return uuid.v4();
 }
}
module.exports = Utils;

