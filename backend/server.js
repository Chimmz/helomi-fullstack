const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const PrivateMsg = require('./models/PrivateMsg');
const server = http.createServer(app);
const io = require('socket.io')(server, {
   cors: {
      origin: '*',
      methods: ['GET', 'POST']
   }
});
const { ExpressPeerServer } = require('peer');

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
   .then(_ => console.log('Database connection successful'))
   .catch(err => console.log('Error in connecting to database', err));

const peerServer = ExpressPeerServer({
   server,
   debug: true,
   generateClientId: uuidv4()
});

// peerServer.on('connection', () => console.log('A new peer connection'));

io.on('connect', socket => {
   console.log(`New connection: ${socket.id}`);

   socket.on('join-self', userId => {
      socket.join(userId);
      console.log(`${socket.id} is joining himself @ ${userId}`);
   });

   socket.on('typing', ({ typist, isTyping, allChats }) => {
      allChats.forEach(chatId =>
         io.to(chatId).emit('user-is-typing', { typist, isTyping })
      );
   });

   socket.on('private-msg-out', async msgDetails => {
      const { from, sendTo, text, sentAt } = msgDetails;
      try {
         const newMsg = await PrivateMsg.create({
            sender: from,
            receiver: sendTo,
            createdAt: sentAt,
            text
         });
         io.to(sendTo).emit('new-msg-in', { newMsg, status: 'success' });
         console.log(`Sending ${text} to ${sendTo}`);
      } catch (err) {
         io.to(sendTo).emit('new-msg-in', { newMsg, status: 'fail' });
      }
   });

   socket.on('set-unreadMsgs-to-read', async ({ unreadMsgs }) => {
      const foundMsgs = await Promise.all(
         unreadMsgs.map(msg => msg && PrivateMsg.findOne({ _id: msg._id }))
      );
      await Promise.all(
         foundMsgs.map(
            async msg =>
               msg &&
               (await PrivateMsg.updateOne({ _id: msg._id }, { isRead: true }))
         )
      );
   });

   // For video call

   socket.on('outgoing-videocall', callDetails => {
      io.to(callDetails.to).emit('incoming-videocall', callDetails);
   });

   socket.on('answer-call', ({ to: caller, answer }) => {
      io.to(caller).emit('call-answered', answer);
   });

   socket.on('disconnect', () =>
      console.log(`User disconnected: ${socket.id}`)
   );
});

server.listen(port, () => console.log(`Server listens on port ${port}`));
