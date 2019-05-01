<template>
  <div class="login">
    <h1 style="text-align: center;font-weight: bold;padding-top: 100px;">教师登录</h1>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label"> 用户名：</label>
        <div class="col-sm-5 center">
          <input type="text" class="form-control" id="inputEmail3" placeholder="用户名" v-model="name">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">密码：</label>
        <div class="col-sm-5">
          <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="pwd">
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
          <button class="btn btn-default" @click="register">注册</button>
        </div>
      </div>
    </form>
    <!--<form style="margin: 100px; background: yellow;text-align: center">-->
      <!--{{msg}}-->
      <!--<div class="user">-->
        <!--用户名：-->
        <!--<input type="text" v-model="name">-->
      <!--</div>-->
      <!--<div class="pwd">-->
        <!--密码：-->
        <!--<input type="text" v-model="pwd">-->
      <!--</div>-->
      <!--<button class="btn btn-primary btn-large"  @click="login">登录</button>-->
      <!--<button class="btn btn-primary" @click="register">注册</button>-->
    <!--</form>-->

    <!--<button @click="getAll">获得所有用户</button>-->
    <!--<div v-show="showID">-->
      <!--<p>用户id：{{nameId}}</p>-->
    <!--</div>-->
    <!--<div v-show="showAll">-->
      <!--<p v-for="item in array">{{item.name}}的ID: {{item._id}} <button @click="deleteone(item.name)">删除该账号</button></p>-->
    <!--</div>-->
    <Modal :mdShow="modalConfirm" style="background: red">
      <p slot="message" style="font-size: 30px;font-weight: bold">请选择登录方式</p>
      <p slot="btnGroup" >
        <button style="border: 2px solid blue" class="btn btn-success"  @click="modalConfirm = false">教师登录</button>
        <router-link style="border: 2px solid blue" tag="input" class="btn btn-success"  href="javascript:;" @click="modalConfirm = false" to="/stus" value="学生登录"></router-link>
      </p>
    </Modal>
  </div>
</template>
<script>
  import Modal from '../components/Modal'
  import Login from '../components/login'
  export default {
    name: "login",
    data(){
      return{
        modalConfirm:true,
        msg: "教师登录",
        name: '',
        pwd: '',
        nameId: "",
      }
    },
    methods:{
      closeModal(){
        this.modalConfirm = false;
      },
      login(){
        let params = {
          name: this.name,
          pwd: this.pwd
        }
        this.$http.post('/users/login',params).then((res)=>{
          console.log(res)
          if(res.data.status === 1000){
            this.showID = true
            this.nameId = res.data.data[0]._id
            alert('登陆成功');
            this.$router.push('/students')
          }else{
            alert(res.data.message)
          }
        }).catch((err)=>{
          console.log(err.toString())
        })
      },
      register(){
        let params = {
          name: this.name,
          pwd: this.pwd
        }
        this.$http.post('/users/register',params).then((res)=>{
          console.log(res)
          if(res.data.status === 1000){
            alert(res.data.message)
          }else{
            alert(res.data.message)
          }
        }).catch((err)=>{
          console.log(err.toString())
        })
      },
    },
 components:{
      Modal,Login
 }
  }
</script>
<style scoped>
  .btn:hover{
    background: #F4D400;
  }
  .btn:active{
    background: green;
  }
  .login{
    width: 100%;
    height: 600px;
    background: url("../assets/03.jpg") no-repeat 0 0;
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
  .login .form-horizontal .form-group{
    /*margin-left: 300px;*/
    /*margin-top: 300px;*/
    /*padding-top: 300px;*/
  }
</style>
