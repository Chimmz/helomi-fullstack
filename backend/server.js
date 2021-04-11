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
   console.log(`New connection: ${socket.id}`);

   socket.on('join-self', userId => {
      socket.join(userId);
      console.log(`${socket.id} is joining himself @ ${userId}`);
   });

   socket.on('private-msg-out', msgDetails => {
      const { from, sendTo, text, sentAt } = msgDetails;
      io.to(sendTo).emit('new-msg-in', { from, text, sentAt });
      console.log(`Sending ${text} to ${sendTo}`);
   });

   socket.on('disconnect', () =>
      console.log(`User disconnected: ${socket.id}`)
   );
});

server.listen(port, function () {
   console.log(`Server listens on port ${port}`);
});
