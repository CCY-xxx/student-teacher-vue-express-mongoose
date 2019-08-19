<template>
  <div class="login">
    <h1 style="text-align: center;font-weight: bold;padding-top: 100px;">学生登录</h1>
    <form class="form-horizontal" v-if="!isShow">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label"> 用户名：</label>
        <div class="col-sm-5 center">
          <input type="text" class="form-control"  placeholder="用户名" v-model="stuid">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">密码：</label>
        <div class="col-sm-5">
          <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="stupwd">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <div class="checkbox">
            <label>
              <input type="checkbox"> 记住密码
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-primary"  @click="login">登录</button>
          <button class="btn btn-default" @click="toggle">注册</button>
        
        </div>
      </div>
    </form>

     <form class="form-horizontal" v-if="isShow"  style="marginLeft:300px">
      <div class="form-group floa col-sm-6">
        <label  class="col-sm-4 control-label"> 用户名：</label>
        <div class="col-sm-5 center">
          <input type="text" class="form-control"  placeholder="用户名" v-model="stuid">
        </div>
      </div>
      <div class="form-group floa col-sm-6">
        <label  class="col-sm-2 control-label">密码：</label>
        <div class="col-sm-5 center">
          <input type="password" class="form-control"  placeholder="密码" v-model="stupwd">
        </div>
      </div>
       <div class="form-group floa col-sm-6">
        <label  class="col-sm-2 control-label"> 姓名：</label>
        <div class="col-sm-5 center">
          <input type="text" class="form-control"  placeholder="姓名" v-model="name">
        </div>
      </div>
       <div class="form-group floa col-sm-6">
        <label  class="col-sm-2 control-label"> 学号：</label>
        <div class="col-sm-5 center">
          <input type="text" class="form-control"  placeholder="学号" v-model="nameId">
        </div>
      </div>
       <div class="form-group floa col-sm-6">
        <label  class="col-sm-2 control-label"> 性别：</label>
        <div class="col-sm-5 center">
          <input type="text" class="form-control"  placeholder="性别" v-model="sex">
        </div>
      </div>
       <div class="form-group floa col-sm-6">
        <label  class="col-sm-2 control-label"> 年龄：</label>
        <div class="col-sm-5 center">
          <input type="text" class="form-control"  placeholder="年龄" v-model="age">
        </div>
      </div>
       <div class="form-group floa col-sm-6">
        <label  class="col-sm-2 control-label"> 年级：</label>
        <div class="col-sm-5 center">
          <input type="text" class="form-control"  placeholder="年级" v-model="grade">
        </div>
      </div>
       <div class="form-group floa col-sm-6">
        <label  class="col-sm-2 control-label"> 专业：</label>
        <div class="col-sm-5 center">
          <input type="text" class="form-control"  placeholder="专业" v-model="subject">
        </div>
      </div>
      <div class="form-group floa">
        <div >
          <div class="checkbox">
            <label style="marginLeft:80px">
              <input type="checkbox"> 记住密码
            </label>
             <button style="marginLeft:180px" class="btn btn-danger" @click="register">确认提交</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  import Modal from '../../components/Modal'
  export default {
    name: "stulogin",
    data(){
      return{
        isShow:false,
        stuid: '',
        stupwd: '',
        name:'',
        nameId:'',
        age:'',
        sex:'',
        grade:'',
        subject:''
      }
    },
    methods: {

      login() {
        let params = {
          stuid: this.stuid,
          stupwd: this.stupwd
        }
        this.$http.post('/students/login', params).then((res) => {
          console.log("haha")
          console.log(res)
          if (res.data.status == 1000) {
            alert('登陆成功');
            this.$store.state.nickName=this.stuid
            this.$router.push('/permessage')
          } else {
            alert(res.data.message)
          }
        }).catch((err) => {
          console.log(err.toString())
        })
      },
      toggle(){
  this.isShow=!this.isShow
      },
      register() {
      
        let params = {
          stuid: this.stuid,
          stupwd: this.stupwd,
          name: this.name,
          nameId:this.nameId,
          age: this.age,
          sex: this.sex,
          grade : this.grade,
          subject : this.subject
        }
        this.$http.post('/students/register', params).then((res) => {
          console.log(res)
          if (res.data.status == 1000) {
            alert(res.data.message)
          } else {
            alert(res.data.message)
          }
        }).catch((err) => {
          console.log(err.toString())
        })
      },

    },
    components:{
      Modal
    }
  }
</script>
<style>
  .btn:hover{
    background: #F4D400;
  }
  .btn:active{
    background: green;
  }
  .login{
    width: 100%;
    height: 660px;
    background: url("../../assets/03.jpg") no-repeat 0 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .login .form-horizontal{
    margin-left: 500px;
    /*margin-top: 300px;*/
    padding-top: 50px;
    color: yellow;
    font-weight: bold;
  }
  .floa{
    float:left
  }
  .login .form-horizontal .form-group{
    /*margin-left: 300px;*/
    /*margin-top: 300px;*/
    /*padding-top: 300px;*/
  }
</style>
