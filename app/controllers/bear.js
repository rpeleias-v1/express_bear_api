var sanitize = require('mongo-sanitize')

module.exports = function(app) {

	var controller = {};
	var Bear = app.models.bear;

	controller.getBears = function(req, res) {
		Bear.find().exec()
			.then(
				function(bears) {
					res.json(bears);
				},
				function(err) {
					res.send(err);
				}
			)
	};

	controller.postBear = function(req, res) {
		var bear = new Bear();
		bear.name = req.body.name;
		Bear.create(bear)
			.then(
				function(bear) {
					res.status(201).json(bear);
				},
				function(err) {
					console.log(err);
					res.send(err);
				}
			)
	};

	controller.getSpecificBear = function(req, res) {
		Bear.findById(req.params.bear_id).exec()
			.then(
				function(bear) {
					if (!bear) {
						throw new Error("bear not found!");
					}
					res.json(bear);
				},
				function(err) {
					console.log(err);
					res.status(404).json(err);
				}
			);
	};

	controller.updateBear = function(req, res) {
		Bear.findById(req.params.bear_id).exec()
			.then(
				function(bear) {
					bear.name = req.body.name;
					bear.save(function(err) {
						if (err) res.send(err);
						res.json({
							message: 'Bear updated!'
						});
					});
				},
				function(err) {
					console.log(err);
					res.status(404).json(err);
				}
			);
	};

	controller.deleteBear = function(req, res) {
		var bearId = sanitize(req.params.bear_id);
		Bear.remove({
				"_id": bearId
			}).exec()
			.then(
				function() {
					res.status(204).end();
				},
				function(err) {
					console.log(err);
				}
			);
	};

	return controller;
}