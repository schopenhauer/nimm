var port = process.env.PORT || 3000;
var frequency = 1000;

var faker = require('faker');
var express = require('express');
var favicon = require('serve-favicon');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(favicon(__dirname + '/public/favicon.ico'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){

	setInterval(function() {

		var data = {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName()
		};

		socket.emit('name', data);
	}, frequency);

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
