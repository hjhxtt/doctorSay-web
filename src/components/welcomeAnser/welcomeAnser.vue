<template>
    <div class="welcome">
        <h3 v-html="welcome"></h3>
        <p>参与{{this.userData.projectName}}项目，完成即可获得{{this.userData.projectIntegral}}积分</p>
        <div class="join" @click="start">
            立即参与
        </div>
    </div>
</template>
<script>
    export default{
        mounted(){
            this.usePara()
            
        },
        data(){
            return {
                userData:{},
                welcome:'',
            }
        },
        methods:{
            start(){
              
              this.axios.get(this.common.getApi() + '/web/api/project/startAnswer',{
                  params:{
                    params:{
                      id: this.userData.id,
                      type:0
                    }
                  }
                },{
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }).then((res) => {
                  if(res.data.success){
                    console.log(res.data);
                    //location.href=res.data.obj
                    //location.href='http://www.baidu.com'
                  }else{
                    this.$message.error(res.data.msg);
                  }
                })
            },
            usePara(){
              this.welcome = JSON.parse(this.$route.query.params).welcomecontent
              this.userData = JSON.parse(this.$route.query.data)
              
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