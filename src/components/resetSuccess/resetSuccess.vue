<template>
  <div class="resetSuccess-wrapper">
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
        <div class="process-3 active">
          3、重置成功
        </div>
      </div>
      
      <div class="success-img">
        <img src="../../assets/register_cg.png" alt="" />
      </div>
      <div class="success-txt">重置密码成功，赶快去登录吧~</div>
      <div class="success-btn">
        <span>立即登录</span>
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
  .resetSuccess-wrapper{
    width: 100%;
    background: #F6F6F6;
    padding-top: 20px;
    padding-bottom: 40px;
  }
  
  .resetSuccess-wrapper .resetPwd-content{
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
  
  .resetSuccess-wrapper .process-wrapper{
    width: 780px;
    height: 48px;
    border: 1px solid #E6E6E6;
    margin: 0 auto;
    display: flex;
    line-height: 48px
  }
  
  .resetSuccess-wrapper .process-1,
  .resetSuccess-wrapper .process-2,
  .resetSuccess-wrapper .process-3{
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #333333;
    position: relative;
  }
  
  .resetSuccess-wrapper .triangle {
    width: 0;
    height: 0;
    border-width: 25px 0 25px 24px;
    border-style: solid;
    border-color: transparent transparent transparent #E6E6E6;
    position: absolute;
    top: -1px;
    right: -25px;
  }
  
  .resetSuccess-wrapper .triangle span{
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
  
  .resetSuccess-wrapper .process-wrapper .process-1.active,
  .resetSuccess-wrapper .process-wrapper .process-2.active,
  .resetSuccess-wrapper .process-wrapper .process-3.active{
    background: #13B5BB;
    color: #FFFFFF;
  }
  
  .resetSuccess-wrapper .process-wrapper .process-1.active .triangle span,
  .resetSuccess-wrapper .process-wrapper .process-2.active .triangle span{
    border-color: transparent transparent transparent #13B5BB;
  }  
  
  .resetSuccess-wrapper .title{
    color: #0C0C0C;
    font-weight: bold;
    font-size: 12px;
    margin-top: 40px;
  }
  
  .resetSuccess-wrapper .phoneInput{
    width: 400px;
    margin-top: 10px;
  }
  
  .resetSuccess-wrapper .phoneInput input{
    background: #F9F9F9;
  }
  
  .resetSuccess-wrapper .btn-submit{
    width: 400px;
    background: #13B5BB;
    color: #FFFFFF;
    border: none;
    margin-top: 40px;
  }
  
  .resetSuccess-wrapper .el-select .el-input.is-focus .el-input__inner,
  .resetSuccess-wrapper .el-input__inner:focus{
    border-color: #13B5BB;
  }  
  
  .resetSuccess-wrapper .process-1 {
    z-index: 100;
  }
  
  .resetSuccess-wrapper .process-2 {
    z-index: 99;
  }  
  
  .resetSuccess-wrapper .success-img{
    text-align: center;
    margin-top: 100px;
  }
  
  .resetSuccess-wrapper .success-txt{
    text-align: center;
    font-size: 14px;
    color: #343434;
    margin-top: 15px;
  }
  
  .success-btn{
    text-align: center;
    margin-top: 15px;
  }
  
  .success-btn span{
    color: #13B5BB; 
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
  }
</style>