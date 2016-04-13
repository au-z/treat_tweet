var appConfig = require('../app.config');
var Twit = require('twit');

module.exports = function tweetFactory(twitter){
	return({
		index: index,
		profile: profile,
		tweet: tweet,
		stream: stream
	});

	//PUBLIC 
	function index(req, res){
		res.send([{
			'status':'not implemented'
		}]);
	}

	function profile(req, res){
		res.send([{
			'status':'not implemented'
		}]);
	}

	function tweet(req, res){
		twitter.post('statuses/update', {status: req.params.msg }, function(err, data, res){
			console.log(data);
		});
	}

	function stream(req, res){
		res.send([{
			'status':'not implemented'
		}]);
	}

	//PRIVATE
};