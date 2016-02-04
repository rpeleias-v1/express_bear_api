var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var helmet = require('helmet');

module.exports = function() {
	var app = express();
	var port = process.env.PORT || 3000;
	app.set('port', port);

	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());	

	app.use(methodOverride());

	//helmet middlewares
	app.disable('x-powered-by');
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());

	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
}