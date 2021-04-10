const dotenv = require('dotenv');
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const server = http.createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 5000;
dotenv.config({ path: './config.env' });

const DB_STR = process.env.DATABASE_URI.replace(
   '<password>',
   process.env.DATABASE_PASSWORD
);
// mongodb://localhost:27017/Helomi
mongoose
   .connect(DB_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
   })
   .then(() => console.log('Database connection successful'))
   .catch(err => console.log('Error in connecting to database', err));

io.on('connect', socket => {
   console.log(`New user connected: ${socket.id}`);
   socket.on('join-room');
   // socket.on('private-msg-out', msg => {
   //    const { text, sender, receiver } = msg;
   //    const privateRoom1 = socket.join([sender, receiver].join('.'))
   //    const privateRoom2 = socket.join([receiver, sender].join('.'))
   //    socket.to(privateRoom1).to(privateRoom2).broadcast()
   //    console.log();
   // });

   socket.on('disconnect', () =>
      console.log(`User disconnected: ${socket.id}`)
   );
});

server.listen(port, function () {
   console.log(`Server listens on port ${port}`);
});
