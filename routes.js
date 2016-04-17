module.exports = function(app, twitter){
	var tweetCtrl = require('./ctrl/tweetCtrl').call({}, twitter);
	var logCtrl = require('./ctrl/logCtrl').call({});

	app.get('/api/tweet/profile', tweetCtrl.profile);
	app.post('/api/tweet/', tweetCtrl.tweet);
	app.get('/api/tweet/stream/:track', tweetCtrl.stream);

	app.ws('/api/log', logCtrl.log);
}