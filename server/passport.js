var FACEBOOK_ID = '932055926922953';
var FACEBOOK_CALLBACK_URL = 'http://localhost:4040/facebookLogin/Callback'	
var FACEBOOK_SECRET = 'c283a4b04e8635a09c8ac2d0ed071e30'
var PROFILE_FIELDS = ['id', 'email', 'photos','gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var path       = require('path');
var db         = require(path.join(__dirname, './db.js'));
var Utils      = require(path.join(__dirname, './utils.js'));

module.exports = function(passport){

	passport.serializeUser(function(user, callback){
		console.log("HEY THERE")
		console.log("SUSERS", user)
		callback(null, user.userID || user.facebookID || user)
	});

	passport.deserializeUser(function(id,callback){
		console.log("Decerael" , id)
		findUserByID(id).then(function(value){
			console.log("value", value)
			if(value){
				console.log("IFVALUE!!!!!!", value)
				done(null, value);
			}
			else{
				console.log("ELSE")
				done('no session exists',value)
			}
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
				return Utils.hashPassword(password)
				.then(function(hash) {
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

	passport.use('local-login', new LocalStrategy(
    function(username, password, callback) {
      console.log('LOCAL LOGIN', username, password, callback)
      process.nextTick(function() {
        db.collection('users').find({username: username}).then((user) => {
          console.log('USERVALUE', user)
          if(user.length > 0) {
            Utils.comparePassword(user[0].password, password).then(val => {
              if (val === true) {
                console.log('CORRECT PASSWORD')
                return callback(null, user[0]);
              } else {
                console.log('user exists, but wrong password')
                return callback(null, false, flash('badPass', 'Incorrect password'));
              }
            })
            .catch(val => {
              console.log('Password incorrect', val);
              return callback(null, false, flash('badPass', 'Incorrect password'));
            })
          } else {
            console.log('User not found');
            return callback(null, false, flash('noUser', 'Username not found'));
          	}
        })
      })
    }
  ))


	passport.use(new FacebookStrategy({
		clientID: FACEBOOK_ID,
		clientSecret: FACEBOOK_SECRET,
		callbackURL : FACEBOOK_CALLBACK_URL,
		profileFields : PROFILE_FIELDS,
		enableProof: true
	},function(token,refreshToken,profile,done){
		process.nextTick(function(){
			console.log('profile',profile.id, profile[0])
			// check if in users database
			// return db.collection('FBusers').find({facebookID: profile.id}).then(function(uservalue){
			// 	console.log("THIS VALUE1ST!!",userValue)
			// 	if(userValue.length>0){
			// 		console.log("VALUEINFBSTAR", userValue)
			// 		return done(null, userValue)	//already exists
			// 	}
			// 	else{
					addFacebookUser(profile,token).then(function(userValue){
					console.log('HASH',userValue)
						return done(null,userValue)			
					})
				})
				// return done(null,profile)
					//doesn't exist
					
			}))
}
// // 	})

// // 	}
// // ))
// }
	function addFacebookUser(user,token) {
	console.log('USER',user, "token" ,token)
	//check if user exists.  Via email.  If not, make new, is yes, update existing
	// return db.collection('FBusers').find({facebookID: user.id}).then(function(existingUser){
	// 	if(existingUser.length>0){
	// 		return db.collection
			return db.collection('FBusers').insert({
				facebookID: user.id,
				facebookToken: token,
				facebookPicture: user.photos[0],
				facebookName: user.name

				// facebookEmail:user.emails[0].value})
		})
	}
			//create new user
		// })

 	// }

 var findUserByID = function(ID) {
 	console.log("FINDUSERID", ID)
	return db.collection('FBusers').find({
		facebookID : ID
	}).then(function(value) {
		console.log('valueIDID',value)
		if (value.length > 0) {
			return value[0];
		}
		return false;
	})
}

//need to add a FB user to the database. Then i will be able to check for the id

//need to fetch the picture and put it in the facebook login modal.
 
	// }))
// }
