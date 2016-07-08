var bcrypt = require('bcrypt-nodejs');
var uuid = require('node-uuid');

var Utils = {
 hashPassword: function(password) {
  console.log("hash password", password);
   return new Promise(function(resolve, reject){
    console.log("In promise")
     bcrypt.hash(password, null, null, function(err, hash){
       console.log('err');
       if(err) {console.log("bcrpyt error:", err)};
       resolve(hash);
     })
   })
 },

 comparePassword: function(hash, attemptedPassword) {
   return new Promise(function(resolve, reject){
     bcrypt.compare(attemptedPassword, hash, function(err, isCorrect){
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

