let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let configAuth = require('./authFbook')


// Remember:
 // If enabled, be sure to use express.session() before passport.session()
 // to ensure that the login session is restored in the correct order.



module.exports = function (passport) {

//---------------Serialize-----------------//
//-----------------------------------------//
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user)
		});
	});


//---------------Strategies----------------//
//-----------------------------------------//
	passport.use('local-signup', new LocalStrategy ({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		process.nextTick(function(){
			User.findOne({'local.username': email}, function(err, user){
				if(err)
					return done(err);
				if(user) {
					return done(null, false, req.flash('signupMessage', 'That email.,sdma.d'))
				} else {
					van newUser = new User();
					newUser.local.username = emial;
					newUser.local.password = newUser.generaateHash(password);

					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				}
			})
		});
	}));

	passport.user('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({'local.username': email}, function(err, user){
				if(err)
					return done(err);
				if(!user)
					return done(null, false, req.flash('loginMessage', 'No user sdjfnskdn'))
				if(!user.validPassword(password)){
					return done(null, false, req.flash('loginMessage', 'Not real password asnjn'))
				}
				return done(null, user);
			});
		});
	}));

	passport.use(new FacebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	},
	function(accessToken, refreshToken, profile, done) {
		// User.findOrCreate(..., function(err, user) {
		// 	if (err) {return done(err); }
		// 	done(null, user);
		process.nextTick(function(){

		})
		})
	}
	))

};