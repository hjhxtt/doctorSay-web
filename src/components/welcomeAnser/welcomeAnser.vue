<template>
    <div class="welcome">
        <div v-if="rightNow">
          <h3 v-html="welcome"></h3>
          <p>参与{{this.userData.projectName}}项目，完成即可获得{{this.userData.projectIntegral}}积分</p>
          <div class="join" @click="start">
              马上答题
          </div>
        </div>
        <div v-else>
          <h3>答题完毕</h3>
          <p>{{returnMsg}}</p>
          <div class="join" @click="goOut">
              返回
          </div>
        </div>
        
    </div>
</template>
<script>
    export default{
        mounted(){
            if(window.location.href.indexOf('hdosid') != -1){
              var self = this;
              self.fetchData();
            }else{
              this.usePara()
            }
        },
        data(){
            return {
                returnMsg:'',
                rightNow:true,
                userData:{},
                welcome:'',
            }
        },
        methods:{
            goOut(){
              this.$router.push('/personalIndex')
            },
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
                    location.href=res.data.obj
                  }else{
                    this.$message.error(res.data.msg);
                  }
                })
            },
            usePara(){
              this.welcome = JSON.parse(this.$route.query.params).welcomecontent
              this.userData = JSON.parse(this.$route.query.data)
              
            },
            fetchData(){

              function getQueryVariable(variable){
                    var str = window.location.href
                    var query = str.slice(str.indexOf('?')+1,str.length);
                    var vars = query.split("&");
                    for (var i=0;i<vars.length;i++) {
                            var pair = vars[i].split("=");
                            if(pair[0] == variable){return pair[1];}
                    }
                    return(false);
                  }
              var hdosid = getQueryVariable('hdosid')
              var s = getQueryVariable('s')
              var hdopid = getQueryVariable('hdopid')
              var url = window.location.href
              
              

              this.axios.post(this.common.getApi() + '/web/api/receive/receiveInfo',{
                params:{
                  hdosid:hdosid,
                  s:s,
                  hdopid:hdopid,
                  url:url
                }
              }).then((res) => {
                if(res.data.success){
                  console.log(res.data);
                  this.returnMsg = res.data.obj.message
                  this.rightNow = false
                }else{
                  this.$message.error(res.data.msg)
                }
              })
              
          }
        },
        watch: {
            '$route':'fetchData'
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