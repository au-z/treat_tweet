var winston = require('winston');

module.exports = function logFactory(){
	return({
		log: log
	});

	//PUBLIC
	function log(ws, res){
		winston.stream({ start: -1 }).on('log', function(log) {
	    ws.send(JSON.stringify(log), function(err){
	    	winston.log('info', 'logCtrl: Socket conn to client lost.');

	    });
	  });
	}

	//log/heartbeat
	function heartbeat(ws, res){
		var counter = 0;
		var iv = setInterval(function(){
			ws.send(counter);
			// console.log(counter);
			counter++;
		}, 500);
	}

	//PRIVATE
}