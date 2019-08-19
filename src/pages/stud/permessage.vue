<template>
  <div>
    <stuNavBread>个人信息</stuNavBread>
    <div class="contain">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="right">姓名：</td>
          <td>{{list.name}}&nbsp;</td>
          <td align="right">身份证号码：</td>
          <td>430181198612113330&nbsp;</td>

          <td rowspan="9"><div align="center"><img id="pic_face"  height="160" width="120" src="../../../static/Images/Student/photo.jpg"></div>&nbsp;</td>
        </tr>
        <tr>
          <td align="right">性别：</td>
          <td>{{list.sex}}&nbsp;</td>
          <td align="right">考籍号：</td>
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
  </div>

</template>
<script>
  import stuNavBread from '../../components/stuNavBread'
  export default {
    data() {
      return {
        list:{},
        stuid:'',
        flag:false,
        checkAll:[],
        // fag:false
      }
    },
    mounted(){
      this.init();
      // this.stuid=JSON.parse(localStorage.getItem('dadd'));
        console.log(decodeURI(document.cookie.split(';')[1].split('=')[1]))
      // this.stuid=document.cookie.split(';')[1].split('=')[1]
    },
    methods: {
      init(){
        // this.stuid=JSON.parse(localStorage.getItem('dadd'));
        this.stuid=decodeURI(document.cookie.split(';')[1].split('=')[1])
            this.$http.post('/students/list/score',{name:this.stuid})
              .then((res)=>{
                // console.log(res.data.result.stuid);
                // this.stuid=res.data.result.stuid;
                console.log("hehe")
                console.log(res.data);
                this.list=res.data.result.list;
              })
          // console.log(res.data.result.list)
          // console.log(res.data.result.cookie);
      },
        // getstuscoreId(){
        //   this.$http.get('/stus/all')
        //     .then((res)=>{
        //       console.log(res.data);
        //     })
        // },

      // toggleCheckAll(){
      //   if(!this.fag){
      //     this.fag=true;
      //
      //     for(var i=0;i<this.lists.length;i++){
      //       this.checkAll.push(this.lists[i].nameId);
      //     }
      //   }else{
      //     this.fag=false;
      //     this.checkAll=[];
      //   }
      //   console.log(this.checkAll);
      //
      // },

      // check(index,nameId){
      //   // for(var i=0;i<this.lists.length;i++){
      //   if(!this.$refs.inpu[index].checked){
      //     this.checkAll.pop(nameId)
      //   }else{
      //     this.checkAll.push(nameId)
      //   }
        // }
      //   this.$refs.all.checked=this.fag;
      //   console.log(this.checkAll)
      //   return;
      // },
      // editItem(item){
      //   this.$http.post("/students/edititem",{
      //     name:item.name,
      //     nameId:item.nameId,
      //     age:item.age,
      //     sex:item.sex,
      //     grade:item.grade,
      //     subject:item.subject,
      //   }).then((resp)=>{
      //     let res=resp.data;
      //     console.log(res);
      //     alert("修改成功")
      //     this.init();
      //   })
      // }
    },
    computed: {
      // fag(){
      //   return this.checkAll.length==this.lists.length;
      // }

    },
    components: {stuNavBread}
  }
</script>
<style scoped>
  .contain{
    /*position: absolute;*/
    margin-left: 200px;

  }

  table{border-bottom:#cfe1f9 solid 4px;border-right:#cfe1f9 solid 1px;float: right;;}
  table td, table th{border-top:#cfe1f9 solid 1px; border-left:#cfe1f9 solid 1px; padding:6px 25px; }
  /*th{background:#eef7fc url(../../static/Images/Student/banner.jpg) repeat-x; line-height:10px; color:#185697;}*/
  td a{color:#185697;}
</style>
