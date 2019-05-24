<template>
  <footer id="footer">
    <div class="yss-info">
      <div class="part-1">
        <p>快捷链接</p>
        <ul>
          <li @click="toinvestgationProject">调研服务</li>
          <li @click="tointegrationUse">积分商城</li>
          <li @click="topersonalIndex">个人中心</li>
          <li @click="tocompanyIntr">关于我们</li>
        </ul>
      </div>
      <div class="part-2">
        <p>联系我们</p>
        <ul>
          <li>会员服务中心：member@yishengshuo.com</li>
          <li>客服QQ：1523732752</li>
          <li>业务联系：team@ifa-hd.com</li>
        </ul>
      </div>
      <div class="part-3">
        <p>关注我们</p>
        <ul>
          <li><span>医生说新浪微博</span><el-button class="btn-follow" size="mini">+关注</el-button></li>
          <li><span>医生说腾讯微博</span><el-button class="btn-follow" size="mini">+关注</el-button></li>
        </ul>
        <div class="yss-qrcode">
          <img src="../../assets/pic_qrcode.png" alt="" />
          <div>医学市场专业调查社区</div>
        </div>
      </div>
    </div>

    <div class="copyright">Copyright &#169 2000-2018 All rights reserved 版权所有 医生说 - 第一医生调查网站 未经授权请勿转载</div>
    <div class="recordation">沪ICP备10019317号-8</div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    mounted(){
    },
    created(){
    },
    methods: {
      toinvestgationProject(){
        this.$router.push('/investgationProject');
      },
      tointegrationUse(){
        this.$router.push('/integrationUse');
      },
      topersonalIndex(){
        this.$router.push('/personalIndex');
      },
      tocompanyIntr(){
        this.$router.push('/companyIntr');
      }
    }
  }
</script>

<style>
  #footer{
    background: #343434;
    width: 100%;
    height: 440px;
  }

  #footer .yss-info{
    display: flex;
    justify-content: center;
    padding-top: 50px;
    width: 1180px;
    margin: 0 auto;
  }

  #footer .part-1,.part-2,.part-3{
    flex: 1;
  }

  #footer .part-1 p,
  #footer .part-2 p,
  #footer .part-3 p{
    font-size: 16px;
    margin-bottom: 40px;
  }

  #footer .part-1 ul li,
  #footer .part-2 ul li,
  #footer .part-3 ul li{
    font-size: 14px;
    margin-bottom: 13px;
  }

  #footer .part-1 ul {
    width: 75%;
    overflow: hidden;
  }

  #footer .part-1 ul li{
    float: left;
    margin-right: 20px;
  }

  #footer .el-button.btn-follow{
    background: transparent;
    border: 1px solid #979797;
    margin-left: 10%;
  }

  #footer .el-button.btn-follow span{
    color: #606266;
  }

  #footer .part-3 ul{
    float: left;
    width: 50%;
  }

  .yss-qrcode{
    float: right;
  }

  .yss-qrcode img{
    margin-bottom: 8px;
  }

  .copyright{
    margin-top: 100px;
  }

  .copyright,
  .recordation{
    text-align: center;
  }
</style>