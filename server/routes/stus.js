
var express = require('express');
var router = express.Router();
var Stus=require('../models/stus')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource  users');
});

router.post('/register',(req,res) => {
  //这里的req.body 其实使用了body-parser中间件 用来对前端发送来的数据进行解析
  //查询数据库中name= req.body.name 的数据
  Stus.find({stuid:req.body.stuid},(err,data) => {
    if(err){
      res.send({'status': 1002, 'message': '查询失败', 'data': err});
    }else{
      console.log('查询成功'+data)
      //data为返回的数据库中的有相同name的集合
      if(data.length > 0){
        res.send({'status': 1001, 'message': '该用户名已经注册！'});
      }else{
        let newName = new Stus({
          proe:0,
          stuid : req.body.stuid,
          stupwd : req.body.stupwd//model里的模型优先存储
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
//退出登录
router.post('/logout',(req,res)=>{
  res.cookie('stuid',{
    path:'/',
    maxAge:-1
  })
  res.cookie('stupwd',{
    path:'/',
    maxAge:-1
  })
  res.clearCookie('proe')
  res.clearCookie('stuid')
  res.clearCookie('stupwd')//清空cookie数据

  res.json({
    status:'0',
    msg:'',
    result:''
  })
})
//登录接口
router.post('/login',(req,res) => {
  Stus.find({stuid: req.body.stuid, stupwd: req.body.stupwd},(err,data) => {
    if (err) {
      // res.send(err);
      res.send({'status': 1002, 'message': '查询数据库失败!', 'data': err});
    } else {

      console.log(data)
      if (data.length > 0) {
        res.clearCookie('proe')
        res.clearCookie('name')
        res.clearCookie('pwd')
        res.cookie("stuid",req.body.stuid,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("stupwd",req.body.stupwd,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("scoreId",req.body.scoreId,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("proe",0,{
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
router.post('/stuedit',(req,res)=>{

  let oldpwd=req.body.oldpwd;
  if(req.cookies.stupwd===oldpwd){

    res.cookie("stupwd",req.body.oldpwd,{
      path:'/',
      maxAge:-1
    });
    res.clearCookie('stupwd');
    res.cookie("stupwd",req.body.newpwd,{
      path:'/',
      maxAge:1000*60*60
    });
   Stus.updateOne({stupwd:oldpwd},{
      stupwd:req.body.newpwd
    },(err,doc)=>{
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
        res.json({
          cookie:req.cookies.stupwd,
          status:'0',
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
 stus.find((err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        stuid:data.stuid,
        scoreId:data.scoreId
      });
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

module.exports = router;
