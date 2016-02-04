var http = require('http');
var app = require('./config/express')();
var database = require('./config/database')('mongodb://localhost/bear_api');

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express Server executando na porta ' + app.get('port'));
});
