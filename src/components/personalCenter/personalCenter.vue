<template>
  <div class="personalCenter">
    <div class="personalCenter-wrapper">
      <el-container>
        <el-aside width="280px">
          <div class="userInfo-wrapper">
            <div class="user-head">
              <!--<img src="../../assets/userhead.jpg" alt="" width="80px"/>-->
              <img :src="baseurl + $store.state.headurl" alt="" width="80px" height="80px"/>
            </div>
            <div class="user-name">
              <span>{{memberRealname}}</span>
            </div>
            <div class="user-intergration">
              <span>当前积分：{{memberIntegral}}</span>
            </div>
            <router-link to="/integrationUse">
              <div class="user-btn">
                <el-button class="btn-use">立即兑换</el-button>
              </div>
            </router-link>
          </div>
          <el-row class="tac">
            <el-col :span="24">
              <div class="header">
                <span>个人中心</span>
              </div>
              <el-menu
                :default-active="path"
                background-color="#fff"
                text-color="#000"
                active-text-color="#13B5BB"
                :router="true">
                <el-menu-item index="basicData">
                  <span slot="title">基本资料</span>
                </el-menu-item>
                <el-menu-item index="verifyZyz" v-if="this.verify_type">
                  <span slot="title">资质审核</span>
                </el-menu-item>
                <el-menu-item index="relatedRecord">
                  <span slot="title">相关记录</span>
                </el-menu-item>
                <el-menu-item index="editPass">
                  <span slot="title">修改密码</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        path:"",
        memberIntegral:null,
        memberRealname:null,
        verify_type:null,
        baseurl:baseurl,
      };
    },
    created(){
      this.path = this.$route.path.substr(1,this.$route.path.length);
      if(this.path == "joinRecord" || this.path == "dhRecord" || this.path == "jfRecord"){
        this.path = "relatedRecord"
      }
      console.log(this.path);
    },
    mounted(){
      this.getMemberInfo();
      this.checkMemberState();
    },    
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getMemberInfo(){
        this.axios.get(this.common.getApi() + '/web/api/member/getMemberInfo','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.memberIntegral = res.data.obj.memberIntegral;
            this.memberRealname = res.data.obj.memberRealname;
            this.$store.commit('set_recode', res.data.obj.smscode);
            this.$store.commit('set_headurl', res.data.obj.memberphoto);
            console.log(this.$store.state.headurl);
          }
        })           
      },
      checkMemberState(){
        this.axios.get(this.common.getApi() + '/web/api/member/checkMemberState','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {

          if(res.data.code == '200'){//成功
            this.verify_type = true;
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '201'){//用户手机号尚未激活
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '202'){//用户尚未完善资料
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '203'){//用户审核未通过
            this.verify_type = true;
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '204'){//未登录
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '205'){//用户审核中
            this.verify_type = true;
            this.$store.commit('set_status', res.data.code);
          }
          console.log(this.$store.state.status);
        })
      }
    },
    watch:{
      $route(to, from) {
        this.path = this.$route.path.substr(1,this.$route.path.length);
        console.log(this.path);
        this.checkMemberState();
      }
    }
  }      
</script>

<style>
  .personalCenter{
    background: #F6F6F6;
    padding-top: 20px;
  }
  
  .personalCenter .personalCenter-wrapper{
    width: 1180px;
    margin: 0 auto;
  }
  
  .personalCenter .userInfo-wrapper{
    height: 260px;
    background: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .personalCenter .user-head{
    text-align: center;
  }
  
  .personalCenter .user-head img{
    border-radius: 50%;
  }
  
  .personalCenter .user-name{
    text-align: center;
  }
  
  .personalCenter .user-intergration{
    text-align: center;
    margin-top: 13px;
    margin-bottom: 16px;
    color: #9A9A9A;
    font-size: 14px;
  }
  
  .personalCenter .user-btn{
    text-align: center;
  }
  
  .personalCenter .btn-use{
    color: #FFFFFF;
    background: #13B5BB;
    border: none;
  }
  
  .personalCenter .personalCenter-wrapper .el-menu{
    border:none;
  }
  
  .personalCenter .personalCenter-wrapper .header{
    width: 100%;
    height: 80px;
    font-size: 20px;
    padding: 0 20px;
    background: #FFF;
    color: #0C0C0C;
    box-sizing: border-box;
    line-height: 80px;
    border-top: 1px solid #E5E5E5;
  }
  
  .personalCenter .personalCenter-wrapper .el-menu-item{
    height: 80px;
    line-height: 80px;
    font-size: 16px;
    color:#0C0C0C;
  }
  
  .personalCenter .personalCenter-wrapper .el-menu-item.is-active{
    border-left: 4px solid #13B5BB;  
  }
  
  .personalCenter .personalCenter-wrapper .el-main{
    margin-bottom: 80px;
    padding-top: 0px;
  }  
  .personalCenter .personalCenter-wrapper .el-menu li:nth-child(1){
    border-top: 1px solid #E5E5E5;
  }
  
  .personalCenter .personalCenter-wrapper .el-menu li:nth-child(2){
    border-top: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;
  }
  
  .personalCenter .personalCenter-wrapper .el-menu li:nth-child(3){
    border-bottom: 1px solid #E5E5E5;
  }  
</style>