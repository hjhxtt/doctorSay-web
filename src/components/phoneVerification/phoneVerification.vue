<template>
  <div class="phoneVerification-wrapper">
    <div class="resetPwd-content">
      <div class="process-wrapper">
        <div class="process-1 active">
          1、基本信息
          <div class="triangle">
            <span></span>
          </div>
        </div>
        <div class="process-2 active">
          2、手机验证
          <div class="triangle">
            <span></span>
          </div>
        </div>
        <div class="process-3">
          3、完善资料
        </div>
      </div>
      
      <div class="tips">感谢您完成医生说注册第一步，您已获得10元积分的奖励；通过手机验证激活，您将会再获得10元积分的奖励！</div>

      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="手机号码" required prop="mobile">
          <el-input v-model="form.mobile" class="mobileInput" disabled></el-input>
        </el-form-item>
        <el-form-item label="验证码" required prop="ver_code">
          <el-input v-model="form.ver_code" class="codeInput"></el-input>
          <el-button v-show="show" class="btn-getcode" @click="sendRegisterSms">获取验证码</el-button>
          <el-button v-show="!show" class="btn-getcode" disabled>{{count}}s</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-use" @click="activateMobile('form')">立即激活</el-button>
          <p class="warning">您的手机号码将只会用于网站联系、奖励发放、调查通知，不会作为他用</p>
        </el-form-item>        
      </el-form>
      
      <div class="tips_content">
        温馨提示：由系统发送的所有短信一律免费，您将不会承担任何与之有关的通讯费用。当短信通道繁忙时，可能会发生验证码接收延迟的情况。如超过 2 小时仍未收到，请发送您的手机号至：member @ yishengshuo . com , 我们将人工给您发送验证码。
      </div>
    </div>    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true,
        count: '',
        timer: null,
        form: {
          mobile: '',
          ver_code: '',
        },
        rules: {
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
          ver_code:[
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        },        
      }
    },
    mounted(){
      this.getActivateMobile();
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getActivateMobile(){
        this.axios.get(this.common.getApi() + '/web/api/register/getActivateMobile','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.form.mobile = res.data.obj;
          }else{
            this.$message.error(res.data.msg);
          }
        })              
      },
      
      sendRegisterSms(){
        const TIME_COUNT = 60;
        if(!this.timer){
          this.count = TIME_COUNT;
          this.show = false;
          this.axios.get(this.common.getApi() + '/web/api/register/sendRegisterSms',{
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
      },
      activateMobile(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.get(this.common.getApi() + '/web/api/register/activateMobile',{
              params:{
                params:{
                  mobile: this.form.mobile,
                  verityCode: this.form.ver_code
                }
              }
            },{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((res) => {
              if(res.data.success){
                this.$router.push('/perfectInformation')
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
  .phoneVerification-wrapper{
    width: 100%;
    background: #F6F6F6;
    padding-top: 20px;
    padding-bottom: 40px;
  }
  
  .phoneVerification-wrapper .resetPwd-content{
    width: 1180px;
    min-height: 640px;
    background: #FFF;
    padding-top: 40px; 
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 0 200px;
    padding-top: 40px;
  }
  
  .phoneVerification-wrapper .process-wrapper{
    width: 780px;
    height: 48px;
    border: 1px solid #E6E6E6;
    margin: 0 auto;
    display: flex;
    line-height: 48px
  }
  
  .phoneVerification-wrapper .process-1,
  .phoneVerification-wrapper .process-2,
  .phoneVerification-wrapper .process-3{
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #333333;
    position: relative;
  }
  
  .phoneVerification-wrapper .triangle {
    width: 0;
    height: 0;
    border-width: 25px 0 25px 24px;
    border-style: solid;
    border-color: transparent transparent transparent #E6E6E6;
    position: absolute;
    top: -1px;
    right: -25px;
  }
  
  .phoneVerification-wrapper .triangle span{
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
  
  .phoneVerification-wrapper .process-wrapper .process-1.active,
  .phoneVerification-wrapper .process-wrapper .process-2.active,
  .phoneVerification-wrapper .process-wrapper .process-3.active{
    background: #13B5BB;
    color: #FFFFFF;
  }
  
  .phoneVerification-wrapper .process-wrapper .process-1.active .triangle span,
  .phoneVerification-wrapper .process-wrapper .process-2.active .triangle span{
    border-color: transparent transparent transparent #13B5BB;
  }
  
  .phoneVerification-wrapper .tips{
    font-weight: bold;
    font-size: 14px;
    color: #0C0C0C;
    padding: 29px 0;
    border-bottom: 1px solid #E6E6E6;
  }  
  
  .phoneVerification-wrapper .process-1 {
    z-index: 100;
  }  
  
  .phoneVerification-wrapper .el-form{
    margin-top: 40px;
    border-bottom: 1px solid #E6E6E6;
  }
  
  .phoneVerification-wrapper .mobileInput{
    width: 400px;
  }
  
  .phoneVerification-wrapper .codeInput{
    width: 280px;
  }
  
  .tips_content{
    margin-top: 40px;
    padding: 30px 22px;
    background: #FFFEFA;
    border: 1px solid #E7E7E7;
  }
  
  .phoneVerification-wrapper .btn-getcode{
    width: 100px;
    margin-left: 20px;
    height: 40px;
    padding: 0;
    background: #13B5BB;
    color: #FFF;
    border: none;
  }
  
  .phoneVerification-wrapper .btn-use{
    width: 400px;
    background: #13B5BB;
    color: #FFF;
    border: none;
    margin-top: 30px;
  }
  
  .phoneVerification-wrapper .warning{
    color: #FF6161;
    font-size: 12px;
  }
  
  .phoneVerification-wrapper .el-button.is-disabled,
  .phoneVerification-wrapper .el-button.is-disabled:focus, 
  .phoneVerification-wrapper .el-button.is-disabled:hover {
    color: #FFF; 
    cursor: not-allowed;
    background-image: none;
    background-color: AUTO; 
    border-color: #ebeef5;
  }
</style>