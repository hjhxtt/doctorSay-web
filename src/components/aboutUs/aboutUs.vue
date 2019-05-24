<template>
  <div class="aboutUs">
    <div class="aboutUs-wrapper">
      <el-container>
        <el-aside width="280px">
          <el-row class="tac">
            <el-col :span="24">
              <div class="header">
                <span>关于我们</span>
              </div>
              <el-menu
                :default-active="path"
                background-color="#fff"
                text-color="#000"
                active-text-color="#13B5BB"
                :router="true">
                <el-menu-item index="companyIntr">
                  <span slot="title">公司介绍</span>
                </el-menu-item>
                <el-menu-item index="privacyStatement">
                  <span slot="title">隐私声明</span>
                </el-menu-item>
                <el-menu-item index="feedback">
                  <span slot="title">业务联系</span>
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
      };
    },
    created(){
      this.path = this.$route.path.substr(1,this.$route.path.length);
      console.log(this.path);
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .aboutUs{
    background: #F6F6F6;
    padding-top: 20px;
  }
  
  .aboutUs .aboutUs-wrapper{
    width: 1180px;
    margin: 0 auto;
  }
  
  .aboutUs .aboutUs-wrapper .el-menu{
    border:none;
  }
  
  .aboutUs .aboutUs-wrapper .header{
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
  
  .aboutUs .aboutUs-wrapper .el-menu-item{
    height: 80px;
    line-height: 80px;
    font-size: 16px;
    color:#0C0C0C;
  }
  
  .aboutUs .aboutUs-wrapper .el-menu-item.is-active{
    border-left: 4px solid #13B5BB;  
  }
  
  .aboutUs .aboutUs-wrapper .el-main{
    margin-bottom: 80px;
    padding: 0;
    padding-left: 20px;
  }
  
  .aboutUs .aboutUs-wrapper .el-menu li:nth-child(1){
    border-top: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;
  }
  
  .aboutUs .aboutUs-wrapper .el-menu li:nth-child(2){
    border-bottom: 1px solid #E5E5E5;
  }    
</style>