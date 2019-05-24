<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="500px"
    :center="true"
    custom-class="loginDialog"
    :lock-scroll="true"
    @close="handleClose">
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
</template>

<script>
  export default {
    props: ["isopen"],
    data() {
      return {
        path:"",
        dialogVisible: true,
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
        }            
      };
    },
    mounted(){
      this.checkLogin();
      console.log(this.isopen);
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
      handleClose() {
        this.$store.commit('setLoginDialog', false);
        console.log(this.$store.state.isopen)
      },
      toForgetPwd(){
        this.dialogVisible = false;
        this.$router.push({ path: '/forgetPwd'})
      },
      toRegister(){
        this.dialogVisible = false;
        this.$router.push({ path: '/register'})
      },
      checkLogin(){
        this.axios.get(this.common.getApi() + '/web/api/auth/checkLogin','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.islogin = true;
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
//                location.reload();
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
</style>