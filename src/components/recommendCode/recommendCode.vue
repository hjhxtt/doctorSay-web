<template>
  <div class="investgationQA-wrapper">
    <div class="title">推荐码说明</div>
    <div class="question-wrapper">
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <div class="question-title">诚挚邀请</div>
          </template>
          <div style="margin-bottom: 20px;padding-left: 12px;">
            医生说为英德知市场咨询（上海）有限公司所有的线上医学调查网站。我们的服务范围超过 100 个国家，提供市场动态与消费者态度与行为的市场调查与分析服务。 <br>
            在中国，我们收集并分析消费者购物的行为已超过 8年。从 05年成立至今我们已携手全球诸多知名药械公司开展 了大量医学市场调查，调研涉及疾病诊治、医疗器械使用需求及改进、 医药品牌满 意度、 医生职业满意度、 跨国药企学术营销、医学再教育情况等几大方面。 
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div class="question-title">招募对象</div>
          </template>
          <div style="margin-bottom: 20px;padding-left: 12px;">
            二级及以上医院的临床科室，城市职称不限 
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div class="question-title">可获得的奖励</div>
          </template>
          <div class="getRecord" style="margin-bottom: 20px;">
            <div class="reward_box">
              <p>你的推荐码：<span>LAMZD</span>或<span>15021535960</span></p>
              <div class="tow_box">
                <div class="reward_box_main">
                  <div class="reward_head">
                    <i>//</i><span>注册奖</span><i>//</i>
                  </div>
                  <div class="reward_body">
                    <div class="reward_setp">
                      每推荐一名医生或同行注册医生说
                    </div>
                    <img src="../../assets/arrow_green.png" alt="">
                    <div class="reward_setp">
                      通过医师验证后
                    </div>
                    <img src="../../assets/arrow_green.png" alt="">
                    <div class="reward_setp">
                      获得 <span>30</span>积分（推荐数没有上限）
                    </div>
                    <div class="reward_foot">
                    <div class="foot_left">
                      审核时效性：
                    </div>
                    <div class="foot_right">
                        <span>上传执业证书5个工作日</span>
                        <span>电话审核2周</span>
                      </div>
                    </div>
                  </div>
                  

                </div>
                <div class="reward_box_main box_blue">
                  <div class="reward_head">
                    <i>//</i><span>提成奖</span><i>//</i>
                  </div>
                  <div class="reward_body">
                    <div class="reward_setp">
                      您推荐的医生或同行审核通过后
                    </div>
                    <img src="../../assets/arrow_blue.png" alt="">
                    <div class="reward_setp">
                      每完成1次调查
                    </div>
                    <img src="../../assets/arrow_blue.png" alt="">
                    <div class="reward_setp">
                      获得 <span>10</span>积分
                    </div>
                    <div class="reward_foot">
                      <p>不影响其他的奖励，是额外给您的激励</p>
                    </div>
                  </div>
                  

                </div>
              </div>
            </div> 
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div class="question-title">邀请方法</div>
          </template>
          <div style="margin-bottom: 20px;">
            <div class="reward_box">
              <p>你的推荐码：<span>LAMZD</span>或<span>15021535960</span></p>
              <span>将推荐码告诉您的同事，让他在注册的时候输入您给到的推荐码，完善资料，通过手机验证后即可成功注册。</span>
              <span>1-2周后，只有当他通过医师认证审核，您的账户将会立即增加<i>30</i>元积分</span>
            </div>
           
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div class="question-title">注意事项</div>
          </template>
          <div style="margin-bottom: 20px;">
            <div class="reward_box">
             <span>请不要在非医学网站、非医学QQ群或任何非医学相关途径宣传推广医生说网站调查可以获得奖励，一经发现我们将严重警告，如不进行删除者，医生说有权取消您在医生说会员和在医生说获得奖励的资格。</span>
             <span>任何非正常手段邀请非医生获取奖励的用户，将视为作弊，所获奖励将被清空以及取消医生说会员资格。</span>
             <span>如果自己注册小号，或帮助朋友参与有奖调查，你将被系统警告或冻结。</span>
             <span>如果朋友违规被冻结或清除积分，他将被取消奖励资格，系统将自动帮你断开与他/她的邀请关系。</span>
             <span>如果朋友是因为调查严重作弊被处罚，那么他带给你的所有奖励会被扣除。</span>
             <span>如果你因为违规被系统冻结，冻结期间将不能收到任何朋友带给你的奖励。</span>
             <span>如果邀请的医生一年内收到邀请但未登录医生说网站，系统将自动帮你断开与他/她的朋友关系。</span>
            </div>
          </div>
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
    padding: 0 70px;
    background: #FFF; 
    min-height: 666px;
    padding-bottom: 80px;
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
  .getRecord{

  }
  .reward_box{

  }
  .reward_box p{
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
    
  }
  .reward_box p span{
    color: #13B5BB;
    font-size: 18px;
    margin: 0 8px;
    
  }
  .reward_box_main{
    width: 100%;
  }
  .tow_box{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .tow_box .reward_box_main{
    width: 330px;
    border: 2px solid #13B5BB;
  }
  .tow_box .reward_box_main .reward_head{
    width: 100%;
    height: 64px;
    text-align: center;
    line-height: 64px;
    color: #fff;
    font-size: 18px;
    background: #13B5BB;

  }
  .reward_head span{
    margin: 0 20px;
  }
    .reward_head i{
    font-weight: 700;
    font-size: 16px;
  }
    .reward_body{
      padding: 30px 25px;
      text-align: center;
    }
    .reward_body img{
      margin: 10px 0;
    }
    .tow_box .reward_box_main .reward_setp{
      width: 280px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border: 2px solid #13B5BB;
      border-radius: 32px;
      font-size: 14px;
      color: #333;
    }
    .reward_foot{
      width: 100%;
      margin-top: 24px;
      border-top: 1px solid #E6E6E6;
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
    }
    .foot_left{
      width: 85px;
      font-size: 14px;
      color: #333;
      text-align: left;
    }
    .foot_right{
       width: 160px;
      font-size: 14px;
      color: #666666;
      text-align: left;
    }
    .foot_right span{
       display: inline-block;
       margin-bottom: 10px;
       position: relative;
    }
    .foot_right span::before{
      content: '';
      display: block;
      position: absolute;
      left: -15px;
      top:10px;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background: #999;
    }

  .tow_box .reward_box_main.box_blue{
    width: 330px;
    border: 2px solid #2D95D5;
  }
  .tow_box .reward_box_main.box_blue .reward_head{
    width: 100%;
    height: 64px;
    text-align: center;
    line-height: 64px;
    color: #fff;
    font-size: 18px;
    background: #2D95D5;

  }
  .tow_box .reward_box_main.box_blue .reward_setp{
      width: 280px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border: 2px solid #2D95D5;
      border-radius: 32px;
      font-size: 14px;
      color: #333;
    }
    .reward_foot p{
      width: 100%;
      text-align: center;
    }
    .reward_box>span{
      font-size: 14px;
      color: #666;
      display: block;
      margin-bottom: 12px;
      padding-left: 20px;
      position: relative;
    }
    .reward_box>span::before{
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top:8px;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background: #999;
    }
    .reward_box>span i{
      color: #13B5BB;
      font-weight: 700;
    }
  
</style>