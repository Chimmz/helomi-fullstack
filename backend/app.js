const express = require('express');
const path = require('path');
const cors = require('cors');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRouter');
const friendRouter = require('./routes/friendRouter');
const privateMsgRouter = require('./routes/privateMsgRouter');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
// app.use(fileUpload());
app.use('/users', userRouter);
app.use('/friends', friendRouter);
app.use('/privatemsg', privateMsgRouter);

app.all('*', (req, res, next) => {
   next(
      new AppError(`Invalid path: '${req.originalUrl}' not a valid url`, 404)
   );
});
app.use(globalErrorHandler);

module.exports = app;
