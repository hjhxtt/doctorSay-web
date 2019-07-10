<template>
  <div class="relatedRecord-wrapper">
    <div class="nav-header">
      <router-link v-for="(item,index) in navlist" :to="item.path" :key="item">
        <!-- <div v-bind:class="{active:path == item.path?true:false}">{{item.name}}</div> -->
        <!-- 加active -->
        <div class="active">{{item.name}}</div>
      </router-link>
      <span style="font-size:14px;padding-top:9px;margin-left:10px;font-weight:700;">总获得积分：{{total}}</span>
      <span style="font-size:14px;padding-top:9px;margin-left:10px;font-weight:700;">总兑换积分：{{exchangeTotal}}</span>
      <span style="font-size:14px;padding-top:9px;margin-left:10px;font-weight:700;">当前积分：{{now}}</span>
    </div>

    <div class="table-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        now:'',
        total:'',
        exchangeTotal:'',
        id:'',
        path:'',
        text:'',
        navlist:[
          // {name:'获得积分',path:'/joinRecord'},
          // {name:'兑换积分',path:'/dhRecord'},
          {name:'积分记录',path:'/jfRecord'}
        ]
      };
    },
    methods: {
      getMemberInfo(){
        this.axios.get(this.common.getApi() + '/web/api/member/getMemberInfo','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){

            this.id = res.data.obj.id
            this.getRecod()
            
          }
        })
      },
      getRecod(){
        this.axios.get(this.common.getApi() + '/web/api/member/getMemberTotal',{
          params:{
            id:this.id
          }
        }).then((res) => {
          if(res.data.success){
            this.total = res.data.obj.total
            this.exchangeTotal = Math.abs(res.data.obj.exchangeTotal)
            this.now = this.total - this.exchangeTotal
          }
        })
      }
    },
    mounted(){
      this.path = this.$route.path;
      console.log(this.path);
      this.getRecod()
      this.getMemberInfo()
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          this.path = this.$route.path;
          console.log(this.path);
        },
        // 深度观察监听
        deep: true
      }
    },
  }
</script>

<style>
  .relatedRecord-wrapper .nav-header{
    display: flex;
  }

  .relatedRecord-wrapper .nav-header{
    margin-bottom: 20px;
  }

  .relatedRecord-wrapper .nav-header div{
    padding: 10px 15px;
    font-size: 14px;
    cursor: pointer;
  }

  .relatedRecord-wrapper .nav-header div.active{
    background: #13B5BB;
    color: #FFF;
    border-radius: 5px;
  }

  .relatedRecord-wrapper .nav-header div:nth-child(2){
    margin: 0 10px;
  }

  .relatedRecord-wrapper .table-wrapper{
    width: 100%;
    background: #FFFFFF;
    min-height: 998px;
  }

  .relatedRecord-wrapper .nav-header a{
    text-decoration: none;
    color: #333;
  }
</style>