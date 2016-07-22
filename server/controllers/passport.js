let FBOOK_ID = "272107173165519"
let FBOOK_CALLBACK_URL = "http://localhost:4040/authFbook/facebook/callback"
let FBOOK_SECRET = 	"75a8527949731f9c4794e8c5a0b9c01b"
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;

let configAuth = require('./authFbook')
var Auth = require('../models/auth');
var utils = require('../utils')


////////////////////////////////////////////////////////////
//////////////////// PASSPORT cereals //////////////////////////
////////////////////////////////////////////////////////////
	module.exports = function (passport) {
		passport.serializeUser(function(user, done){
			done(null, user._id);
		});

		passport.deserializeUser(function(id, done) {
			User.findById(id, function(err, user) {
				done(err, user)
			});
		})
	
		
////////////////////////////////////////////////////////////
//////////////////// LOCAL STRATEGY //////////////////////////
////////////////////////////////////////////////////////////
	passport.use('local-signup', new LocalStrategy (
		function(username, password, done) {
			Auth.getUser(username)
				.then(user => {
					if(user[0]){
						res.statusMessage = "Username taken."
						res.status(400).end();
					} else {
						return Auth.signUp(username, password);
					}
				})
				.then(user =>
					Auth.createSession(user._id)
				)
				// .then(session => {
				// 	res.send(JSON.stringify(session.sessionId))
				// })
				.then(function(obj) {
					console.log("USER USER USER", obj)
					return done(null, obj)
				})
		}));

	passport.use('local-login', new LocalStrategy(

		function(username, password, done) {
			console.log("SOMETHING")
			Auth.getUser(username)
				.then(user => {
					console.log("USER", user)
					if(!user[0]) {
						res.statusMessage = "Incorrect username or password"
						res.status(400).end();
					} else {
						//compare hash passwor with password
						// if correct done(null, userObj)
						// not correct done ({message:"wrong message"}, false)
						userId = user[0]._id;
						return utils.comparePassword(user[0].password, password)
					}
				})
				// .catch(function(error){
				// 	console.log("ERROR", error)
				// })
				.then(isValidPassword => {
					console.log("nhnjjnjjjjhnjhj", isValidPassword)
					if(!isValidPassword) {
						res.statusMessage = "Incorrect username or password"
						res.status(401).end();
					} else {
						console.log("---CREATING SESSION ID")
						return Auth.createSession(userId)
						console.log("---THIS IS THE SESSION ID", Auth.createSession(userId))
					}
				})
				.then(session => {
					console.log("SESSION ID", JSON.stringify(session.sessionId))
					res.send(session.sessionId)
				})
			}))
				// .then(function())


////////////////////////////////////////////////////////////
//////////////////// FACEBOOK STRATEGY //////////////////////////
////////////////////////////////////////////////////////////
	passport.use(new FacebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	},
	function(accessToken, refreshToken, profile, done) {
				process.nextTick(function(){
					User.findOne({'facebook.id': profile.id}, function(err, user){
						if(err)
							return done(err);
						if(user)
							return done(null, user);
						else {
							var newUser = new User();
							newUser.facebook.id = profile.id;
							newUser.facebook.token = accessToken;
							newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
							newUser.facebook.email = profile.emails[0].value;

							newUser.save(function(err){
								if(err)
									throw err;
								return done(null, newUser);
							})
							console.log(profile);
						}
					});
				});
			}

	));
}
