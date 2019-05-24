<template>
  <div class="proDetail-wrapper">
    <div class="proContent">
      <div class="proImg" style="width: 280px;"><img :src="baseurl + giftpicurl" alt="" width="280px" height="210px"/></div>
      <div class="proDetail">
        <div style="font-size: 24px;font-weight: bold;font-style: italic;">/</div>
        <div class="proName">{{giftname}}</div>
        <div class="proMoney">所需积分：{{giftprize}}积分</div>
        <div>
          <el-button class="btn-use" @click="toOrder">立即兑换</el-button>
        </div>
      </div>
    </div>
    
    
    <div class="proDescribe">
      <div class="title">奖品描述</div>
      <div class="describe-txt">
        {{giftdiscribe}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        giftname:null,
        giftprize:null,
        giftdiscribe:null,
        giftstairkind:null,
        giftpicurl:null,
        baseurl: baseurl,
      }
    },
    mounted(){
      this.getGifts();
    },
    methods:{
      getGifts(){
        this.axios.get(this.common.getApi() + '/web/api/gifts/getGifts',{
          params:{
            params:{
              id: Number(this.$route.query.id)              
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.giftname = res.data.obj.giftname;
            this.giftprize = res.data.obj.giftprize;
            this.giftdiscribe = res.data.obj.giftdiscribe;
            this.giftstairkind = res.data.obj.giftstairkind;
            this.giftpicurl = res.data.obj.giftpicurl;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      toOrder(){
        this.axios.get(this.common.getApi() + '/web/api/convertgifs/checkExchangeGifts',{
          params:{
            params:{
              id: Number(this.$route.query.id)              
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            if(this.giftstairkind == "虚拟奖品"){
              this.$router.push({path: '/orderPhonepays',query:{id: this.$route.query.id,giftprize: this.giftprize,giftname: this.giftname,giftpicurl: this.giftpicurl}});
            }else if(this.giftstairkind == "现金兑换"){ 
              this.$router.push({path: '/orderCash',query:{id: this.$route.query.id,giftprize: this.giftprize,giftname: this.giftname,giftpicurl: this.giftpicurl}});
            }
          }else{
            this.$message.error(res.data.msg);
          }
        })
      }
    }
  }  
</script>

<style>
  .proDetail-wrapper{
    width: 100%;
    background: #FFF;
    padding: 40px;
    box-sizing: border-box;
    min-height: 900px;
  }
  
  .proDetail-wrapper .proContent{
    display: flex;
    padding-bottom: 40px;
    border-bottom: 1px solid #E6E6E6;
  }
  
  .proDetail-wrapper .proContent .proName{
    font-size: 21px;
    font-weight: bold;
    margin-top: 25px;
  }
  
  .proDetail-wrapper .proContent .proMoney{
    font-size:16px;
    font-weight:400;
    color: #999999;
    margin-top: 5px;
  }
  
  .proDetail-wrapper .btn-use{
    color: #FFFFFF;
    background: #13B5BB;
    border: none;
    margin-top: 62px;
  }  
  
  .proDetail-wrapper .proImg{
    margin-right: 20px;
  }
  
  .proDetail{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .proDetail-wrapper .proDescribe .title{
    font-size:18px;
    font-weight:bold;
    color:#0C0C0C;
    margin: 28px 0;
  }
  
  .proDetail-wrapper .describe-txt{
    font-size:14px;
    color: #676767;
  }
</style>