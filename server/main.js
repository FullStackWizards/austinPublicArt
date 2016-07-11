var express    = require('express');
var path       = require('path');
var browserify = require("browserify-middleware");
var bodyParser = require('body-parser');

var Utils      = require('./utils.js');
var db         = require('./db.js');

var app        = express();

app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.json());

// This will bundle all of our .js files into one.
// When loading the webpage, we will make a request to GET /app-bundle.js which is the bundled .js files
// We then transform all the code with babelify so that any react/es2015 code can be interpreted with es5 standards 

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

  db.users.find({username: username})
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
      return db.sessions.insert({id: userID, sessionId: Utils.createSessionId()})
    }
  })
  .then((userObj) => {
    res.send(JSON.stringify(userObj.sessionId))
  })
})

// Run server on port 4040
var port = 4040;
app.listen(port);
console.log('Server is listening to port: ' + port);

