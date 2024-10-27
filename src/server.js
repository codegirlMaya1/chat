const io = require('socket.io')(3000, {
    cors: {
      origin: '*',
    }
  });
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('message', (message) => {
      io.emit('message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  