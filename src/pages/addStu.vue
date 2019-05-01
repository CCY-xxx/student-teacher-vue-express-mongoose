<template>
  <div>
    <NavBread>添加学生</NavBread>
    <div class="adda">
    <div>
      <div><label>姓名：</label><input type="text" v-model="name"></div>

      <div>  <label>学号：</label><input type="text"  v-model="nameId"></div>
      <div> <label>年龄：</label><input type="text"  v-model="age"></div>
      <div>
        <label>性别：{{sex}}</label>
      <br>
        男：<input type="radio" name="sex" value="男" v-model="sex" @click="sex='男'">
        女：<input type="radio" name="sex" value="女" v-model="sex" @click="sex='女'">
      </div>
      <div> <label>专业：</label><input type="text"  v-model="subject"></div>
      <div><label>年级：</label><input type="text"  v-model="grade"></div>
      <button @click="editS" style="">确认</button>
    </div>

    </div>

  </div>

</template>
<script>
  import NavBread from '../components/NavBread'
    export default {
        data() {
            return {
              name:'',
              nameId:'',
              age:'',
              sex:'',
              subject:'',
              grade:''
            }
        },
      mounted(){

      },
        methods: {
          editS(){
              this.$http.post("/students/additem",{
                name:this.name,
                nameId:this.nameId,
                age:this.age,
                // score:this.score,
                sex:this.sex,
                grade:this.grade,
                subject:this.subject,
              }).then((resp)=>{

                if(resp.data.result.cookie){
                  let res=resp.data;
                  console.log(res);
                  alert("添加成功");
                }else{
                  alert("请登录")
                  this.$router.push('/');
                }


              })

          }
        },
        computed: {},
        components: {NavBread}
    }
</script>
<style scoped>
.adda{
  margin: auto;
  display: flex;
  /*height: 45px;*/
  /*line-height: 45px;*/
  /*background-color: #f0f0f0;*/
}
  .adda>div{
    width: 60%;
    margin: auto;
  }
.adda>div>div{
  margin-top: 30px;
}
</style>
