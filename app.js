var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.configure(function(){ 
    app.use("/", require('express').static(__dirname ));
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('msg', function (data) {
    socket.emit('news', data);
  });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.listen(8080);
