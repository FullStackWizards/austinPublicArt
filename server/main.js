var bodyParser = require('body-parser');

var express = require('express');

var app = express();

app.get('/', function(req, res){
	res.end("Server works!");
})

// Run server on port 4040
var port = 4040;
console.log('Server is listening to port: ' + port);
app.listen(port);