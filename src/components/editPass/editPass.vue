<template>
  <div class="editPass-wrapper">
    <div class="editPass-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="输入旧密码" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword" placeholder="" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="输入新密码" prop="loginPwd">
          <el-input type="password" v-model="form.loginPwd" placeholder="" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="surePwd">
          <el-input type="password" v-model="form.surePwd" placeholder="" style="width: 400px;"></el-input>
        </el-form-item>
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
          oldPassword: [
            { required: true, message: '请输入请输入旧密码', trigger: 'blur' },
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
      activateMobile(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post(this.common.getApi() + '/web/api/member/editMemberPassword',{
              params:{
                oldPassword: this.form.oldPassword,
                newPassword: this.form.loginPwd,
              }
            }).then((res) => {
              if(res.data.success){
                this.$message({
                  type: 'success',
                  message: '修改密码成功,请重新登陆'
                })
                this.$router.push('/index');
                location.reload();
//              this.loginOut();
              }else{
                this.$message.error(res.data.msg);
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
    }
  }  
</script>

<style>
  .editPass-wrapper{
    width: 100%;
    background: #F6F6F6;
    /*padding-top: 20px;*/
    padding-bottom: 40px;
  }
  
  .editPass-wrapper .editPass-content {
    /* width: 1180px; */
    height: 640px;
    background: #FFF;
    padding-top: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 0px 125px;
    padding-top: 40px;
    /* padding-left: 124px; */
  }
  
  .editPass-wrapper .process-wrapper{
    width: 780px;
    height: 48px;
    border: 1px solid #E6E6E6;
    margin: 0 auto;
    display: flex;
    line-height: 48px
  }
  
  .editPass-wrapper .process-1,
  .editPass-wrapper .process-2,
  .editPass-wrapper .process-3{
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #333333;
    position: relative;
  }
  
  .editPass-wrapper .triangle {
    width: 0;
    height: 0;
    border-width: 25px 0 25px 24px;
    border-style: solid;
    border-color: transparent transparent transparent #E6E6E6;
    position: absolute;
    top: -1px;
    right: -25px;
  }
  
  .editPass-wrapper .triangle span{
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
  
  .editPass-wrapper .process-wrapper .process-1.active,
  .editPass-wrapper .process-wrapper .process-2.active,
  .editPass-wrapper .process-wrapper .process-3.active{
    background: #13B5BB;
    color: #FFFFFF;
  }
  
  .editPass-wrapper .process-wrapper .process-1.active .triangle span,
  .editPass-wrapper .process-wrapper .process-2.active .triangle span{
    border-color: transparent transparent transparent #13B5BB;
  }  
  
  .editPass-wrapper .title{
    color: #0C0C0C;
    font-weight: bold;
    font-size: 12px;
    margin-top: 40px;
  }
  
  .editPass-wrapper .phoneInput{
    width: 400px;
    margin-top: 10px;
  }
  
  .editPass-wrapper .btn-submit{
    width: 400px;
    background: #13B5BB;
    color: #FFFFFF;
    border: none;
    margin-top: 40px;
  }
  
  .editPass-wrapper .el-select .el-input.is-focus .el-input__inner,
  .editPass-wrapper .el-input__inner:focus{
    border-color: #13B5BB;
  }    
    
  .editPass-wrapper .phoneInput input{
    background: #F9F9F9;
  }   
  .editPass-wrapper .el-form{
    margin-top: 40px;
    border-bottom: 1px solid #E6E6E6;
  }
  
  .editPass-wrapper .mobileInput{
    width: 400px;
  }
  
  .editPass-wrapper .codeInput{
    width: 280px;
  }
  
  .tips_content{
    margin-top: 40px;
    padding: 30px 22px;
    background: #FFFEFA;
    border: 1px solid #E7E7E7;
  }
  
  .editPass-wrapper .btn-getcode{
    width: 100px;
    margin-left: 20px;
    height: 40px;
    padding: 0;
    background: #13B5BB;
    color: #FFF;
    border: none;
  }
  
  .editPass-wrapper .btn-use{
    width: 400px;
    background: #13B5BB;
    color: #FFF;
    border: none;
    margin-top: 30px;
  }
  
  .editPass-wrapper .warning{
    color: #FF6161;
    font-size: 12px;
  }
  
  .editPass-wrapper .el-button.is-disabled,
  .editPass-wrapper .el-button.is-disabled:focus, 
  .editPass-wrapper .el-button.is-disabled:hover {
    color: #FFF; 
    cursor: not-allowed;
    background-image: none;
    background-color: AUTO; 
    border-color: #ebeef5;
  }
</style>