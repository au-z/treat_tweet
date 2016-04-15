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
		if(req.body.msg){
			// twitter.post('statuses/update', {status: req.body.msg }, function(err, data, response){
			// 	res.send(data);
			// });
			res.send([{
				'status':'not implemented'
			}]);
		}else{
			res.status(400).send('Tweet must contain a message.');
		}
	}

	function stream(req, res){
		res.send([{
			'status':'not implemented'
		}]);
	}

	//PRIVATE
};