<template>
    <div class="searc">
      <NavBread>查询信息</NavBread>
      <div class="searchbox" style="margin-left: 400px;padding: 10px;">
        <input class="" type="text" v-model="searchtext" placeholder="输入姓名\学号"><button @click="search">搜索</button>
      </div>
      <table>
       <tbody>

       <th>姓名</th>
       <th>学号</th>
       <th>年龄</th>
       <th>性别</th>
       <th>年级</th>
       <th>专业</th>
        <tr v-for="(item,key) in lists" :key="key" @click="jmp(item.name)">
        <td>{{item.name}}</td>
        <td>{{item.nameId}}</td>
        <td>{{item.age}}</td>
        <td>{{item.sex}}</td>
        <td>{{item.grade}}</td>
        <td>{{item.subject}}</td>
        </tr>

       </tbody>

      </table>
      <div class="pagede">
        <button @click="desc(-1)">上一页</button>
        <!--<p>...</p>-->
        <button v-for="(item,index) of total" @click="descw(index+1)"
                :class="{ddal:appear,active:index+1==curId}">{{item}}</button>
        <!--<button @click="descw(2)">2</button>-->
        <!--<button @click="descw(3)" :class="{ddal:appear,active:}">3</button>-->
        <!--<button @click="descw(4)" :class="{ddal:appear}">4</button>-->
        <!--<button @click="descw(5)" :class="{ddal:appear}">5</button>-->
        <!--<button @click="descw(6)" :class="{ddal:appear}">6</button>-->

        <button @click="appear=!appear">...</button>
        <button @click="desc(1)">下一页</button>
        <button>共{{total}}页</button>
      </div>
    </div>
</template>
<script>
  import NavBread from '../components/NavBread'
    export default {
        data() {
            return {
              searchtext:'',
              total:0,
              curId:1,
              appear:true,
              page:1,
              pageSize:10,
              lists:[]
            }
        },
      mounted(){
       this.init();
       this.gettotal();
      },
        methods: {
          init(){

            var param={
              page:this.page,
              pageSize:this.pageSize,
            }

            this.$http.get('/students/list/pagedec',{params:param}).then((res)=>{
              if(res.data.result.cookie){
                this.lists=res.data.result.list;
              }else{
                alert("请登录")
                this.$router.push('/');
              }
              // console.log(res.data.result.list)

              console.log(res.data.result.cookie);
            })

            // this.$http.get('/students/list').then(resp=>{
            //   this.lists=resp.data.result.list;
            //   console.log(this.lists);
            // })
          },
          jmp(name){
            localStorage.setItem('da', JSON.stringify(name))
          this.$store.state.Sname=name;
          this.$router.push('/score');
          },

          search(){
            this.$http.post("/students/list/search",{
              keyword:this.searchtext
            }).then((response)=>{
              let res = response.data;
            this.lists=res.data;
            });
          },
          gettotal(){
            this.$http.get('/students/list').then((res)=>{
              if(res.data.result.cookie){
                console.log(res.data.result.count)
                this.total=Math.floor(parseInt(res.data.result.count/this.pageSize)+1)
              }else{
                alert("请登录")
                this.$router.push('/');
              }
              // console.log(res.data.result.list)

              console.log(res.data.result.cookie);
            })

            // this.$http.get('/students/list').then(resp=>{
            //   this.lists=resp.data.result.list;
            //   console.log(this.lists);
            // })
          },
          desc(pagenum){
            this.page+=pagenum;
            this.curId=this.page;
            if(this.page>this.total){
              alert("已经是最后一页")
              this.page=this.total
              return;
            }
            if(this.page<1) {
              alert("已经是第一页了")
              this.page=1;
              return;
            }
            this.init();

          },
          descw(pagenum){
            this.curId=pagenum;
            this.page=pagenum;

            this.init();
          },
        },
        computed: {
          totalpage(){
            return Math.floor(this.lists.length/this.pageSize+1)
          }
        },
        components: {NavBread}
    }
</script>
<style scoped>
  .pagede{
    width: 600px;
    height: 60px;
    background: red;
    margin-left:200px;
    text-align: center;
  }
  .pagede .ddal{
    display: none;
  }
  .pagede .active{
    background:yellow;
  }
  .pagede button{
    /*float: left;*/
    margin: auto;
    /*display: flex;*/
  }

  .searc{
    background: pink;
  }
 table{border-bottom:#cfe1f9 solid 4px;border-right:#cfe1f9 solid 1px;
   margin-left: 200px;}
  table td, table th{border-top:#cfe1f9 solid 1px; border-left:#cfe1f9 solid 1px; padding:6px 25px; }
  th{background:#eef7fc url(../../static/Images/Student/banner.jpg) repeat-x; line-height:10px; color:#185697;}
  td a{color:#185697;}
   /*.xxleft{text-align:left;}*/
/*tbody{*/
  /*!*background: #00B7FF;*!*/
  /*width:100%;*/
/*}*/
/*tbody th{*/
  /*width: 50px;*/

  /*height:30px;*/
/*}*/
/*tbody tr{*/
  /*width: 50px;*/

  /*height:30px;*/
/*}*/
  /*tbody td{*/
    /*width: 50px;*/

    /*height:30px;*/
  /*}*/
</style>
