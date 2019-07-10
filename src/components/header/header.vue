<template>
  <el-header height="80px">
    <el-dialog
      :visible.sync="dialogVisible"
      width="500px"
      :center="true"
      custom-class="loginDialog"
      :lock-scroll="true">
      <div slot="title" class="dialog-header">
        <div>尊敬的用户欢迎您</div>
        <div>使用手机号登录</div>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input class="phoneInput" v-model="loginForm.mobile" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input class="pwdInput" type="password" v-model="loginForm.pass" placeholder="请输入您的登录密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div>
          <el-button class="btn-login" @click="submitForm('loginForm')">登录</el-button>
        </div>
        <div class="btn-footer">
            <span class="btn-forget" @click="toForgetPwd">忘记密码？</span>
          <span class="footer-1">还没有账号？<span class="btn-register" @click="toRegister">点击注册></span></span>
        </div>
      </span>
    </el-dialog>
    <div class="headerWrapper">
      <!--顶部logo-->
      <div id="logo" class="logo">
        <a href="/" target="_self" title="首页">
          <img src="../../assets/logo.jpg" alt="" />
        </a>
      </div>

      <el-menu
        mode="horizontal"
        @select="handleSelect"
        background-color="#fff"
        text-color="#151515"
        active-text-color="#fff"
        :router="true">
        <el-menu-item index="index">首页</el-menu-item>
        <el-menu-item index="investgationService">调研服务</el-menu-item>
        <el-menu-item index="integrationCenter">积分商城</el-menu-item>
        <el-menu-item index="aboutUs">关于我们</el-menu-item>
        <el-menu-item index="tocenter" v-if="islogin" @click="toCenter">个人中心</el-menu-item>
      </el-menu>

      <div class="user-state" v-if="islogin == false">
        <el-button class="btn-login" @click="openDialog">登录</el-button>
        <el-button class="btn-register" @click="toRegister">免费注册</el-button>
      </div>

      <el-menu
        :default-active="path"
        mode="horizontal"
        @select="handleSelect"
         v-if="islogin == true">
        <el-submenu index="1">
          <template slot="title">

            <span>{{memberRealname}}，欢迎您！</span> <img :src="baseurl + $store.state.headurl" alt="" width="50px" height="50px" style="border-radius: 50%;"/>
            
          </template>
          <el-menu-item index="1-1" @click="toCenter">个人中心</el-menu-item>
          <el-menu-item index="1-2" @click="loginOut">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </el-header>
</template>

<script>
  export default {
      data() {
        return {
          path:"",
          dialogVisible: false,
          islogin:null,
          loginForm: {
            mobile: null,
            pass:null,
          },
          rules: {
            mobile: [
              { required: true, message: '请输入手机号', trigger: 'blur' },
            ],
            pass:[
              { required: true, message: '请输入密码', trigger: 'blur' },
            ]
          },
          baseurl: baseurl
        };
      },
      mounted(){
        this.checkLogin();
      },
      created(){
        this.path = this.$route.path.substr(1,this.$route.path.length);
        if(this.path == "investgationProject" || this.path == "investgationQuestion"){
          this.path = "investgationService"
        }else if(this.path == "integrationUse" || this.path == "integrationRule" || this.path == "integrationQuestion" || this.path == "proDetail" || this.path == "integrationHistory" || this.path == "orderSure" || this.path == "orderPhysical" || this.path == "orderCash" || this.path == "orderPhonepays"){
          this.path = "integrationCenter"
        }else if(this.path == "companyIntr" || this.path == "feedback" || this.path == "privacyStatement"){
          this.path = "aboutUs"
        }
        console.log(this.path);
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        openDialog(){
          this.dialogVisible = true;
        },
        toForgetPwd(){
          this.dialogVisible = false;
          this.$router.push({ path: '/forgetPwd' })
        },
        toRegister(){
          this.dialogVisible = false;
          this.$router.push({ path: '/register' })
        },
        checkLogin(){
          this.axios.get(this.common.getApi() + '/web/api/auth/checkLogin','',{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              this.islogin = true;
              this.memberRealname = res.data.obj.memberRealname
              this.$store.commit('set_headurl', res.data.obj.memberphoto);
            }else if(res.data.code == '204'){
              this.islogin = false;
            }
            console.log(this.islogin);
          })
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.axios.post(this.common.getApi() + '/web/api/auth/doLogin',{
                params:{
                  mobile: this.loginForm.mobile,
                  password: this.loginForm.pass,
                }
              }).then((res) => {
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '登录成功'
                  })
                  this.dialogVisible = false;
                   
                   this.$router.push('/index')
                   location.reload();
                  //this.checkLogin();
                }else{
                  this.$message.error(res.data.msg)
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        loginOut(){
          this.axios.get(this.common.getApi() + '/web/api/auth/loginOut','',{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              location.reload();
            }

            console.log(this.islogin);
          })
        },
        toCenter(){
          this.$router.push('/personalCenter');
        }
      },
      watch: {
  //    $route(to, from) {
  //      console.log(this.$route.path);
  //    }
      },
  }
</script>

<style>
  .el-header{
    height: 80px;
    box-shadow:0px 1px 4px 0px rgba(0,0,0,0.08);
  }

  .el-header .headerWrapper{
    width: 1180px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between
  }

  .el-header #logo {
    height: 100%;
  }

  .el-header #logo a{
    display: flex;
    height: 100%;
    align-items: center;
  }

  .headerWrapper .el-menu{
    display: flex;
    align-items: center;
    border: none;
    margin-left: 6%;

  }

  .headerWrapper .el-menu-item{
    height: 100%;
    line-height: 80px;
    border: none;
  }

  .headerWrapper .el-menu-item.is-active{
    border: none;
    background: #13B5BB!important;
  }

  .headerWrapper .btn-login{
    color: #666666;
    background-color: #F0F0F0;
    border: none;
  }

  .headerWrapper .btn-register{
    color: #FFFFFF;
    background: #13B5BB;
    border: none;
  }

  .headerWrapper .user-state{
    margin-left: 6%;
    display: flex;
    align-items: center;
  }

  .dialog-header div:nth-child(1){
    font-size: 20px;
    color: #676767;
  }

  .dialog-header div:nth-child(2){
    font-size: 14px;
    color: #999999;
    margin-top: 16px;
  }

  .loginDialog .el-dialog__body{
    text-align: center;
  }

  .loginDialog .el-dialog__body .phoneInput,
  .loginDialog .el-dialog__body .pwdInput{
    margin: 0 auto;
    width: 420px;
  }

  .loginDialog .el-dialog__body .phoneInput{
    /*margin-bottom: 20px;*/
  }

  .loginDialog .btn-login{
    width: 420px;
    color: #FFFFFF;
    background-color: #13B5BB;
    border: none;
  }

  .loginDialog .btn-footer{
    display: flex;
    width: 420px;
    margin: 0 auto;
    justify-content:space-between;
    margin-top: 16px;
    margin-bottom: 44px;
  }

  .loginDialog .btn-forget,
  .loginDialog .footer-1{
    color: #4E4E4E;
    font-size: 14px;
    cursor: pointer;
  }

  .loginDialog .btn-register{
    color: #13B5BB;
    font-size: 14px;
    cursor: pointer;
  }

  .loginDialog .el-select .el-input.is-focus .el-input__inner,
  .loginDialog .el-input__inner:focus{
      border-color: #13B5BB;
    }

  .loginDialog .el-form-item__error{
    padding-left: 14px;
  }

  .headerWrapper .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom:none;
  }
</style>