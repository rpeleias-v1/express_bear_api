var mongoose = require('mongoose');

module.exports = function() {
	
	var BearSchema = mongoose.Schema({
		name: String
	});

	return mongoose.model('Bear', BearSchema);
}