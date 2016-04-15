var winston = require('winston');

var Candyio = function(){};

Candyio.prototype.dispense = function(){
	winston.log('info', 'Dispensation complete.');
};

module.exports = new Candyio();