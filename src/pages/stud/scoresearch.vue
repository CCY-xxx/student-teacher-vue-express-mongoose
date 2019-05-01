<template>
    <div>
      <div class="contain">

        <div>个人成绩</div>
        <table>



          <tbody>

          <th>数学</th>
          <th>语文</th>
          <th>英语</th>
          <th>体育</th>
          <th>计算机</th>
          <tr v-for="(item,key) in scores" :key="key">
            <td >{{item.Math}}</td>
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
      </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              scores: [
                {
                  Math:0,
                  Chinese:0,
                  English:0,
                  sport:0,
                  Computer:0
                }
              ],
              stuid:''
            }
        },
      mounted(){
        this.stuid=JSON.parse(localStorage.getItem('dadd'));
          this.getstuscore();

      },
        methods: {
          getstuscore(){
            this.$http.post('/students/list/score',{name:this.stuid})
              .then((res)=>{
                console.log(res.data);
                this.scores=res.data.result.list.score
              })
          },
          // getstuscoreId(){
          //   this.$http.get('/stus/all')
          //     .then((res)=>{
          //       console.log(res.data);
          //     })
          // }
        },
        computed: {
          totalnum(){
            return parseInt(this.scores[0].Chinese)+parseInt(this.scores[0].Math)+parseInt(this.scores[0].English)+
              parseInt(this.scores[0].Chinese) +parseInt(this.scores[0].sport)+parseInt(this.scores[0].Computer)
          },
          ava(){
            return parseInt(this.totalnum)/5
          }
        },
        components: {}
    }
</script>
<style scoped>
  .contain{
    /*position: absolute;*/
    margin-left: 200px;

  }

  table{border-bottom:#cfe1f9 solid 4px;border-right:#cfe1f9 solid 1px;
    float: right;margin-right: 200px}
  table td, table th{border-top:#cfe1f9 solid 1px; border-left:#cfe1f9 solid 1px; padding:6px 25px; }
  /*th{background:#eef7fc url(../../static/Images/Student/banner.jpg) repeat-x; line-height:10px; color:#185697;}*/
  td a{color:#185697;}
</style>
