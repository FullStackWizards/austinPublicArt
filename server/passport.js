var FACEBOOK_ID = '932055926922953';
var FACEBOOK_CALLBACK_URL = 'http://localhost:4040/facebookLogin/Callback'	
var FACEBOOK_SECRET = 'c283a4b04e8635a09c8ac2d0ed071e30'
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var path       = require('path');
var db         = require(path.join(__dirname, './db.js'));
var Utils      = require(path.join(__dirname, './utils.js'));

module.exports = function(passport){

	passport.serializeUser(function(user, callback){
		console.log("HEY THERE")
		console.log("SUSERS", user.userID)
		callback(null, user.userID)
	});

	passport.deserializeUser(function(id,callback){
		console.log("Decerael")
		User.findById(id, function(err,user){
			callback(err,user)
		})
	})

	passport.use('local-signup', new LocalStrategy(
		function(username,password,callback){
			process.nextTick(function(){
			console.log('Local', username, password, callback)
			db.collection('users').find({username: username}).then((user) => {
			console.log("user", user)
			if(user.length > 0){
				if(user[0].username){
					return callback(null,false);
				} 
			}
			else {
				console.log("ESEESE", password)
				return Utils.hashPassword(password).then(function(hash) {
					console.log("HASSSSHH", hash)
					return db.collection('users').insert({username: username, password: hash})
				})
				.then(function(obj) {
					var sessionId = Utils.createSessionId();
					return db.collection('sessions').insert({id: obj._id, sessionId: sessionId});
				})
				.then(function(obj) {
					console.log("OBJOBJOBJ", callback)
					console.log('SIGNUP USERID SUCCESS', {userID:obj})
					return callback(null, {userID:obj})
				})
			}
		})		
		}
		)
		}
	))


	// passport.use('local-login', new LocalStrategy({

	// })) 
}



		// else{
		// 			return hashPassword(password).then(function(hashword){
		// 				return knex('users').returning('userID').where({facebookEmail:username}).update({username:username,password:hashword}).then(function(value){
		// 					console.log('users',value)
		// 					return callback(null,{userID:value[0]})
		// 				})
		// 			})
					

		// 		}