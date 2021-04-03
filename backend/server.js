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
mongoose
   .connect(DB_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
   })
   .then(() => console.log('Database connection successful'))
   .catch(err => console.log('Error in connecting to database', err));

server.listen(port, function () {
   console.log(`Server listens on port ${port}`);
});
