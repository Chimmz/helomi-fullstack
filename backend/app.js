const express = require('express');
const userRouter = require('./routes/userRouter');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());
app.use('/users', userRouter);

app.all('*', (req, res, next) => {
   next(
      new AppError(`Invalid path: '${req.originalUrl}' not a valid url`, 404)
   );
});
app.use(globalErrorHandler);
// app.set('view engine', 'ejs');

// app.get('/home', (req, res) => {
//    res.render('chat', { name: 'Chima' });
// });

module.exports = app;
