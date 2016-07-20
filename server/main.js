var path = require('path');
var express = require('express');
var browserify = require('browserify-middleware');
var bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 4040;

////////////////// Passport //////////////////
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

<<<<<<< ea585755908b278be2b41ce8cd5cbf13d4fa72b5
=======



//////////////** passport-facebook **////////////////










// client asking for art data
app.get('/art', function(req,res) {
  //retrieve all art from db
  db.art.find()
  .then((art) => {
    res.send(art)
  })
})




app.post('/signUp', function(req, res) {
 var username = req.body.username;
 var password = req.body.password;

 db.collection('users').find({username: username})
 .then((user) => {
   if(user[0]){
     res.statusMessage = "Username taken."
     res.status(400).end();
   } else {
     return Utils.hashPassword(password)
   }
 })
 .then(function(hash){
   return db.collection('users').insert({username: username, password: hash});
 })
 .then(function(obj){
   var sessionId = Utils.createSessionId();
   return db.collection('sessions').insert({id: obj._id, sessionId: sessionId});
 })
 .then(function(obj){
   res.send(JSON.stringify(obj.sessionId));
 })
})




// Logs in current user as long as username is in users collection and provided a valid password
app.post('/login', function(req, res) {
 var username = req.body.username;
 var password = req.body.password;
 var userID;
  db.collection('users')
    .find({username: username})
    .then((userObj) => {
      if(!userObj[0]) {
        res.statusMessage = "Incorrect username or password"
        res.status(400).end();
      } else {
        userID = userObj[0]._id;
        return Utils.comparePassword(userObj[0].password, password)
      }
    })
    .then((isValidPassword) => {
      if(!isValidPassword) {
        res.statusMessage = "Incorrect username or password"
        res.status(401).end();
      } else {
        return db.collection('sessions')
          .insert({ id: userID, sessionId: Utils.createSessionId() })
      }
    })
    .then((userObj) => {
      res.send(JSON.stringify(userObj.sessionId))
    })
})

// Retrieve all favorited art for the current logged in user
app.get('/favorites', function(req, res) {
	var sessionId;

  if(req.headers.cookieheader) {
		sessionId = req.headers.cookieheader.substring(10);
	} else {
		res.sendStatus(401);
	}
	// Find the sessionId in sessions collection
	db.collection('sessions')
	.find({ sessionId: sessionId })
	// Grab the user id from the sessions collection
	.then((returnedSession) => returnedSession[0].id)
	// Find all documents in favorites that contain the users id
	.then((userID) => db.collection('favorites')
		.find({ userId: userID }))
	// Return all favorited art back to client
	.then((returnedFavorites) => res.send(returnedFavorites))
})

>>>>>>> partial fbook passport architecture implementation

// Load Routes
routes(app);




app.use(history());
app.use(express.static(path.join(__dirname, "../client/public")));

app.get('/app-bundle.js',
  browserify(path.join(__dirname, '../client/main.js'), {
     transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
   })
);

app.listen(port, () => {
  console.log("Server is listening on port " + port) 
})

