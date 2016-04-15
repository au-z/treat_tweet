module.exports = function(app, twitter){
	var ctrl = require('./ctrl/tweetCtrl').call({}, twitter);
	app.get('/', ctrl.index);
	app.get('/profile', ctrl.profile);
	app.post('/tweet', ctrl.tweet);
	app.get('/stream', ctrl.stream);
}