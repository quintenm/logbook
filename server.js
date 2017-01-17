var express = require('express');

var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var path = require('path');

// Define the port to run on
app.use(express.static(__dirname + '/public'));


// Listen for requests

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


var io = require('socket.io')(server);


io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('disconnect', function() {
        console.log('A user disconnected');
    });
    socket.on('chat message', function(data){
      var msg = data.msg;
      var room = data.room;
      io.in(room).emit('chat message', msg);
    });
    socket.on('room', function(room) {
        socket.join(room);
        console.log(room);
    });
});
