<template>
  <div class="forgetPwd-wrapper">
    <div class="forgetPwd-content">
      <!--<div class="process-wrapper">
        <div class="process-1 active">
          1、提交申请
          <div class="triangle">
            <span></span>
          </div>
        </div>
        <div class="process-2 ">
          2、重置密码
          <div class="triangle">
            <span></span>
          </div>
        </div>
        <div class="process-3">
          3、重置成功
        </div>
      </div>-->
      
      <!--<div class="title">
        请填写您注册时的手机号
      </div>
      <el-input placeholder="请输入您的手机号" class="phoneInput" v-model="mobile"  v-bind:class="{ active: isActive}"></el-input>
      <div>
        <el-button class="btn-submit" @click="toNext">提交</el-button>
      </div>-->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="手机号码" required prop="mobile">
          <el-input v-model="form.mobile" class="mobileInput"></el-input>
        </el-form-item>
        <el-form-item label="验证码" required prop="ver_code">
          <el-input v-model="form.ver_code" class="codeInput"></el-input>
          <el-button v-show="show" class="btn-getcode" @click="sendForgetMessage('form')">获取验证码</el-button>
          <el-button v-show="!show" class="btn-getcode" disabled>{{count}}s</el-button>
        </el-form-item>
        <el-form-item label="输入密码" prop="loginPwd">
          <el-input type="password" v-model="form.loginPwd" placeholder="" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="surePwd">
          <el-input type="password" v-model="form.surePwd" placeholder="" style="width: 400px;"></el-input>
        </el-form-item>
        <!--<el-form-item label="手机号码" required prop="mobile">
          <el-input v-model="form.mobile" class="mobileInput"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button class="btn-use" @click="activateMobile('form')">提交</el-button>
          <p class="warning">您的手机号码将只会用于网站联系、奖励发放、调查通知，不会作为他用</p>
        </el-form-item>
      </el-form>
    </div>    
  </div>
</template>

<script>
  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.loginPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };      
      return {
        show: true,
        count: '',
        timer: null,
        form: {
          mobile: null,
          ver_code: null,
          loginPwd:null,
          surePwd:null,
        },
        rules: {
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
          ver_code:[
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
          loginPwd:[
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 5, max: 8, message: '密码要在5到8位之间', trigger: 'blur' }
          ],
          surePwd:[
            { required: true, message: '请确认登录密码', trigger: 'blur' },
            { min: 5, max: 8, message: '密码要在5到8位之间', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],          
        },        
      }
    },
    mounted(){

    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      
      sendForgetMessage(){
        if(this.form.mobile && this.form.mobile.length == 11){
          const TIME_COUNT = 60;
          if(!this.timer){
            this.count = TIME_COUNT;
            this.show = false;
            this.axios.get(this.common.getApi() + '/web/api/auth/sendForgetMessage',{
              params:{
                params:{
                  mobile: this.form.mobile
                }
              }
            },{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((res) => {
              if(res.data.success){

              }else{
                this.$message.error(res.data.msg);
              }
            }) 
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              }else{
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }   
        }else{
          this.$message.error('请先填写手机号')
        }
      },
      activateMobile(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post(this.common.getApi() + '/web/api/auth/forgetModifyPassword',{
              params:{
                  mobile: this.form.mobile,
                  password: this.form.loginPwd,
                  verificationCode: this.form.ver_code
              }
            }).then((res) => {
              if(res.data.success){
                this.$message({
                  type: 'success',
                  message: '修改密码成功'
                })
                this.$router.push('/index');
              }else{
                this.$message.error(res.data.msg);
              }
            })  
          } else {
            console.log('error submit!!');
            return false;
          }
        });      
      }
    }
  }  
</script>

<style>
  .forgetPwd-wrapper{
    width: 100%;
    background: #F6F6F6;
    padding-top: 20px;
    padding-bottom: 40px;
  }
  
  .forgetPwd-wrapper .forgetPwd-content{
    width: 1180px;
    height: 640px;
    background: #FFF;
    padding-top: 40px; 
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 0 200px;
    padding-top: 40px;
  }
  
  .forgetPwd-wrapper .process-wrapper{
    width: 780px;
    height: 48px;
    border: 1px solid #E6E6E6;
    margin: 0 auto;
    display: flex;
    line-height: 48px
  }
  
  .forgetPwd-wrapper .process-1,
  .forgetPwd-wrapper .process-2,
  .forgetPwd-wrapper .process-3{
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #333333;
    position: relative;
  }
  
  .forgetPwd-wrapper .triangle {
    width: 0;
    height: 0;
    border-width: 25px 0 25px 24px;
    border-style: solid;
    border-color: transparent transparent transparent #E6E6E6;
    position: absolute;
    top: -1px;
    right: -25px;
  }
  
  .forgetPwd-wrapper .triangle span{
    display: block;
    width: 0;
    height: 0;
    border-width: 25px 0 25px 24px;
    border-style: solid;
    border-color: transparent transparent transparent #fff;
    position: absolute;
    top: -25px;
    left: -26px;
  }  
  
  .forgetPwd-wrapper .process-wrapper .process-1.active,
  .forgetPwd-wrapper .process-wrapper .process-2.active,
  .forgetPwd-wrapper .process-wrapper .process-3.active{
    background: #13B5BB;
    color: #FFFFFF;
  }
  
  .forgetPwd-wrapper .process-wrapper .process-1.active .triangle span,
  .forgetPwd-wrapper .process-wrapper .process-2.active .triangle span{
    border-color: transparent transparent transparent #13B5BB;
  }  
  
  .forgetPwd-wrapper .title{
    color: #0C0C0C;
    font-weight: bold;
    font-size: 12px;
    margin-top: 40px;
  }
  
  .forgetPwd-wrapper .phoneInput{
    width: 400px;
    margin-top: 10px;
  }
  
  .forgetPwd-wrapper .btn-submit{
    width: 400px;
    background: #13B5BB;
    color: #FFFFFF;
    border: none;
    margin-top: 40px;
  }
  
  .forgetPwd-wrapper .el-select .el-input.is-focus .el-input__inner,
  .forgetPwd-wrapper .el-input__inner:focus{
    border-color: #13B5BB;
  }    
    
  .forgetPwd-wrapper .phoneInput input{
    background: #F9F9F9;
  }   
  .forgetPwd-wrapper .el-form{
    margin-top: 40px;
    border-bottom: 1px solid #E6E6E6;
  }
  
  .forgetPwd-wrapper .mobileInput{
    width: 400px;
  }
  
  .forgetPwd-wrapper .codeInput{
    width: 280px;
  }
  
  .tips_content{
    margin-top: 40px;
    padding: 30px 22px;
    background: #FFFEFA;
    border: 1px solid #E7E7E7;
  }
  
  .forgetPwd-wrapper .btn-getcode{
    width: 100px;
    margin-left: 20px;
    height: 40px;
    padding: 0;
    background: #13B5BB;
    color: #FFF;
    border: none;
  }
  
  .forgetPwd-wrapper .btn-use{
    width: 400px;
    background: #13B5BB;
    color: #FFF;
    border: none;
    margin-top: 30px;
  }
  
  .forgetPwd-wrapper .warning{
    color: #FF6161;
    font-size: 12px;
  }
  
  .forgetPwd-wrapper .el-button.is-disabled,
  .forgetPwd-wrapper .el-button.is-disabled:focus, 
  .forgetPwd-wrapper .el-button.is-disabled:hover {
    color: #FFF; 
    cursor: not-allowed;
    background-image: none;
    background-color: AUTO; 
    border-color: #ebeef5;
  }
</style>