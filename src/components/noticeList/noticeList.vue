<template>
  <div class="noticeList-wrapper">
    <div class="title">
            全部公告
      <i @click="back"><返回首页</i>
    </div>
    <ul class="noticeList">
      <li v-for="item in tableData" @click="tonoticeDetail(item.id)">
        {{item.title}}
        <i class="el-collapse-item__arrow el-icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageIndex:1,
        pageSize:1,
        pageTotal:null,
        baseurl:null,
        tableData:[],
        toTitle:'',
        noticeId:null,
        toContent:'',
      }
    },
    mounted(){
      this.getMessageList(this.pageIndex,this.pageSize);
    },
    methods: {
      getMessageList(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/web/api/message/getMessageList',{
          params:{

          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.tableData = res.data.obj.list;
          }
        })
      }, 
      tonoticeDetail(id){
        this.$router.push({path:'/noticeDetail',query: {id: id}})
      },
      back(){
        this.$router.push('/index');
      }
    }    
  }      
</script>

<style>
  .noticeList-wrapper {
    width: 880px;
    margin: 3px auto;
    padding: 0 80px;
    background: #FFF;
    min-height: 666px;
  }  
    
  .noticeList-wrapper .title {
    height: 99px;
    line-height: 99px;
    font-size: 18px;
    color: #343434;
    border-bottom: 1px solid #E6E6E6;
    font-weight: bold;
    margin-bottom: 17px;
    position: relative;
  }  
  
  .noticeList-wrapper .title i{
    position: absolute;
    right: 0;
    font-size: 14px;
    cursor: pointer;
  }
  
  .noticeList li{
    font-size: 15px;
    color: #333;
    font-weight: bold;
    height: 74px;
    line-height: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    /*padding-top: 20px;*/
  }
  
  .noticeList-wrapper .noticeList span {
    font-size: 12px;
    color: #9A9A9A;
  }
</style>