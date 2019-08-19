<template>
    <div>
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
          <td><input type="number" v-model="item.Math"></td>
          <td><input type="number" v-model="item.Chinese"  ></td>
          <td><input type="number" v-model="item.English" ></td>
          <td><input type="number" v-model="item.sport" ></td>
          <td><input type="number" v-model="item.Computer" ></td>
        </tr>
        <tr>
          <!--<p>{{totalnum}}</p>-->
          <td id="tt" colspan="5">总计：{{totalnum}}分，平均分：{{ava}}</td>
        </tr>
        </tbody>
      </table>
      <button @click="conformedit">确认修改</button>
    </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              sname:'',
              // scoreId:'',
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
        }
        },
      mounted(){
        this.sname=JSON.parse(localStorage.getItem('da'));
        this.init();
      },
        methods: {
          init(){
            this.$http.post('/students/list/score',{name:this.sname})
              .then((res)=>{
            this.scores=res.data.result.list.score;
            // this.scoreId=res.data.result.list.score[0].scoreId;
            // console.log( this.scoreId);
              })
          },
          conformedit(){
            this.$http.post('/students/list/editscore',{
              name:this.sname,
              // scoreId:this.scoreId,
              Math:this.scores[0].Math,
              Chinese:this.scores[0].Chinese,
              English:this.scores[0].English,
              sport:this.scores[0].sport,
              Computer:this.scores[0].Computer
            })
              .then((res)=>{
                alert("修改成功")
                // this.scores=res.data.result.list.score;
                console.log(res.data)
              })
          },
        },
        computed: {
          totalnum(){
            return parseInt(this.scores[0].Chinese)+parseInt(this.scores[0].Math)+parseInt(this.scores[0].English)+
            parseInt(this.scores[0].sport)+parseInt(this.scores[0].Computer)
          },
          ava(){
            return parseInt(this.totalnum)/5
          }
        },
        components: {}
    }
</script>
<style scoped>

</style>
