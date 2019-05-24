<template>
  <div class="resetPwd-wrapper">
    <div class="resetPwd-content">
      <div class="process-wrapper">
        <div class="process-1 active">
          1、提交申请
          <div class="triangle">
            <span></span>
          </div>
        </div>
        <div class="process-2 active">
          2、重置密码
          <div class="triangle">
            <span></span>
          </div>
        </div>
        <div class="process-3">
          3、重置成功
        </div>
      </div>
      
      <div class="title">
        请填写新的密码
      </div>
      <el-input placeholder="请输入新密码" class="phoneInput"></el-input>
      <el-input placeholder="请确认新密码" class="phoneInput"></el-input>
      <div>
        <el-button class="btn-submit" @click="toNext">提交</el-button>
      </div>
    </div>    
  </div>
</template>

<script>
  export default {
      data() {
        return {
        };
      },
      created(){
        
      },
      methods: {
        toNext(){
          this.$router.push({ path: '/resetSuccess' })
        }
      },
  }  
</script>

<style>
  .resetPwd-wrapper{
    width: 100%;
    background: #F6F6F6;
    padding-top: 20px;
    padding-bottom: 40px;
  }
  
  .resetPwd-wrapper .resetPwd-content{
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
  
  .resetPwd-wrapper .process-wrapper{
    width: 780px;
    height: 48px;
    border: 1px solid #E6E6E6;
    margin: 0 auto;
    display: flex;
    line-height: 48px
  }
  
  .resetPwd-wrapper .process-1,
  .resetPwd-wrapper .process-2,
  .resetPwd-wrapper .process-3{
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #333333;
    position: relative;
  }
  
  .resetPwd-wrapper .triangle {
    width: 0;
    height: 0;
    border-width: 25px 0 25px 24px;
    border-style: solid;
    border-color: transparent transparent transparent #E6E6E6;
    position: absolute;
    top: -1px;
    right: -25px;
  }
  
  .resetPwd-wrapper .triangle span{
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
  
  .resetPwd-wrapper .process-wrapper .process-1.active,
  .resetPwd-wrapper .process-wrapper .process-2.active,
  .resetPwd-wrapper .process-wrapper .process-3.active{
    background: #13B5BB;
    color: #FFFFFF;
  }
  
  .resetPwd-wrapper .process-wrapper .process-1.active .triangle span,
  .resetPwd-wrapper .process-wrapper .process-2.active .triangle span{
    border-color: transparent transparent transparent #13B5BB;
  }  
  
  .resetPwd-wrapper .title{
    color: #0C0C0C;
    font-weight: bold;
    font-size: 12px;
    margin-top: 40px;
  }
  
  .resetPwd-wrapper .phoneInput{
    width: 400px;
    margin-top: 10px;
  }
  
  .resetPwd-wrapper .phoneInput input{
    background: #F9F9F9;
  }
  
  .resetPwd-wrapper .btn-submit{
    width: 400px;
    background: #13B5BB;
    color: #FFFFFF;
    border: none;
    margin-top: 40px;
  }
  
  .resetPwd-wrapper .el-select .el-input.is-focus .el-input__inner,
  .resetPwd-wrapper .el-input__inner:focus{
    border-color: #13B5BB;
  }  
  
  .resetPwd-wrapper .process-1 {
    z-index: 100;
  }
</style>