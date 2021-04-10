const PrivateMsg = require('../models/PrivateMsg');
const { io } = require('../server');

console.log(io);
io.on('connect', socket => {
   console.log('New user connection');
   socket.emit('test-event');
});
