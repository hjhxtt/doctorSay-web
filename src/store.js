import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openTab:[],//所有打开的路由
    activeIndex:'/main', //激活状态
    isopen:false,//打开状态
    status: null,
    recode:null,
    headurl: '/index_r40_c29.jpg',
  },
  mutations: {
    // 添加tabs
    add_tabs (state, data) {
      this.state.openTab.push(data);
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.openTab) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.openTab.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      this.state.activeIndex = index;
    },
    //设置登录弹窗
    setLoginDialog(state,isopen){
      this.state.isopen = isopen;
    },
    // 设置当前用户状态
    set_status (state, status) {
      this.state.status = status;
    },
    set_recode (state, recode) {
      this.state.recode = recode;
    },
    set_headurl (state, url) {
      this.state.headurl = url;
    },
  },
  actions: {

  }
})
