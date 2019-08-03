<template>
    <div>
      <div>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="right" width="80">姓名：</td>
            <td>{{list.name}}&nbsp;</td>
            <td align="right" width="100">身份证号码：</td>
            <td>43018119866663330&nbsp;</td>

            <td rowspan="9"><div align="center"><img id="pic_face"  height="160" width="120" src="../../static/Images/Student/photo.jpg"></div>&nbsp;</td>
          </tr>
          <tr>
            <td align="right">性别：</td>
            <td>{{list.sex}}&nbsp;</td>
            <td align="right">考生号：</td>
            <td>910513201419&nbsp;</td>
          </tr>
          <tr>
            <td align="right">年龄：</td>
            <td>{{list.age}}&nbsp;</td>
            <td align="right">专业：</td>
            <td>{{list.subject}}&nbsp;</td>
          </tr>
          <tr>
            <td align="right">学号：</td>
            <td>{{list.nameId}}&nbsp;</td>
            <td align="right">原专业：</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align="right">年级：</td>
            <td>{{list.grade}}&nbsp;</td>

            <td align="right">注册批次：</td>
            <td>2013秋&nbsp;</td>
          </tr>

          <tr>
            <td colspan="4" align="left">联系方式（如联系方式有变动请及时修改，以便能及时联系到你。谢谢！）</td>

          </tr>
          <tr>
            <td align="right">手机号码：</td>
            <td>15111141999</td>
            <td align="right"  width="200">第二联系号码：</td>
            <td></td>

          </tr>
          <tr>
            <td align="center">QQ:</td>
            <td></td>
            <td align="right">电子邮箱：</td>
            <td></td>

          </tr>
          <tr>
            <td align="right">联系地址：</td>
            <td colspan="4"></td>
          </tr>
          <tr align="center">
            <td colspan="5" height="40">
              <div align="center">

                <input type="button" id="button2" value="联系方式有修改" class="input2" />
              </div>
            </td>
          </tr>
        </table>
      </div>


<div class="scor">

  <label>成绩</label>
  <table>



    <tbody>

    <th>数学</th>
    <th>语文</th>
    <th>英语</th>
    <th>体育</th>
    <th>计算机</th>
    <tr v-for="(item,key) in scores" :key="key">
      <td>{{item.Math}}</td>
      <td>{{item.Chinese}}</td>
      <td>{{item.English}}</td>
      <td>{{item.sport}}</td>
      <td>{{item.Computer}}</td>
    </tr>
    <tr>
      <!--<p>{{totalnum}}</p>-->
      <td id="tt" colspan="5">总计：{{totalnum}}分，平均分：{{ava}}</td>
    </tr>

    </tbody>

  </table>
  <router-link tag="button" style="margin-left:250px;margin-top:20px;width: 100px;" to="/editscore">修改成绩</router-link>
</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              // totalnum:0,
              scores:
                [
                  {
                    Math:0,
                    Chinese:0,
                    English:0,
                    sport:0,
                    Computer:0
                  }
                  ],
              list:{},
              sname:''
            }
        },
      mounted(){
        // this.$store.state.Sname=this.$route.params.name;
        this.sname=JSON.parse(localStorage.getItem('da'));
        this.getScore();
      },
        methods: {
            getScore(){
              // console.log(this.sname)
              this.$http.post('/students/list/score',{name:this.sname})
                .then((res)=>{
                  if(res.data.result.cookie){
                    console.log(res.data.result.cookie);
                    this.scores=res.data.result.list.score;

                    this.list=res.data.result.list;
                  }else{
                    alert("请登录")
                    this.$router.push('/');
                  }

                })
            },
          // editscore(){
          //     this.$http.post('/students/list/editscore',{name:this.sname})
          //       .then((res)=>{
          //
          //       })
          // }
        },
        computed: {
          totalnum(){
            return this.scores[0].Chinese+this.scores[0].Math+this.scores[0].English+
              this.scores[0].Chinese +this.scores[0].sport+this.scores[0].Computer;
          },
          ava(){
            return this.totalnum/5
          }
        },
        components: {}
    }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
.scor{
  margin-left: 200px;
}
  h3 {
    text-align: center;
  }

  table, tr, td, th {
    text-align: center;
    border: 1px solid gray;
    border-collapse: collapse;
  }

  table {
    width: 70%;
  }

  tr:nth-child(2n) {
    background-color: rgba(88, 73, 65, 0.18);
  }

  tr:hover {
    background-color: rgb(255, 235, 149);
  }

  #tt {
    text-align: right;
    padding-right: 20px;
  }




</style>
