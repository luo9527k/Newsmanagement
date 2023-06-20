var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const JWT = require('./util/JWT');
const NewsRouter = require('./routes/admin/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


/* 
adminapi -后台系统用的

webapi -企业官网用的
*/

app.use((req,res,next) => {
      // 如果授权有效通过，就next()
        // 如果授权失效，就返回401错误
  if (req.url === "/adminapi/user/login") {
    next()
    return
  }

  const token = req.headers["authorization"].split(" ")[1]
  if (token) {
    var payload = JWT.verify(token)

    if (JWT.verify(token)) {
      const newToken = JWT.generate({
        _id: payload._id,
        username:payload.username
      },"3d")
      res.header("Authorization",newToken)
      next()

    } else {
      res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    }
  }
})

app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
