<template>
  <div class="integrationCenter">
    <loginDialog v-if="isopen"></loginDialog>
    <div class="integrationCenter-wrapper">
      <el-container>
        <el-aside width="280px">
          <div class="userInfo-wrapper" v-if="islogin">
            <div class="user-head">
              <img :src="baseurl + $store.state.headurl" alt="" width="80px" height="80px"/>
            </div>
            <div class="user-name">
              <span>{{memberRealname}}</span>
            </div>
            <div class="user-intergration">
              <span>当前积分：{{memberIntegral}}</span>
            </div>
            <router-link to="/integrationHistory">
              <div class="user-btn">
                <el-button class="btn-historyRecord">历史兑换记录</el-button>
              </div>
            </router-link>
          </div>
          <div class="userInfo-wrapper" v-if="!islogin">
            <div class="user-head">
              <img src="../../assets/default_head.png" alt="" width="80px"/>
            </div>
            <div class="user-intergration">
              <span>您还未登录，无法显示积分</span>
            </div>
            <!--<div class="user-btn">
              <el-button class="btn-historyRecord" @click="openDialog">立即登录</el-button>
            </div>-->
          </div>
          <el-row class="tac">
            <el-col :span="24">
              <div class="header">
                <span>积分商城</span>
              </div>
              <el-menu
                :default-active="path"
                background-color="#fff"
                text-color="#000"
                active-text-color="#13B5BB"
                :router="true">
                <el-menu-item index="integrationUse">
                  <span slot="title">兑换积分</span>
                </el-menu-item>
                <el-menu-item index="integrationRule">
                  <span slot="title">兑换规则</span>
                </el-menu-item>
                <!--<el-menu-item index="integrationQuestion">
                  <span slot="title">常见问题</span>
                </el-menu-item>-->
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
  import loginDialog from '@/components/loginDialog/loginDialog.vue'
  export default {
    components: {
      loginDialog
    },
    data() {
      return {
        path:"",
        memberIntegral:null,
        memberRealname:null,
        islogin:null,
        isopen: null,
        baseurl:baseurl,
      };
    },
    created(){
      this.path = this.$route.path.substr(1,this.$route.path.length);
      if(this.path == "proDetail" || this.path == "integrationHistory"){
        this.path = ""
      }
//    console.log(this.path);
    },
    mounted(){
      this.getMemberInfo();
//    console.log(this.dialog());
    },
    methods: {
      dialog(){
        this.isopen = this.$store.state.isopen;
        console.log(this.isopen);
      },
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
            this.islogin = true;
          }else if(res.data.code == '204'){
            this.islogin = false
          }
        })
      },
      openDialog(){
        this.$store.commit('setLoginDialog', true);
        console.log(this.$store.state.isopen)
        this.isopen = true;
      },
    },
    watch:{
      $route(to, from) {
        this.path = this.$route.path.substr(1,this.$route.path.length);
        console.log(this.path);
      }
    }
  }
</script>

<style>
  .integrationCenter{
    background: #F6F6F6;
    padding-top: 20px;
  }

  .integrationCenter .integrationCenter-wrapper{
    width: 1180px;
    margin: 0 auto;
  }

  .integrationCenter .userInfo-wrapper{
    height: 260px;
    background: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
  }

  .integrationCenter .user-head{
    text-align: center;
  }

  .integrationCenter .user-head img{
    border-radius: 50%;
  }

  .integrationCenter .user-name{
    text-align: center;
  }

  .integrationCenter .user-intergration{
    text-align: center;
    margin-top: 13px;
    margin-bottom: 16px;
    color: #9A9A9A;
    font-size: 14px;
  }

  .integrationCenter .user-btn{
    text-align: center;
  }

  .integrationCenter .btn-historyRecord{
    color: #FFFFFF;
    background: #13B5BB;
    border: none;
  }

  .integrationCenter .integrationCenter-wrapper .el-menu{
    border:none;
  }

  .integrationCenter .integrationCenter-wrapper .header{
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

  .integrationCenter .integrationCenter-wrapper .el-menu-item{
    height: 80px;
    line-height: 80px;
    font-size: 16px;
    color:#0C0C0C;
  }

  .integrationCenter .integrationCenter-wrapper .el-menu-item.is-active{
    border-left: 4px solid #13B5BB;
  }

  .integrationCenter .integrationCenter-wrapper .el-main{
    margin-bottom: 80px;
    padding-top: 0px;
  }

  .integrationCenter .integrationCenter-wrapper .el-menu li:nth-child(1){
    border-top: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;
  }

  .integrationCenter .integrationCenter-wrapper .el-menu li:nth-child(2){
    border-bottom: 1px solid #E5E5E5;
  }
</style>