var appConfig = require('../app.config');
var winston = require('winston');
var os = require('os');
var PI_MODE = (os.platform() === 'linux');

if(PI_MODE){
	var gpio = require('onoff').Gpio;
	var motor = new Gpio(17, 'out');
}

var Candyio = function(){};

Candyio.prototype.dispense = function(duration){
	if(PI_MODE) motor.write(1, function(err){ handleErrors });
	setTimeout(function(){
		if(PI_MODE){
			motor.write(0);
			motor.unexport();
		}
		// winston.log('info', 'Dispensation complete.');
	}, duration);
};

Candyio.prototype.handleErrors = function(err){
	winston.log('error', err);
}

module.exports = new Candyio();