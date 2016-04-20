var Log = ( function(){
	var instance;
	var streamedLogs;
	var updateYPos = false;
	var elementId = 'log';

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
			//handle page refreshes
			window.onbeforeunload = function(e) {
				ws.close();
			};
		}
		function appendLog(event){
			log = JSON.parse(event.data);
			streamedLogs.push(log);
			if(updateYPos){
				scroll();
			}
		}
		function scroll(){
			var html = document.documentElement;
			var el = document.getElementById(elementId);
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