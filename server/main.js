var express    = require('express');
var path       = require('path');
var browserify = require("browserify-middleware");

var bodyParser = require('body-parser');

var app        = express();

app.use(express.static(path.join(__dirname, "../client/public")));

// This will bundle all of our .js files into one.
// When loading the webpage, we will make a request to GET /app-bundle.js which is the bundled .js files
// We then transform all the code with babelify so that any react/es2015 code can be interpreted with es5 standards 
app.get('/app-bundle.js',
 browserify('../client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);

app.post('/login', function(req, res) {
  /*TODO: add functionality for POST /login
    Takes a username, password
    Checks to see if the user is in the system
      True: Continue
      False: 400 response
    Hash attempted password
    Validate password
      True: continue
      False: 401 response
    Generate UUID
    Send UUID as a cookie
  */
})

// Run server on port 4040
var port = 4040;
app.listen(port);
console.log('Server is listening to port: ' + port);