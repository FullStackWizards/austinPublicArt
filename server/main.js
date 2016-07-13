var express    = require('express');
var path       = require('path');
var browserify = require("browserify-middleware");
var bodyParser = require('body-parser');

var Utils      = require('./utils.js');
var db         = require('./db.js');

var app        = express();

app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.json());

app.get('/app-bundle.js',
browserify(path.join(__dirname, '../client/main.js'), {
   transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
 })
);

// client asking for art data
app.get('/art', function(req,res) {
  //retrieve all art from db
  db.collection('art').find()
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
    console.log('bad request');
     res.status(400).end("bad request");
     res.set("Connection", "close");
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

app.post('/login', function(req, res) {
 var username = req.body.username;
 var password = req.body.password;

 var userID;

  db.collection('users')
    .find({username: username})
    .then((userObj) => {
      if(!userObj) {
        res.end(400, "Invalid username/Password")
      } else {
        userID = userObj[0]._id;
        return Utils.comparePassword(userObj[0].password, password)
      }
    })
    .then((isValidPassword) => {
      if(!isValidPassword) {
        res.end(401, "Invalid Username/password");
      } else {
        return db.collection('sessions')
                 .insert({ id: userID, sessionId: Utils.createSessionId() })
      }
    })
    .then((userObj) => {
      res.send(JSON.stringify(userObj.sessionId))
    })
})
/*
  Data In: Art ID
           Headers will have cookie

  Create Favorites collection
    -> User ID
    -> Art ID

  If we add total amount of favorites we also need to increment the favorite key of that specific art in the Art Collection

  X 1) Check UUID to see if it is in the Sessions, half ass authentication
    X 1) True: Grab _id for the UUID
      X 1) Add an entry to Favorites collection with _id and art ID
    2) False: return error 403
  2) Return something here if success or error if fail

 */
app.get('/getUsers', function(req, res) {
  db.collection('users').find()
  .then((data) => res.send(data))
})

app.get('/getArt', function(req, res) {
    db.collection('art').find()
    .then((data) => res.send(data))
})

app.get('/getSessions', function(req, res) {
    db.collection('sessions').find()
    .then((data) => res.send(data))
})

app.get('/getFavorites', function(req, res) {
    db.collection('favorites').find()
    .then((data) => res.send(data))
})

app.post('/param/:id', function(req, res) {
  console.log("params")
  res.send(req.params.id)
})

app.post('/favorites/:id', function(req, res) {
  console.log("HIT")
  var artId = req.params.artId;
  console.log("artID: ", artId)
  var sessionId = req.headers.cookie.substring(10);
  var userID = '';

  db.collection('sessions')
    .find({sessionId: sessionId})
    .then((returnedSession) => userID = returnedSession[0].id)
    .then(() => {
      //Check to see if the user has already favorited the artwork
      return db.collection('favorites').find({
        $and : [
        { userId: { $eq: userID } },
        { artId : { $eq: artId } } ]
      })
    .then((isEqual) => {
      if(!isEqual[0]) {
        return db.collection('favorites')
          .insert({ userId: userID, artId: artId })
      } else {
        return db.collection('favorites')
          .delete({ userID: userID, artId: artId })  
      }
    })
    .then((data) => console.log(data))
  })
  res.send()
})

// Run server on port 4040
var port = 4040;
app.listen(port);
console.log('Server is listening to port: ' + port)