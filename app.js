var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Load environment variables
require('dotenv').config();

// Setup server configuration
const { initializeDatabase } = require('./config/database.config');
initializeDatabase();

// Setup passport configuration
const passport = require('./config/passport.config');

var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');
var departmentRouter = require('./routes/department.route');
var roleRouter = require('./routes/role.route');
var authRouter = require('./routes/auth.route');

var app = express();

// Initialize Passport
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/roles', roleRouter);
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
