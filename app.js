var appConfig = require('./app.config');
var http = require('http');

var express = require('express');
var app = express();

require('./routes')(app);

// Routing
app.get('/', function(req, res){
	res.send('Hello!\n');
});

app.listen(8080);
console.log('Server running at http://localhost:8080/');

