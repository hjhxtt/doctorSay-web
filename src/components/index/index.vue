<template>
  <div class="index">
    <div class="yss-homebanner">
      <el-carousel height="480px" indicator-position="none">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <h3 style="height: 100%;">
            <a v-if="item.skipUrl" :href="item.skipUrl"><img :src="baseurl+item.picUrl" alt="" height="100%"/></a>
            <img :src="baseurl+item.picUrl" alt="" height="100%"/>
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="service-type">
      <div class="yss-service">
        <div class="service-main">
          <div class="service-investigation">
            <div class="service-pic">
              <img src="../../assets/home_yd.png" alt="" />
            </div>
            <div class="service-info">
              <div>
                <div class="service-name">医调中心</div>
                <div class="service-detail">参与有奖调研，获得奖励</div>
                <i class="i_line"></i>
                <div class="invest">
                  有奖调查：<span>{{invNum}}</span>
                </div>
              </div>
              <div>
                <el-button class="btn-look" @click="toYd">立即查看</el-button>
              </div>
            </div>
          </div>
          <div class="service-integration">
            <div class="service-pic">
              <img src="../../assets/home_jf.png" alt="" />
            </div>
            <div class="service-info">
              <div>
                <div class="service-name">积分中心</div>
                <div class="service-detail">累计积分，兑换奖品</div>
                <i class="i_line"></i>
                <div class="invest">
                  当前积分：<span>{{memberIntegral}}</span>
                </div>
                <div class="service-detail" v-if="Boolean($store.state.recode)" style="margin-top:6px;cursor:pointer;" @click="$router.push('/recommendCode')">推荐码：<span style="color:#13B5BB">{{$store.state.recode}}</span> 或 <span style="color:#13B5BB">{{$store.state.phone}}</span><br/> <span style="text-decoration: underline;">推荐医生奖励积分</span></div>
              </div>
              <div>
                <el-button class="btn-look" @click="toJf">立即兑换</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="notice-wrapper">
      <div class="notic_main">
        <div class="notic_head">
          <div class="title">
            <p>公司公告</p>
            <span>Company Announcement</span>
          </div>
          <span class="more-notice" @click="tonoticeList">更多</span>
        </div>
        <div class="notic_body">
          <ul>
            <li v-for="item in tableData" @click="tonoticeDetail(item.id)" :key="item.id">
              <span>{{item.createTime}}</span>
              <h3>{{item.title}}</h3>
              <p class="main_news" v-html="item.content"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="intr-wrapper">
      <div class="yss-intr">
        <div class="intr_bg">
          <h1>公司介绍</h1>
          <span>ABOUT</span>
          <div class="intr-main">
            <div class="yss-txt">
              <p>医生说为英德知市场咨询（上海）有限公司所有的线上医学调查网站。我们的服务范围超过 100 个国家，提供市场动态与消费者态度与行为的市场调查与分析服务。</p>
              <p>在中国，我们收集并分析消费者购物的行为已超过 8年。从 05年成立至今我们已携手全球诸多知名药械公司开展 了大量医学市场调查，调研涉及疾病诊治、医疗器械使用需求及改进、 医药品牌满 意度、 医生职业满意度、 跨国药企学术营销、医学再教育情况等几大方面。</p>
              
            </div>
            <i></i>
          </div>
          <img src="../../assets/pic_home_gs.png" alt="">
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      width="30%">
      <span>您还未激活，请立即前往激活</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="$router.push('/phoneVerification')">立即激活</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%">
      <span>您还未完善资料，请立即前往完善</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="$router.push('/perfectInformation')">立即完善</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible3"
      width="30%">
      <span>你提交的审核未通过。请重新上传执业证书或者填写您所在医院的科室电话。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="$router.push('/verifyZyz')">重新提交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible4"
      width="30%">
      <span>您提交的资料正在审核中</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible4 = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        invNum:0,
        pageIndex:1,
        pageSize:20,
        pageTotal:null,
        baseurl:null,
        tableData:[],
        bannerList:[],
        baseurl: baseurl,
        lbheight:null,
        memberIntegral:0,
        dialogVisible1:false,
        dialogVisible2:false,
        dialogVisible3:false,
        dialogVisible4:false
      }
    },
    mounted(){
      this.getHomeMessageList();
      this.getBannerList();
      this.getMemberProjectList(1,100)
      this.getMemberInfo()
      this.checkMemberState()
    },
    methods: {
      checkMemberState(){
        this.axios.get(this.common.getApi() + '/web/api/member/checkMemberState','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){//成功
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '201'){//用户手机号尚未激活
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '202'){//用户尚未完善资料
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '203'){//用户审核未通过
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '204'){//未登录
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '205'){//用户审核中
            this.$store.commit('set_status', res.data.code);
          }
          console.log(this.$store.state.status);
          if(this.$store.state.status == '201'){
            console.log(this.$store.state.status);
            this.dialogVisible1 = true;
          }else if(this.$store.state.status == '202'){
            console.log(this.$store.state.status);
            this.dialogVisible2 = true;
          }else if(this.$store.state.status == '203'){
            console.log(this.$store.state.status);
            this.dialogVisible3 = true;
          }else if(this.$store.state.status == '205'){
            console.log(this.$store.state.status);
            this.dialogVisible4 = true;
          }

        })
      },
      getMemberInfo(){
        this.axios.get(this.common.getApi() + '/web/api/member/getMemberInfo','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.memberIntegral = res.data.obj.memberIntegral
            this.$store.commit('set_phone', res.data.obj.memberHandphone);
            this.$store.commit('set_recode', res.data.obj.smscode);
        }
        })
      },
      getMemberProjectList(pageIndex,pageSize){
        var data = {
              projectState: 0,
              joinState: 0,
              search: null,
            }
        this.axios.get(this.common.getApi() + '/web/api/project/getMemberProjectList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:data
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
           this.invNum = res.data.obj.list.length
          }
        })
      },
      getHomeMessageList(){
        this.axios.get(this.common.getApi() + '/web/api/message/getHomeMessageList',{
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
            this.tableData = res.data.obj;
            debugger
          }
        })
      },
      getBannerList(){
        this.axios.get(this.common.getApi() + '/web/api/banner/getBannerList',{
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
            this.bannerList = res.data.obj;
            console.log(this.bannerList)
          }
        })
      },
      tonoticeDetail(id){
        this.$router.push({path:'/noticeDetail',query: {id: id}})
      },
      toYd(){
        this.$router.push({ path: '/investgationProject' });
      },
      toJf(){
        this.$router.push({ path: '/integrationUse' });
      },
      tonoticeList(){
        this.$router.push({path: '/noticeList'});
      }
    }
  }
</script>

<style>
  .yss-homebanner{
    width: 100%;
    
  }

  .yss-homebanner img{
    width: 100%;
  }

  .notice-wrapper{
    padding-top: 120px;
    width: 100%;
    height: 500px;
    border-bottom: 1px solid #F5F5F5;
    box-sizing: border-box;
  }

  .new-notice{
    display: flex;
    width: 1180px;
    height: 64px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between
  }



  /*.new-notice div{
    border-right: 1px solid #E6E6E6;
    flex: 1.4;
  }*/

  /*.new-notice div:nth-child(1){
    flex: 0.4;
  }*/

  /*.new-notice div:nth-child(4){
    border: none;
  }*/

  .notice-content{
    text-align: center;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    width: 20%;
  }

 
   .intr-wrapper{
     background: #F5F5F5;
   }
  .intr-wrapper,
  .cooperation-wrapper{
    width: 100%;
  }

  .service-type{
    background: #fff;
    height: 160px;
  }

  .intr-wrapper .yss-intr,
  .service-type .yss-service,
  .cooperation-wrapper .yss-cooperation,.notic_main{
    width: 1180px;
    margin: 0 auto;
    padding: 50px 0;
  }

  

 



  .yss-txt p {
    margin-bottom: 20px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  .service-main{
    display: flex;
  }

  .service-investigation{
    margin-right: 20px;
  }

  .service-integration,
  .service-investigation{
    width: 580px;
    height: 400px;
    background: #fff;
    margin-top: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:0px 8px 24px 0px rgba(0,0,0,0.05);
  }

  .service-info{
    margin-left: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 240px;
  }

  .service-name{
    font-size: 24px;
    color: #333;
    font-weight: bold;
  }

  .service-name:nth-child(1){
    margin-bottom: 17px;
  }

  .service-name:nth-child(2){
    margin-bottom: 5px;
  }

  .service-detail{
    font-size: 14px;
    color: #999;
  }

  .btn-look.el-button--default{
    background: #13B5BB;
    color: #fff;
  }

  .cooperation-list{
    display: flex;
    flex-wrap: wrap;
    /*justify-content: center;*/
    margin-top: 38px;
  }

  .cooperation-list li{
    width: 196px;
    text-align: center;
  }

  .el-carousel__item{
    height: 100%;
  }
  .service-type .yss-service{
    position: relative;
    height: 60px;
  }
  .service-investigation{
    position: absolute;
  bottom: -90px;
  left: 0;
  z-index: 99;
  }
.service-integration{
  position: absolute;
  bottom: -90px;
  right: 0;
  z-index: 99;

}
.i_line{
  display: block;
  margin: 22px 0;
  width: 24px;
  height: 1px;
  background: #E6E6E6;
}
.invest{
  font-size: 14px;
  color: #13B5BB;

}
.invest span{
  display: inline-block;
  font-size: 18px;
  color: #13B5BB;
  width: 80px;
  height: 32px;
  border: 1px solid #13B5BB;
  text-align: center;
  line-height: 32px;
  border-radius: 4px;
  margin-left: 15px;
  
}
.notic_head{
  width: 100%;
  display:flex;
  justify-content: space-between;

}
.notic_head .title{

}
.notic_head .title p{
  font-size: 24px;
  color: #343434;
  margin-bottom: 6px;
}
.notic_head .title span{
  font-size: 12px;
  color:#999;
}
 .more-notice{
    color: #999999;
    font-size: 14px;
    cursor: pointer;
  }
  .notic_body{
    width: 100%;
    margin-top: 50px;
  }
  .notic_body ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .notic_body ul li{
    width: 324px;
    cursor: pointer;

  }
  .notic_body ul li span{
    display: block;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;

  }

  .notic_body ul li h3{
    display: block;
    font-size: 18px;
    color: #13B5BB;
    margin-bottom: 20px;

  }
   .notic_body ul li p{
    display: block;
    font-size: 14px;
    color: #999999;
    display: -webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 4;
    overflow: hidden;

  }
  .intr_bg{
    width: 880px;
    height: 500px;
    background: #15C0C0;
    padding: 90px 300px 80px 80px ;
    box-sizing: border-box;
    position: relative;
  }
  .intr_bg img{
    position: absolute;
    right: -300px;
    top: 90px;
  }
  .intr_bg h1{
    font-size: 24px;
    margin-bottom: 6px;
    color: #fff;
    font-weight: normal;
  }
  .intr_bg  span{
    display: block;
    font-size: 14px;
    margin-bottom: 48px;
    color: #fff;
  }
  .intr_bg .intr-main .yss-txt  p{
    font-size: 14px;
    color: #fff;
    display: block;
  }
  .intr_bg i{
    display: block;
    width: 72px;
    height: 1px;
    background: #fff;
    margin-top: 50px;
  }
  .intr-wrapper .yss-intr{
    padding: 150px 0;
  }


/* intr-main
yss-txt
p */



</style>