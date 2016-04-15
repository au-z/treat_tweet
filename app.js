var appConfig = require('./app.config');
var winston = require('winston');
var moment = require('moment');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var Twitter = require('twitter');
var twitter = new Twitter(appConfig.twitter);

var candyio = require('./gpio/candyio.js');

configureLogs();

require('./routes')(app, twitter);

var port = parseInt(process.env.PORT, 10) || 8080;
app.listen(port);
console.log('Server running at http://localhost:' + port + '/');

console.log('Streaming for gluttons...');
twitter.stream('user', {track: '@tweet_4_treat'}, function(stream) {
  stream.on('data', function(tweet) {
  	winston.log('info', tweet.text);
  	candyio.dispense();
  });

  stream.on('error', function(error) {
    winston.log('error', error);
  });
});

function configureLogs(){
	if(appConfig.mode === 'development'){
		winston.add(winston.transports.File, { filename: 'logs/' + moment().format('YYYYMMDD') + '.log' });
		winston.remove(winston.transports.Console);
	}
}

