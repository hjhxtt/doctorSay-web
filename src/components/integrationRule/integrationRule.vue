<template>
  <div class="integrationRule-wrapper">
    <div class="title">兑换规则</div>
    <div class="question-wrapper">
      <el-collapse>
        <el-collapse-item :name="index" v-for="(item,index) in tableData">
          <template slot="title">
            <div class="question-title">{{item.ruleName}}<br><span>{{item.createTime}}</span></div>
          </template>
          <div style="margin-bottom: 20px;padding-left: 12px;" v-html="item.ruleExplain"></div>
          <!--<div style="padding-left: 12px;">积分有效期：会员1年内未登陆医生说网站，系统将自动清除积分。</div>-->
        </el-collapse-item>
        <!--<el-collapse-item name="1">
          <template slot="title">
            <div class="question-title">什么是医生说积分？<br><span>2019-01-03</span></div>
          </template>
          <div style="margin-bottom: 20px;padding-left: 12px;">积分，是医生说给予医生的奖励积分，可以用于兑换人民币现金、手机充值卡、医学论文、实物奖品。 </div>
          <div style="padding-left: 12px;">积分有效期：会员1年内未登陆医生说网站，系统将自动清除积分。</div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="question-title">如何获得医生说的积分？<br><span>2019-01-03</span></div>
          </template>
          <div>医生说，开展网上市场调查项目，并给予医生积分奖励，1医生说积分=1元人民币。 </div>
          <div style="margin-top:20px;margin-bottom: 20px;">医生获得积分奖励的途径有四个：注册并完善资料、参加医学调查、推荐医学同行加入和参加医生说活动。</div>
          <div class="headtitle"><i></i>注册基础奖励</div>
          <div style="margin-bottom: 30px;padding-left: 12px;">每一位新加入“医生说”的医生，在完善个人详细资料、并成功激活手机后，即可获得30点医生说积分的基础奖励。 但在未参加任何调查项目前，注册基础奖励不能用于兑换。</div>
          <div class="headtitle"><i></i>维护调查/学术调查完成奖励</div>
          <div style="margin-bottom: 30px;padding-left: 12px;">对于及时完成维护调查/学术调查的医生，我们将根据问卷时间的长短和难易程度给予奖励。奖励额度为1-30点医生说积分。</div>
          <div class="headtitle"><i></i>商业调查完成奖励</div>
          <div style="margin-bottom: 30px;padding-left: 12px;">对于及时完成商业调查的医生，我们将根据问卷时间的长短和难易程度给予奖励。奖励额度为50-1000点医生说积分。</div>
          <div class="headtitle"><i></i>有奖调查鼓励奖励</div>
          <div style="margin-bottom: 20px;padding-left: 12px;">对于及时参与有奖调查，但由于条件不符合，或所需人群已经收集满而无法完成调查问卷的会员，医生说网站将给与0-5点医生说积分的奖励。</div>
          <div style="margin-bottom: 30px;padding-left: 12px;">有奖调查鼓励奖励必须是医生点击参与了有奖调查问卷，因为不符合调查的条件或是该人群已经收集满，而没有完成主体问卷的情况下获得。有奖调查鼓励奖励与有奖调查完成奖励不可兼得。</div>
          <div class="headtitle"><i></i>推荐医学同行奖励</div>
          <div style="margin-bottom: 20px;padding-left: 12px;">医生说会员推荐医学同行加入“医生说”，被推荐的医生注册并成功激活手机并通过医生认证审核后，推荐人立即获得30点医生说积分的推荐奖励。</div>
          <div style="margin-bottom: 30px;padding-left: 12px;">推荐人和被推荐的医生永远捆绑，被推荐的医生每完成一份商业调查问卷，推荐人都将得到10点医生说积分的调查提成奖励。维护调查/学术调查没有调查提成奖励。</div>
          <div style="margin-bottom: 30px;">医生说会员推荐医生加入“医生说”不设上限，多多益善。</div>
        </el-collapse-item>-->
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
      this.getExchangeRuleList();
    },
    methods: {
      getExchangeRuleList(){
        this.axios.get(this.common.getApi() + '/web/api/rule/getExchangeRuleList',{
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
  .integrationRule-wrapper{
    padding: 0 80px;
    background: #FFF; 
    min-height: 666px;
  }  
  
  .integrationRule-wrapper .el-main {
    padding: 0;
    padding-left: 20px;
  }
  
  .integrationRule-wrapper .title{
    height: 99px;
    line-height: 99px;
    font-size: 18px;
    color: #343434;
    border-bottom: 1px solid #E6E6E6;
    font-weight: bold;
    margin-bottom: 17px;
  }
  
  .integrationRule-wrapper .el-collapse{
    margin-top: 0;  
    border-top: 0;
  }
  
  .integrationRule-wrapper .el-collapse-item.is-active>div:nth-child(1) div{
    border-bottom: 1px dashed #E5E5E5;
    
  }
  
  .integrationRule-wrapper .el-collapse-item>div:nth-child(1) div{
    font-size: 14px;
    color: #333;
    font-weight: bold;
    height: 74px;
    line-height: 20px;
  }
  
  .integrationRule-wrapper .question-title{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .integrationRule-wrapper .el-collapse-item>div:nth-child(1) div span{
    font-size: 12px;
    color: #9A9A9A;
  }
  
  .integrationRule-wrapper .el-collapse-item__content{
    padding-bottom: 0;
    padding: 17px 0;
    color: #666;
    font-size: 14px;
    line-height: 20px;
  }  
  
  .integrationRule-wrapper .headtitle{
    color: #323232;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  
  .integrationRule-wrapper .headtitle i{
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #989898;
    display: inline-block;
    margin-right: 8px;
  }
  
  .el-collapse-item{
    padding-left: 20px;
    background: url(../../assets/icon_location.png) no-repeat 0 20px;
  }
</style>