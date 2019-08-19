var express = require('express');
var router = express.Router();
var Students=require('../models/students')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index');
});
router.post('/register',(req,res) => {
  //这里的req.body 其实使用了body-parser中间件 用来对前端发送来的数据进行解析
  //查询数据库中name= req.body.name 的数据
  console.log('www')
  Students.find({stuid:req.body.stuid},(err,data) => {
    console.log('www')
    if(err){
      console.log('sssss')
      res.send({'status': 1002, 'message': '查询失败', 'data': err});
    }else{
      console.log('查询成功'+data)
      //data为返回的数据库中的有相同name的集合
      if(data.length > 0){
        res.send({'status': 1001, 'message': '该用户名已经注册！'});
      }else{
        let newName = new Students({
          proe:0,
          stuid: req.body.stuid,
          stupwd: req.body.stupwd,
          name: req.body.name,
          nameId:req.body.nameId,
          age: req.body.age,
          sex: req.body.sex,
          grade : req.body.grade,
          subject : req.body.subject,//model里的模型优先存储
          score:[
            {
              "scoreId":'',
            "Math":0,
            "English":0,
            "Chinese":0,
            "sport":0,
            "Computer":0
            }
        ]
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
router.post('/login',(req,res) => {
  Students.find({stuid: req.body.stuid, stupwd: req.body.stupwd},(err,data) => {
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
    Students.updateOne({stupwd:oldpwd},{
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
//查询全部学生信息接口
router.get('/list',(req,res,next)=>{
  Students.find((err,doc)=>{
    if(err){
      res.json({
        stutas:'1',
        msg:err.message
      })
    }else{
      res.json({
        stutas:'0',
        msg:'',
        result:{
          //向前端输出cookie ，proe判断身份，stuid学生id(须为学生登录时才会存在)
          cookie:req.cookies.proe,
          stuid:req.cookies.stuid,
          count:doc.length,//doc为学生数据，doc.length 为学生人数
          list:doc
        }
      })
    }
  })
})
//查询某一学生的分数
router.post('/list/score',(req,res,next)=>{
  let param={
    name:req.body.name
  }
  console.log(req.body.name);
  Students.findOne(param,(err,doc)=>{
    if(err){
      res.json({
        stutas:'1',
        msg:err.message
      })
    }else{
      console.log(doc);
      res.json({
        stutas:'0',
        msg:'',
        result:{
          cookie:req.cookies.proe,
          stuid:req.cookies.stuid,
          list:doc
        }
      })
    }
  })
})
//修改某一学生的分数
router.post('/list/editscore',(req,res,next)=>{

  var name = req.body.name,
    scoreId=req.body.scoreId,
    Math=req.body.Math,
    Chinese=req.body.Chinese,
    English=req.body.English,
    sport=req.body.sport,
    Computer=req.body.Computer;
  Students.findOne({"name":name},
    //   Math:Math,
    // Chinese:Chinese,
    //   English:English,
    // sport:sport,
    //   Computer:Computer
  (err,doc)=>{
    console.log("haha")
    console.log(doc);
    if(err){
      res.json({
        stutas:'1',
        msg:err.message
      })
    }else{
var scores=doc.score[0];//先是找到此学生的分数集，然后一一赋值
scores.Math=Math;
      scores.Chinese=Chinese;
      scores.English=English;
      scores.sport=sport;
      scores.Computer=Computer;
      // console.log(doc);
      doc.save(function (err1,doc1) {//插入到数据库
        if(err){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          });
        }else{
          res.json({
            status:'0',
            msg:'',
            result:''
          });
        }
      })
    }
  })
})

//搜索（重点要死记）
router.post('/list/search',(req,res)=>{//模糊查询 关键字查询
  let {keyword}=req.body;
  let reg=new RegExp(keyword);
  Students.find({$or:[{name:{$regex:reg}},{nameId:{$regex:reg}}]})
    .then((data)=>{
    console.log(data);
    res.send({err:0,msg:'select ok',data:data})
  })
    .catch((err=>{
      res.send({err:-1,msg:err._message,data:null})
    }))
})
//分页查询
router.get('/list/pagedec',(req,res,next)=>{
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let skip = (page-1)*pageSize;
  let params = {};
let studentsModel=Students.find(params).skip(skip).limit(pageSize);
  studentsModel.exec((err,doc)=>{
      if(err){
        res.json({
          stutas:'1',
          msg:err.message
        })
      }else{
        res.json({
          stutas:'0',
          msg:'',
          result:{
            cookie:req.cookies.name||req.cookies.stuid,
            count:doc.length,
            list:doc
          }
        })
      }
    })
})
//删除某一学生信息
router.post("/del",(req,res,next)=> {
  Students.deleteOne({
    nameId:req.body.nameId
  },(err,doc)=> {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      });
    }
  });
});
//修改某一学生信息
router.post("/edititem", function (req,res,next) {
  // var name = req.cookies.userId,
    var nameId = req.body.nameId,
    name= req.body.name,
    age = req.body.age,
    sex =req.body.sex,
      subject =req.body.subject,
      grade =req.body.grade;
  Students.updateOne({
    nameId:nameId
  },{
    name: req.body.name,
    age : req.body.age,
    sex :req.body.sex,
    subject :req.body.subject,
    grade :req.body.grade
  },(err,doc)=> {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
  res.json({
        status:'0',
        msg:'',
        result:'suc'
      });
    }
  });

});
//添加学生信息
  router.post('/additem',(req,res) => {
    //这里的req.body 其实使用了body-parser中间件 用来对前端发送来的数据进行解析
    //查询数据库中name= req.body.name 的数据
   Students.find({nameId: req.body.nameId},(err,data) => {
      if(err){
        res.send({'status': 1002, 'message': '查询失败', 'data': err});
      }else{
        console.log('查询成功'+data)
        //data为返回的数据库中的有相同name的集合
        if(data.length > 0){
          res.send({'status': 1001, 'message': '已存在！'});
        }else{

          let newStudent = new Students({
            nameId: req.body.nameId,
            name: req.body.name,
            age : req.body.age,
            sex :req.body.sex,
            score:[{
              Math:0,
              Chinese:0,
              English:0,
              sport:0,
              Computer:0
            }],
            subject :req.body.subject,
            grade :req.body.grade
          });
          //newName.save 往数据库中插入数据
          newStudent.save((err,data) => {
            if (err) {
              res.send({'status': 1002, 'message': '失败！', 'data': err});
            } else {
              res.json({status: 1000, message: '成功!',result:{cookie:req.cookies.name||req.cookies.stuid}});
            }
          });
        }
      }
    })
  })




  // Students.save(function (err1,doc) {
  //   if(err1){
  //     res.json({
  //       status:'1',
  //       msg:err1.message,
  //       result:''
  //     });
  //   }else{

  // })
  // }
  // })
// });

module.exports = router;


