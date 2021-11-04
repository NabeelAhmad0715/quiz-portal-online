const express = require('express');
const passport = require('passport');
const cron = require('node-cron');
const indexRouter = require('./routes/index');
const { sendEmail } = require('./utils/Mail');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 4000;
cron.schedule(
  '* * * 1 *',
  sendEmail('Hey there, this email was sent to you automatically'),
);
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send({ error: 'Not found' });
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send({ error: err });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
module.exports = app;
