var winston = require('winston');

module.exports = function logFactory(wss){
	return({
		log: log
	});

	//PUBLIC
	function log(ws, req){

		winston.stream({ start: -1 }).on('log', function(log){
			ws.send(JSON.stringify(log), function(err){
				if(err) console.log(err);
			});
		});

		ws.on('close', function(user) {
			console.log('Disconnected: %s', ws.upgradeReq.url);
		});
	}
	
	//PRIVATE
}