const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('chat message', (msg) => {      
    console.log(msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});

http.listen(3000, '192.168.0.2' || 'localhost', () => {
  console.log('listening on *:3000');
});
