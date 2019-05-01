<template>
  <div class="login">
    <h1 style="text-align: center;font-weight: bold;padding-top: 100px;">学生登录</h1>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label"> 用户名：</label>
        <div class="col-sm-5 center">
          <input type="text" class="form-control" id="inputEmail3" placeholder="用户名" v-model="stuid">
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
          <button class="btn btn-default" @click="register">注册</button>
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
        stuid: '',
        stupwd: '',
        nameId: "",
      }
    },
    methods: {

      login() {
        let params = {
          stuid: this.stuid,
          stupwd: this.stupwd
        }
        this.$http.post('/stus/login', params).then((res) => {
          console.log("haha")
          console.log(res)
          if (res.data.status == 1000) {
            alert('登陆成功');
            this.$router.push('/permessage')
          } else {
            alert(res.data.message)
          }
        }).catch((err) => {
          console.log(err.toString())
        })
      },
      register() {
        let params = {
          stuid: this.stuid,
          stupwd: this.stupwd
        }
        this.$http.post('/stus/register', params).then((res) => {
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
    height: 600px;
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
  .login .form-horizontal .form-group{
    /*margin-left: 300px;*/
    /*margin-top: 300px;*/
    /*padding-top: 300px;*/
  }
</style>
