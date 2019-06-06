<template>
  <div class="index">
    <div class="yss-homebanner">
      <el-carousel height="480px">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <h3 style="height: 100%;">
            <a v-if="item.skipUrl" :href="item.skipUrl"><img :src="baseurl+item.picUrl" alt="" height="100%"/></a>
            <img :src="baseurl+item.picUrl" alt="" height="100%"/>
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="notice-wrapper">
      <div class="new-notice">
        <div class="title">最新公告</div>
        <div class="notice-content" v-for="item in tableData" @click="tonoticeDetail(item.id)">{{item.title}}</div>
        <span class="more-notice" @click="tonoticeList">更多 >></span>
      </div>
    </div>

    <div class="intr-wrapper">
      <div class="yss-intr">
        <h1>公司介绍</h1>
        <div class="intr-main">
          <div class="home-pic-1">
            <img src="../../assets/home_pic_1.png" alt="" />
          </div>
          <div>
            <div class="home-pic-2">
              <img src="../../assets/home_pic_2.png" alt="" />
            </div>
            <div class="home-pic-3">
              <img src="../../assets/home_pic_3.png" alt="" />
            </div>
          </div>
          <div class="yss-txt">
            <p>医生说为英德知市场咨询（上海）有限公司所有的线上医学调查网站。我们的服务范围超过 100 个国家，提供市场动态与消费者态度与行为的市场调查与分析服务。</p>
            <p>在中国，我们收集并分析消费者购物的行为已超过 8年。从 05年成立至今我们已携手全球诸多知名药械公司开展 了大量医学市场调查，调研涉及疾病诊治、医疗器械使用需求及改进、 医药品牌满 意度、 医生职业满意度、 跨国药企学术营销、医学再教育情况等几大方面。</p>
            
          </div>
        </div>
      </div>
    </div>

    <div class="service-type">
      <div class="yss-service">
        <h1>服务类型</h1>
        <div class="service-main">
          <div class="service-investigation">
            <div class="service-pic">
              <img src="../../assets/home_yd.png" alt="" />
            </div>
            <div class="service-info">
              <div>
                <div class="service-name">/</div>
                <div class="service-name">医调中心</div>
                <div class="service-detail">参与有奖调研，获得奖励</div>
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
                <div class="service-name">/</div>
                <div class="service-name">积分商城</div>
                <div class="service-detail">累计积分，兑换奖品</div>
              </div>
              <div>
                <el-button class="btn-look" @click="toJf">立即查看</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--<div class="cooperation-wrapper">
      <div class="yss-cooperation">
        <h1>合作伙伴</h1>
        <div class="cooperation-main">
          <ul class="cooperation-list">
            <li>
              <img src="../../assets/home_partner_logo_1.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_2.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_3.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_4.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_5.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_6.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_7.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_8.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_9.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_10.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_11.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_12.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_13.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_14.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_15.png" alt="" />
            </li>
            <li>
              <img src="../../assets/home_partner_logo_16.png" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>    -->
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
        bannerList:[],
        baseurl: baseurl,
        lbheight:null,
      }
    },
    mounted(){
//    this.lbheight =
      this.getHomeMessageList();
      this.getBannerList();
    },
    methods: {
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
    width: 100%;
    height: 64px;
    border-bottom: 1px solid #F5F5F5;
  }

  .new-notice{
    display: flex;
    width: 1180px;
    height: 64px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between
  }

  .title{
    color: #343434;
    font-weight: bold;
    font-size: 14px;
  }

  .title{
    padding-right: 5%;
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

  .more-notice{
    color: #13B5BB;
    cursor: pointer;
  }

  .intr-wrapper,
  .cooperation-wrapper{
    width: 100%;
  }

  .service-type{
    background: #F5F5F5;
  }

  .intr-wrapper .yss-intr,
  .service-type .yss-service,
  .cooperation-wrapper .yss-cooperation{
    width: 1180px;
    margin: 0 auto;
    padding: 50px 0;
  }

  .intr-wrapper .yss-intr h1,
  .service-type .yss-service h1,
  .cooperation-wrapper .yss-cooperation h1{
    text-align: center;
    color: #343434;
    font-size: 30px;
    font-weight: normal;
    font-weight: bold;
  }

  .intr-main{
    display: flex;
    margin-top: 38px;
  }

  .home-pic-1{
    margin-right: 20px;
  }

  .home-pic-2{
    margin-bottom: 17px;
  }

  .yss-txt{
    color: #333333;
    font-size: 16px;
    margin-left: 20px;
    text-indent: 32px;
    line-height: 22px;
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
</style>