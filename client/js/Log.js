var Log = ( function(){
	var instance;
	var streamedLogs;
	var updateYPos = false;
	var elementId = 'log';
	var groupSimilar = true;

	function create(){
		function openSocket(uri){
			var ws = new WebSocket(uri);
			ws.onopen = function(){
				console.log('Connection to ' + uri + ' opened.')
			};
			ws.onclose = function(){ 
				console.log('Connection to ' + uri + ' closed.');
			};
			ws.onmessage = appendLog;
			ws.onerror = handleError;

			window.onbeforeunload = function(e) {
				ws.close();
			};
		}

		function appendLog(event){
			log = JSON.parse(event.data);
			//custom content
			log.duplicates = 0;
			// console.log(log);
			groupSimilar ? group(log) : streamedLogs.push(log);
			if(updateYPos){ scroll(); }
		}

		function group(log, callback){
			var iLastLog = streamedLogs.length-1;
			if(streamedLogs.length > 0 && log.message === streamedLogs[iLastLog].message){
				console.log('Duplicate message: ' + log.message);
				streamedLogs[iLastLog].duplicates++;

			}else{
				streamedLogs.push(log);
			}
		}

		function scroll(){
			var el = document.getElementById(elementId);
			var elH = el.height;
			console.log(elH);

			// if(window.scrollY > autoScrollZone){
			// 	Velocity(html, "scroll", { 
			// 		offset: el.scrollHeight, 
			// 		duration: 300,
			// 		mobileHA: false
			// 	});
			// }
		}
		function handleError(err){
			console.log(err);
		}

		function init(uri, options){
			var options = options || {};
			elementId = options.elementId || 'log'
			updateYPos = options.updateYPos || false;
			groupSimiar = options.groupSimilar || false;

			streamedLogs = [];
			openSocket(uri);

			new Vue({
				el: '#' + elementId,
				data: {
					logs: streamedLogs
				}
			});

		}
		return {
			init: init
		};
	}

	return {
		getInstance: function(){
			if(!instance){
				instance = create();
			}
			return instance;
		}
	};
})();