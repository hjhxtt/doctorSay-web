<template>
  <div class="investgationQA-wrapper">
    <div class="title">相关问题</div>
    <div class="question-wrapper">
      <el-collapse>
        <el-collapse-item :name="index" v-for="(item,index) in tableData">
          <template slot="title">
            <div class="question-title">{{item.questionName}}</div>
          </template>
          <div style="margin-bottom: 20px;padding-left: 12px;" v-html="item.questionExplain"></div>
          <!--<div style="padding-left: 12px;">积分有效期：会员1年内未登陆医生说网站，系统将自动清除积分。</div>-->
        </el-collapse-item>
      </el-collapse>
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
      }
    },
    mounted(){
      this.getQuestionList();
    },
    methods: {
      getQuestionList(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/web/api/question/getQuestionList',{
          params:{
            params:{
            }
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
    }    
  }      
</script>

<style>
  .investgationQA-wrapper{
    padding: 0 80px;
    background: #FFF; 
    min-height: 666px;
  }  
  
  .investgationService .investgationService-wrapper .el-main {
    padding: 0;
    padding-left: 20px;
  }
  
  .investgationQA-wrapper .title{
    height: 99px;
    line-height: 99px;
    font-size: 18px;
    color: #343434;
    border-bottom: 1px solid #E6E6E6;
    font-weight: bold;
    margin-bottom: 17px;
  }
  
  .investgationQA-wrapper .question-title{
    height: 54px;
    line-height: 54px;
    border-bottom: 1px dashed #E5E5E5;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
  
  .investgationQA-wrapper .el-collapse{
    margin-top: 0;  
    border-top: 0;
  }
  
  .investgationQA-wrapper .el-collapse-item.is-active>div:nth-child(1) div{
    border-bottom: 1px dashed #E5E5E5;
    
  }
  
  .investgationQA-wrapper .el-collapse-item>div:nth-child(1) div{
    font-size: 14px;
    color: #333;
    font-weight: bold;
    height: 54px;
    line-height: 54px;
  }
  
  .investgationQA-wrapper .el-collapse-item__content{
    padding-bottom: 0;
    padding: 17px 0;
    color: #666;
    font-size: 14px;
    line-height: 20px;
  }
  
  .investgationQA-wrapper .el-collapse-item{
    padding-left: 20px;
    background: url(../../assets/icon_location.png) no-repeat 0 20px;
  }
</style>