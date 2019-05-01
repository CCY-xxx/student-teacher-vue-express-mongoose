<template>
<div class="main">
  <NavBread>学生信息</NavBread>
  <div class="contain">

    <div class="btn">
      <button class="edit" @click="flag=!flag">编辑</button>
      <input type="checkbox" ref="all" @click="toggleCheckAll" v-show="flag" class="all"><i v-show="flag">全选</i>
      <button class="del" @click="del">删除</button>
    </div>
<ul class="head">
  <li>姓名</li>
  <li style="margin-left: 30px;">年龄</li>
  <li style="margin-left: 20px;">学号</li>
  <li style="margin-left: 30px;">性别</li>
  <li>年级</li>
  <li style="margin-left: 30px;">专业</li>
</ul>
    <ul class="list" v-for="(item,index) in lists" :key="index">
      <li><input type="text" v-model="item.name"></li>
      <li><input type="text" v-model="item.age"  ></li>
      <li><input type="text" v-model="item.nameId" ></li>
      <li><input type="text" v-model="item.sex"></li>
      <li><input type="text" v-model="item.grade" ></li>
      <li><input type="text" v-model="item.subject" ></li>

      <input class="check" type="checkbox" :checked="fag" @click="check(index,item.nameId)" :value="item.nameId" v-show="flag" ref="inpu">
      <button tag="button" @click="editItem(item)">修改</button>
    </ul>
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

</div>

</template>
<script>
  import NavBread from '../components/NavBread'
    export default {
        data() {
            return {
              total:0,
                curId:1,
              appear:true,
              page:1,
              pageSize:3,
              lists:[],
              nameId:'',
              flag:false,
              name:'',
              checkAll:[],
              // fag:false
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
              this.page=this.total;
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
        del(){
          for(var i=0;i<this.checkAll.length;i++){
          this.$http.post("/students/del",{
            nameId:this.checkAll[i]
          }).then((response)=>{
            let res = response.data;
            if(res.status == '0'){
              this.init();
            }
          });
          }

        },
          toggleCheckAll(){
          if(!this.fag){
            this.fag=true;

            for(var i=0;i<this.lists.length;i++){
              this.checkAll.push(this.lists[i].nameId);
            }
          }else{
            this.fag=false;
            this.checkAll=[];
          }
          console.log(this.checkAll);

          },

          check(index,nameId){
          // for(var i=0;i<this.lists.length;i++){
            if(!this.$refs.inpu[index].checked){
                 this.checkAll.pop(nameId)
            }else{
              this.checkAll.push(nameId)
            }
          // }
            this.$refs.all.checked=this.fag;
            console.log(this.checkAll)
            return;
          },
          editItem(item){
          this.$http.post("/students/edititem",{
            name:item.name,
            nameId:item.nameId,
            age:item.age,
            sex:item.sex,
            grade:item.grade,
            subject:item.subject,
              }).then((resp)=>{
            let res=resp.data;
            console.log(res);
            alert("修改成功")
            this.init();
          })
          }
        },
        computed: {
          fag(){
            return this.checkAll.length==this.lists.length;
          },
        },
        components: {NavBread}
    }
</script>
<style scoped>
  .pagede{
    width: 600px;
    height: 60px;
    background: red;
    margin-left: 100px;
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

  .contain{
    border: 2px solid blue;
    margin-left: 155px;

    /*position:absolute;*/
    /*left: 100px;*/
    /*width: 70%;*/
    /*display: block;*/
  }
  .btn{
    padding-bottom: 30px;
    margin-bottom: 10px;
  }
  .head{
    /*border: 2px solid blue;*/
    /*margin-left: 300px;*/
    /*margin: 20px;*/
    background: burlywood;
    width:900px;
    display: flex;
  }
  .head li{
    text-align: center;
    /*background-color: #fff;*/
    list-style: none;
    /*border: 1px solid blue;*/
    margin-left: 10px;
    width: 100px;
    height: 20px;
    line-height: 20px;
  }
.list{
     /*border: 2px solid blue;*/
     /*margin-left: 300px;*/
     /*margin: 20px;*/
     width:500px;
     display: flex;
   }
  .list li{
    list-style: none;

    /*border: 1px solid blue;*/
    margin: 10px;
    width: 200px;
    height: 30px;
    line-height: 30px;
  }
  .list li input{
    text-align: center;
    width: 100px;
  }
  .all{
    width: 20px;
    height: 20px;
    margin-top: 10px;
  }
  .edit{
    width: 50px;
    display: inline-block;
    margin-left: 400px;
    margin-right: 20px;
  }
  .del{
    margin-top: 10px;
    /*float: right;*/
  }
</style>
