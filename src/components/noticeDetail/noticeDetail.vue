<template>
  <div class="noticeDetail-wrapper">
    <div class="title">{{title}}
      <span>{{time}}</span>
      <i @click="back"><返回</i>
    </div>
    <div class="content" v-html="content">
      
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageIndex:1,
        pageSize:20,
        pageTotal:null,
        baseurl:null,
        tableData:[],
        title:'',
        content:'',
        time:'',
      }
    },
    mounted(){
      this.getMessage();
    },
    methods: {
      getMessage(){
        this.axios.get(this.common.getApi() + '/web/api/message/getMessage',{
          params:{
            params:{
              id: Number(this.$route.query.id)       
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.title = res.data.obj.title;
            this.content = res.data.obj.content;
            this.time = res.data.obj.createTime;
          }
        })
      }, 
      back(){
        this.$router.push('/noticeList');
      }
    }    
  }      
</script>

<style>
  .noticeDetail-wrapper {
    width: 1180px;
    margin: 3px auto;
    padding: 0 80px;
    background: #FFF;
    min-height: 666px;
  }  
    
  .noticeDetail-wrapper .title {
    height: 99px;
    /*line-height: 99px;*/
    font-size: 18px;
    color: #343434;
    border-bottom: 1px solid #E6E6E6;
    font-weight: bold;
    margin-bottom: 17px;
    text-align: center;
    position: relative;
    padding-top: 30px;
    box-sizing: border-box;
    margin-right: 0;
  }  
  
  .noticeDetail-wrapper .title span{
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 12px;
    color: #9A9A9A;
  }
  
  .noticeDetail-wrapper .title i{
    position: absolute;
    top: 35px;
    right: 0;
    font-size: 14px;
    /*color: #9A9A9A;*/
    cursor: pointer;
  }
  
  .noticeDetail-wrapper .content{
    font-size: 14px;
  }
</style>