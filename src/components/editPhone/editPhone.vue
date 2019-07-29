<template>
  <div class="editPass-wrapper">
    <div class="editPass-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="新手机号" prop="phoneNum">
          <el-input type="text" v-model="form.phoneNum" placeholder="" style="width: 200px;"></el-input>
          <el-button v-show="show" class="btn-getcode" @click="sendMsg">发送短信验证码</el-button>
          <el-button v-show="!show" class="btn-getcode" disabled>{{count}}s</el-button>
        </el-form-item>
        <el-form-item label="输入短信验证码" prop="msgCode">
          <el-input type="text" v-model="form.msgCode" placeholder="" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-use" @click="submitMsg('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>    
  </div>
</template>

<script>
  export default {
    data() {  
      var validatePhone =(rule, value, callback) =>{
        var  phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if( !phoneReg.test(value)){
          callback(new Error('请输入正确的手机号'));
        }

      }   
      return {
        memberHandphone:'',
        show: true,
        count: '',
        timer: null,
        form: {
          phoneNum: null,
          msgCode: null,
        },
        rules: {
          phoneNum:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],  
          msgCode:[
            { required: true, message: '请输入短信验证码', trigger: 'blur' }
          ],          
        },        
      }
    },
    mounted(){
      this.getMemberInfo()
    },
    methods: {
      getMemberInfo(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/web/api/member/getMemberInfo').then((res) => {
          if(res.data.success){

            this.memberHandphone = res.data.obj.memberHandphone
            
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      sendMsg(){
        debugger
        var  phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/

        if(this.form.phoneNum === null || !phoneReg.test(this.form.phoneNum)){
          this.$message.error('请输入正确手机号')
          return false
        }
        const TIME_COUNT = 60;
        if(!this.timer){
          this.count = TIME_COUNT;
          this.show = false;

        ///hjhtodo
          let param = new URLSearchParams()
          param.append('memberHandPhone', this.form.phoneNum)

          this.axios({
            method: 'post',
            url: this.common.getApi() + '/web/api/register/sendVerifiCode',
            data: param
          }).then(res=>{
            
            if(res.data.success){
              this.$message.success('发送成功')
            }else{
              this.$message.error(res.data.msg)
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
            
            
            
          })

          // this.axios.post(this.common.getApi() + '/web/api/register/sendVerifiCode',{
          //   param
          // }).then((res) => {
          //   if(res.data.success){

          //   }else{
          //     this.$message.error(res.data.msg);
          //   }
          // }) 
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
      
      onSubmit() {
        console.log('submit!');
      },
      submitMsg(){
            debugger
          if(this.form.phoneNum == null  || this.form.msgCode == null){
            this.$message.error('请输入手机号和验证码')
            return false
          }

          let param = new URLSearchParams()
          param.append('memberHandPhone', this.form.phoneNum)
          param.append('oldPhoneNumber', this.memberHandphone)
          param.append('vireCode', this.form.msgCode)

          this.axios({
            method: 'post',
            url: this.common.getApi() + '/web/api/register/checkVerifiCode',
            data: param
          }).then(res=>{
            if(res.data.success){
              this.$message.success('修改成功')
            }else{
              this.$message.error(res.data.msg);
            }
            
            
          })

            // this.axios.post(this.common.getApi() + '/web/api/register/checkVerifiCode',{
            //     oldPhoneNumber:this.memberHandphone,
            //     memberHandPhone:this.form.phoneNum,
            //     vireCode:this.form.msgCode
            // }).then((res) => {
            //   if(res.data.success){
            //     this.$message({
            //       type: 'success',
            //       message: '修改成功'
            //     })
            //   }else{
            //     this.$message.error(res.data.msg);
            //   }
            // })    
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
    width: 120px;
    margin-left: 20px;
    height: 40px;
    padding: 0 10px;
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
  .sendMsg{
    display: inline-block;
    background: #13B5BB;
    color: #FFF;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    margin-left: 20px;
  }
  .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
    background-color: #ebeef5;
  }
</style>