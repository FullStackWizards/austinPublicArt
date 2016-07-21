// var User = require('./models/user');

module.exports = function(app, passport){
  // app.get('/', function(req, res){
  //   res.render('index.ejs');
  // });

  app.get('/login', function(req, res){
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

//   router.post('/login', function(req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//   let userId;

//   Auth.getUser(username)
//     .then(user => {
//       if(!user[0]) {
//         res.statusMessage = "Incorrect username or password"
//         res.status(400).end();
//       } else {
//         userId = user[0]._id;
//         return utils.comparePassword(user[0].password, password)
//       }
//     })
//     .then(isValidPassword => {
//       if(!isValidPassword) {
//         res.statusMessage = "Incorrect username or password"
//         res.status(401).end();
//       } else {
//         return Auth.createSession(userId)
//       }
//     })
//     .then(session => {
//       res.send(JSON.stringify(session.sessionId))
//     })
// })

  app.get('/signup', function(req, res){
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });


  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

// router.post('/signUp', function(req, res) {
//   const username = req.body.username;
//   const password = req.body.password;

//   Auth.getUser(username)
//   .then(user => {
//     if(user[0]){
//       res.statusMessage = "Username taken."
//       res.status(400).end();
//     } else {
//       return Auth.signUp(username, password);
//     }
//   })
//   .then(user =>
//     Auth.createSession(user._id)
//   )
//   .then(session => {
//     res.send(JSON.stringify(session.sessionId));
//   })
// })


  app.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', { user: req.user });
  });

  app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { successRedirect: '/profile',
                                        failureRedirect: '/' }));


  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  })
};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/login');
}






// router.get('/username', function(req, res) {
//   var sessionId;

//   if(req.headers.cookieheader) {
//     sessionId = req.headers.cookieheader.substring(10);
//   } else {
//     res.sendStatus(401);
//   }
//   // Find the sessionId in sessions collection
//   Auth.getSession(sessionId)
//     // Grab the user id from the sessions collection
//     .then(session =>
//       Auth.getUserById(session[0].id)
//     )
//     // Send back just the username to client
//     .then(user => {
//       res.send(JSON.stringify(user[0].username))
//     })
// })




// router.get('/user', function(req, res) {
//   var sessionId;

//   if(req.headers.cookieheader) {
//     sessionId = req.headers.cookieheader.substring(10);
//   } else {
//     res.sendStatus(401);
//   }
//   // Find the sessionId in sessions collection
//   Auth.getSession(sessionId)
//      // Grab the user id from the sessions collection
//     .then(session => {
//       res.send(session[0].id)
//     })
// })
