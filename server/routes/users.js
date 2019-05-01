var models=require('../models/db')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource  users');
});
//教师注册
router.post('/register',(req,res) => {
  //这里的req.body 其实使用了body-parser中间件 用来对前端发送来的数据进行解析
  //查询数据库中name= req.body.name 的数据
  models.Login.find({name:req.body.name},//查询数据库中的name字段并与前段提交的数据匹配
    (err,data) => {
    if(err){
      res.send({'status': 1002, 'message': '查询失败', 'data': err});
    }else{
      console.log('查询成功'+data)
      //data为返回的数据库中的有相同name的集合
      if(data.length > 0){
        res.send({'status': 1001, 'message': '该用户名已经注册！'});
      }else{
        let newName = new models.Login({//向数据库添加数据
          proe:1,
          name : req.body.name,
          pwd : req.body.pwd
        });
        //newName.save 往数据库中插入数据
        newName.save((err,data) => {
          if (err) {
            res.send({'status': 1002, 'message': '注册失败！', 'data': err});
          } else {
            res.send({'status': 1000, 'message': '注册成功!'});
          }
        });
      }
    }
  })
})
//登录接口
router.post('/login',(req,res) => {
  models.Login.find({name: req.body.name, pwd: req.body.pwd},(err,data) => {//查询并匹配
    if (err) {
      // res.send(err);
      res.send({'status': 1002, 'message': '查询数据库失败!', 'data': err});
    } else {

      console.log(data)
      if (data.length > 0) {
        res.clearCookie('proe')
        res.clearCookie('stuid')
        res.clearCookie('stupwd')//清空cookie数据

        res.cookie("name",req.body.name,{//设置cookie
          path:'/',//当前路径存储cookie  默认为'/'
          maxAge:1000*60*60//设置cookie过期时间
        });
        res.cookie("pwd",req.body.pwd,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("proe",1,{//设置存储proe 为1时显示为教师登录 为0时显示为学生登录
          path:'/',
          maxAge:1000*60*60
        });
        res.send({'status': 1000, 'message': '登录成功!', 'data': data});
      } else {
        res.send({'status': 1001, 'message': '登录失败，该用户没有注册!', 'data': err});
      }
    }
  })
})
//安全退出登录
router.post('/loginout',(req,res)=>{
  res.cookie('name',{
    path:'/',
    maxAge:-1//设置过期时间为-1  即清除此cookie
  })
  res.cookie('pwd',{
    path:'/',
    maxAge:-1//设置过期时间为-1  即清除此cookie
  })
  res.clearCookie('proe')
  res.clearCookie('name')
  res.clearCookie('pwd')
  res.json({//以json格式输出给前端 内容可以任意设置 前端可以res.data接收
    status:'0',
    msg:'',
    result:''
  })
})
//修改密码接口
router.post('/edit',(req,res)=>{
  let oldpwd=req.body.pwd;//接收前台提交数据
  if(req.cookies.pwd==oldpwd){//老密码验证
    res.cookie("pwd",req.body.oldpwd,{
      path:'/',
      maxAge:-1//清除老密码
    });
    res.cookie("pwd",req.body.newpwd,{
      path:'/',
      maxAge:1000*60*60//设置新密码
    });
    //updateOne更新一条数据 第一个{数据库字段：前端提交数据}（匹配）  第二个{数据库字段：前端提交数据}（赋值）
    //更新密码
    models.Login.updateOne({pwd:oldpwd},{
      pwd:req.body.newpwd//将前端提交数据赋给数据库字段
    },(err,doc)=>{
      if(err){
        res.json({//以json格式输出给前端 内容可以任意设置 前端可以res.data接收
          status:'1',//一般以1状态码表示为失败
          msg:err.message,
          result:''
        });
      }else{
        console.log("hhhh");
        res.json({
          cookie:req.cookies.pwd,
          status:'0',//一般以0状态码表示为成功
          msg:'',
          result:'suc'
        });
      }
    });
  }
})
//获取所有账号的接口
router.get('/all',(req,res) => {
  // 通过模型去查找数据库
  models.Login.find((err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
//删除账号接口
router.post('/delete',(req,res) => {
  // 通过模型去查找数据库
  models.Login.remove({name: req.body.name},(err,data) => {
    // if (err) {
    //     res.send(err);
    // } else {
    //   res.send({'status': 1003, 'message': '删除成功!', 'data': data});
    // }
  });
  models.Login.find((err,data) => {
    if (err) {
      console.log(err)
    } else {
      res.send({'status': 1000, 'message': '更新成功！', 'data': data});
    }
  });
});

module.exports = router;//导出router
