var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var RightRouter = require("./routes/RightRouter")
var RoleRouter = require("./routes/RoleRouter")
var UserRouter = require("./routes/UserRouter")
var TagRouter = require("./routes/TagRouter")
var ClassRouter = require("./routes/ClassRouter")
var StudentRouter = require("./routes/StudentRouter")
var CompanyRouter = require("./routes/CompanyRouter")
var CompanyStudentRouter = require("./routes/CompanyStudentRouter")

const JWT = require("./util/JWT")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//后端路由拦截
// app.use((req, res, next) => {
//   if (req.url === "/adminapi/users/login") {
    
//     next()
//     return;
//   }
//   const token = req.headers["authorization"]?.split(" ")[1]
//   if (token) {
//     var payload = JWT.verify(token)
//     if (payload) {
//       const newToken = JWT.generate({
//         _id: payload._id,
//         username: payload.username
//       }, "1d")

//       res.header("Authorization", newToken)
//       next()
//     } else {
//       res.status(401).send({ errorCode: -1, errorInfo: "token过期" })
//     }
//   }else{
//     res.status(401).send({ errorCode: -2, errorInfo: "未授权" })
//   }
// })

app.use(RightRouter)
app.use(RoleRouter)
app.use(UserRouter)
app.use(TagRouter)
app.use(ClassRouter)
app.use(StudentRouter)
app.use(CompanyRouter)
app.use(CompanyStudentRouter)

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
