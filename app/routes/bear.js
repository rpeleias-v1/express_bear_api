var express = require('express');

module.exports = function(app) {
	var controller = app.controllers.bear;
	var router = express.Router();

	router.route('/bears')
		.post(controller.postBear)
		.get(controller.getBears);

	router.route('/bears/:bear_id')
		.get(controller.getSpecificBear)
		.put(controller.updateBear)
		.delete(controller.deleteBear);
	
	app.use('/api', router);
}