<template>
  <div class="relatedRecord-wrapper">
    <div class="nav-header">
      <router-link v-for="(item,index) in navlist" :to="item.path" :key="item">
        <div v-bind:class="{active:path == item.path?true:false}">{{item.name}}</div>
      </router-link>
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
        path:'',
        text:'',
        navlist:[
          {name:'参与记录',path:'/joinRecord'},
          {name:'兑换记录',path:'/dhRecord'},
          {name:'积分记录',path:'/jfRecord'}
        ]
      };
    },
    methods: {

    },
    mounted(){
      this.path = this.$route.path;
      console.log(this.path);
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