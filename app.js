var appConfig = require('./app.config');
var winston = require('winston');
var moment = require('moment');

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/', express.static(__dirname + '/client'));

var Twitter = require('twitter');
var twitter = new Twitter(appConfig.twitter);

var candyio = require('./gpio/candyio.js');
configureLogs();

require('./routes')(app, twitter);
var port = parseInt(process.env.PORT, 10) || 8080;
app.listen(port);
console.log('Server running at http://localhost:' + port + '/');

// twitter.stream('user', {track: 'tweet_4_treat'}, function(stream) {
twitter.stream('statuses/filter', {track: 'norway'}, function(stream) {
	console.log('Streaming twitter...');
	stream.on('data', function(tweet) {
		if(tweet.text){
			winston.log('info', tweet.text, {
				tweet_id: tweet.id,
				user_id: tweet.user.id,
				user_name: tweet.user.name,
				screen_name: tweet.user.screen_name
			});
			candyio.dispense();
		}
	});

	stream.on('error', function(error) {
		winston.log('error', error);
	});
});

function configureLogs(){
	winston.add(winston.transports.File, { 
		filename: 'logs/' + moment().format('YYYYMMDD') + '.log',
		timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
	});
	if(appConfig.mode === 'development'){
		winston.remove(winston.transports.Console);
	}
}

