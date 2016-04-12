var Twitter = require('twitter-node-client').Twitter;

var error = function(err, response, body){
	console.log('ERROR [%s]', data);
};
var success = function(data){
	console.log('Data [%s]', data);
};

var config = {
	'consumerKey': '',
	'consumerSecret': '',
	'accessToken': '',
	'accessTokenSecret': '',
	'callbackUrl': ''
}

var Twitter = new Twitter(config);

//
