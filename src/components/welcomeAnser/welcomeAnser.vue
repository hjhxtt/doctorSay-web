<template>
    <div class="welcome">
        <h3>欢迎您</h3>
        <p>参与{{this.userData.projectName}}项目，完成即可获得{{this.userData.projectIntegral}}积分</p>
        <div class="join" @click="goToProjectJoinPage">
            立即参与
        </div>
    </div>
</template>
<script>
    export default{
        mounted(){
            this.userData = JSON.parse(sessionStorage.getItem('userData'))
            console.log(this.userData);
        },
        data(){
            return {
                userData:{}
            }
        },
        methods:{
            goToProjectJoinPage(){
                this.axios.get(this.common.getApi() + '/web/api/project/goToProjectJoinPage',{
                  params:{
                    params:{
                      id: this.userData.id,
                    }
                  }
                },{
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }).then((res) => {
                  if(res.data.success){
                    location.href="http://www.baidu.com"
                  }else{
                    this.$message.error(res.data.msg);
                  }
                })
              }
        },
    }
</script>
<style scoped>
    .welcome{
        text-align: center;
        padding:100px 0;
    }
    h3{
        font-size:35px;
        margin-bottom: 50px;
    }
    p{
        font-size:18px;
        line-height: 36px;
        margin-bottom: 50px;
    }
    .join{
        display: inline-block;
        width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        border-radius:10px;
        cursor: pointer;
        background: #13B5BB;
        color:#fff;
    }
</style>