const express = require('express');
const path = require('path');
const cors = require('cors');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRouter');
const friendRouter = require('./routes/friendRouter');
const privateMsgRouter = require('./routes/privateMsgRouter');

const app = express();

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/friends', friendRouter);
app.use('/privatemsg', privateMsgRouter);

app.use((req, res, next) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
// app.all('*', (req, res, next) => {
//    next(
//       new AppError(`Invalid path: '${req.originalUrl}' not a valid url`, 404)
//    );
// });
app.use(globalErrorHandler);

module.exports = app;

// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// const AppError = require('./utils/AppError');
// const globalErrorHandler = require('./controllers/errorController');
// const userRouter = require('./routes/userRouter');
// const friendRouter = require('./routes/friendRouter');
// const privateMsgRouter = require('./routes/privateMsgRouter');
// const fileUpload = require('express-fileupload');

// const app = express();

// app.use(express.json());
// app.use(express.static('public/build'));
// app.use(cors());
// // app.use(fileUpload());
// app.use('/users', userRouter);
// app.use('/friends', friendRouter);
// app.use('/privatemsg', privateMsgRouter);

// if (process.env.NODE_ENV === 'production') {
// }
// app.get('*', (req, res) => {
//    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
// });
// // app.use((req, res, next) => {

// // });
// // app.all('*', (req, res, next) => {
// //    next(
// //       new AppError(`Invalid path: '${req.originalUrl}' not a valid url`, 404)
// //    );
// // });
// app.use(globalErrorHandler);

// module.exports = app;

// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"
