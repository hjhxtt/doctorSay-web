<template>
  <main id="main">
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </main>
</template>

<script>
  import header from '../header/header'
  import footer from '../footer/footer'

  export default {
    name: 'App',
    data: function() {
      return{
        
      }
    },
    mounted(){
  
    },
    components: {
      'v-header':header,
      'v-footer':footer
    },
    methods:{
      
    }  
  }
</script>

<style>

</style>