let LocalStrategy = require('passport-local').LocalStrategy

// COME BACK TO
let User = require('../')
let configAuth = require('./authFbook')

module.exports = function (passport) {
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user)
		});
	});

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
				if(!user.valid)
			})
		})
	}
	}))







}