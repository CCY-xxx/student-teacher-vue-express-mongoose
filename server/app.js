var createError = require('http-errors');//报错插件
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');//cookie插件
var logger = require('morgan');//日志插件
var ejs=require('ejs');//后台页面模板插件
var index = require('./routes/index');
var users = require('./routes/users');
var stus = require('./routes/stus');
var students=require('./routes/students')
var bodyParser=require('body-parser');//post提交插件
var app = express();

// view engine setup
app.set('views',path.join(__dirname,'views'));//ejs引擎
app.engine('.html',ejs.__express);//是后端可解析html
app.set('view engine','html');


app.use(logger('dev'));//使用日志
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());//使用cookie
app.use(express.static(path.join(__dirname, 'public')));//静态文件存放路径
app.use(bodyParser.json());//配置bodyparser
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function (req,res,next) {//登录拦截功能
  if(req.cookies.name||req.cookies.stuid){
    next();
  }else{
    console.log("url:"+req.originalUrl);
    if(req.originalUrl=='/users/login'||req.originalUrl=='/users/register'||req.originalUrl=='/stus/login'||req.originalUrl=='/stus/register'){
      next();
    }else{
      // next(
      //   res.send('/users/login')
      // )

      console.log("啊哈哈")

      res.json({
        status:'10001',
        msg:'当前未登录',
        result:''
      });


    }
  }
});
//一级路由
app.use('/', index);
app.use('/users', users);
app.use('/stus',stus);
app.use('/students', students);
//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('index');//渲染后端错误提示页面
});

module.exports = app;
