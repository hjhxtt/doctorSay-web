<template>
  <div class="integrationQuestion-wrapper">
    <div class="title">常见问题</div>
    <div class="question-wrapper">
      <el-collapse>
        <el-collapse-item name="1">
          <template slot="title">
            <div class="question-title">兑换奖品要付快递费吗？<br><span>2019-01-03</span></div>
          </template>
          <div>不需要，快递费已经包含在您兑换的积分价格中。 </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="question-title">兑换实物奖品能指定款式和颜色吗？<br><span>2019-01-03</span></div>
          </template>
          <div>兑奖中心的实物奖品一般都会在介绍中标明颜色、尺寸和款式，您如果对奖品有其他要求，可以在兑奖时填写留言， 我们会尽量满足。但是由于奖品备货和库存具体情况更新不及时，不能保证按您的要求寄送，会视库存情况随机发 送，敬请谅解。</div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="question-title">什么原因导致兑奖失败？<br><span>2019-01-03</span></div>
          </template>
          <div class="headtitle"><i></i>我们的工作人员处理兑奖信息时，未能联系上您，导致无法核对兑奖信息。</div>
          <div class="headtitle"><i></i>您没有提供正确有效的邮寄地址。</div>
          <div class="headtitle"><i></i>您所在的地区比较偏远，快递无法送达。这种情况，我们会在与您协商之后，通过邮局寄货给您。</div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <div class="question-title">您必须至少参与过一次有奖调查才能兑换礼品。<br><span>2019-01-03</span></div>
          </template>
          <div>医生说调查网是中国最专业的医学调查网站，医生在兑换礼品前必须参与过至少一次调查。</div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <div class="question-title">实物礼品用什么快递发放，什么时候到？<br><span>2019-01-03</span></div>
          </template>
          <div>网站默认天天快递发放实物礼品，若不到达您的乡镇地址，天天快递会转其他可以到达的快递。按照审核流程，快 递一般在10日左右到达。 </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <div class="question-title">兑换的奖励为什么还没发放？<br><span>2019-01-03</span></div>
          </template>
          <div>当月兑换的现金和话费，一般在次月10日开始，按照订单兑换的时间顺序，依次发放，在月底前完成上月的发放工 作，遇节假日顺延。 </div>
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
      getQuestionList(){
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
  .integrationQuestion-wrapper{
    padding: 0 80px;
    background: #FFF; 
    min-height: 666px;
  }  
  
  .integrationQuestion-wrapper .el-main {
    padding: 0;
    padding-left: 20px;
  }
  
  .integrationQuestion-wrapper .title{
    height: 99px;
    line-height: 99px;
    font-size: 18px;
    color: #343434;
    border-bottom: 1px solid #E6E6E6;
    font-weight: bold;
    margin-bottom: 17px;
  }
  
  .integrationQuestion-wrapper .el-collapse{
    margin-top: 0;  
    border-top: 0;
  }
  
  .integrationQuestion-wrapper .el-collapse-item.is-active>div:nth-child(1) div{
    border-bottom: 1px dashed #E5E5E5;
    
  }
  
  .integrationQuestion-wrapper .el-collapse-item>div:nth-child(1) div{
    font-size: 14px;
    color: #333;
    font-weight: bold;
    height: 74px;
    line-height: 20px;
    
  }
  
  .integrationQuestion-wrapper .question-title{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .integrationQuestion-wrapper .el-collapse-item>div:nth-child(1) div span{
    font-size: 12px;
    color: #9A9A9A;
  }
  
  .integrationQuestion-wrapper .el-collapse-item__content{
    padding-bottom: 0;
    padding: 17px 0;
    color: #666;
    font-size: 14px;
    line-height: 20px;
  }  
  
  .integrationQuestion-wrapper .headtitle{
    color: #323232;
    font-size: 14px;
    /*font-weight: bold;*/
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  
  .integrationQuestion-wrapper .headtitle i{
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #989898;
    display: inline-block;
    margin-right: 8px;
  }
  
  .integrationQuestion-wrapper .el-collapse-item{
    padding-left: 20px;
    background: url(../../assets/icon_location.png) no-repeat 0 20px;
  }
  
  .integrationQuestion-wrapper .headtitle{
    font-weight: normal;
  }
</style>