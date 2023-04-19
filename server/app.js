var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// express-mysql-session
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

// // 데이터 베이스에 접근하기 위한 접근 정보 : 공용 DB
var options = {
  host: '15.165.63.155',
  port: 3306,
  user: 'delivery',
  password: 'itc1234',
  database: 'delivery'
};
var sessionStore = new MySQLStore(options);


// 데이터 베이스에 접근하기 위한 접근 정보 : 테스트
// var options = {
//   host: '127.0.0.1',
//   port: 3306,
//   user: 'root',
//   password: 'itc801',
//   database: 'delivery'
// };
// var sessionStore = new MySQLStore(options);


const { Sequelize } = require('sequelize');

// 공용
// global.sequelize = new Sequelize('delivery', 'delivery', 'itc1234', {
//   host: '15.165.63.155',
//   dialect: "mysql"
// });

// 테스트 & 공용
global.sequelize = new Sequelize(options.database, options.user, options.password, {
  host: options.host,
  dialect: "mysql",
  logging: false
});

require("./model.js")

//

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var marketsRouter = require('./routes/markets');
var locationRouter = require('./routes/location');
var menuRouter = require('./routes/menus');
var basketRouter = require('./routes/baskets');
var orderRouter = require('./routes/orders');

var app = express();

// 인증에 대한 정보를 여기다가 저장하겠다.
app.use(session({
  key: 'session_Unique_key', // 독특한 값을 넣어 겹치지 않게
  secret: 'asdgasdgjksdljasdlfkjasl', // 암호화 알고리즘 비교 + 표준화된게 있기 때문에 솔트를 붙여 사용
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/markets', marketsRouter);
app.use('/api/locations', locationRouter);
app.use('/api/menus', menuRouter);
app.use('/api/baskets', basketRouter);
app.use('/api/orders', orderRouter);

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
