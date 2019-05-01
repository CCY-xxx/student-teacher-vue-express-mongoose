<template>
    <div>
      旧密码：<input type="text" v-model="oldpwd">
      新密码：<input type="text" v-model="newpwd">
      <button @click="conform">确认修改</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              oldpwd:'',
              newpwd:''
            }
        },
        methods: {
          conform(){
            this.$http.post('/users/edit',{pwd:this.oldpwd,newpwd:this.newpwd})
              .then((res)=>{
                if(res.data.cookie){
                  alert("修改成功")
                  alert("请重新登录")
                  this.$router.push('/');
                }else{
                  alert("请登录")
                  this.$router.push('/');
                }

                  // alert("请登录")
                  // this.$router.push('/');

              })
          }
        },
        computed: {},
        components: {}
    }
</script>
<style scoped>

</style>
