<template>
  <div class="integrationUse-wrapper">
    <div class="filter-wrapper">
      <el-select v-model="giftstairkind" placeholder="全部类型" class="typeSelect" @change="getGiftsList(pageIndex,pageSize)">
        <el-option
          v-for="item in categoryList"
          :key="item.categoryName"
          :label="item.categoryName"
          :value="item.categoryName">
        </el-option>
      </el-select>
      <el-select v-model="integralRange" placeholder="积分不限" class="integrationSelect" @change="getGiftsList(pageIndex,pageSize)">
        <el-option label="1-200" value="1"></el-option>
        <el-option label="200-500" value="2"></el-option>
        <el-option label="500-" value="3"></el-option>
      </el-select>
      <el-input placeholder="搜索礼品" class="searchInput" v-model="giftsName" suffix-icon="el-icon-search" @change="getGiftsList(pageIndex,pageSize)"></el-input>
    </div>
    
    <ul class="quanyi-list">
      <router-link :to="{path:'/proDetail',query: {id: item.id}}" v-for="item in giftsList">
        <li>
          <div class="quanyi-img" style="width: 280px;">
            <img :src="baseurl + item.giftpicurl" alt="" style="width: 280px;height: 210px"/>
          </div>
          <div class="quanyi-info">
            <p class="quanyi-name">{{item.giftname}}</p>
            <p class="quanyi-money"><span class="icon-jf"><img src="../../assets/icon_jf.png" alt="" /></span>{{item.giftprize}}</p>
          </div>
        </li>
      </router-link>
    </ul>
    <el-pagination
      layout="prev, pager, next"
      :total="pageTotal"
      :page-size="pageSize"
      @current-change="go">
    </el-pagination>  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [],
        categoryList:[],
        giftsList:[],
        giftstairkind:null,
        integralRange: null,
        giftsName:null,
        value: '',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        tableData: [],
        pageIndex:1,
        pageSize:6,
        pageTotal: null,
        baseurl: baseurl,
      }
    },
    mounted(){
      this.getGiftCategoryList();
      this.getGiftsList(this.pageIndex,this.pageSize);
    },
    methods: {
      getGiftCategoryList(){
        this.axios.get(this.common.getApi() + '/web/api/giftcategory/getGiftCategoryList',{
          params:{
//          pageIndex: pageIndex,
//          pageSize: pageSize
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.categoryList = res.data.obj;
        })
      },
      getGiftsList(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/web/api/gifts/getGiftsList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
              giftstairkind: this.giftstairkind,
              integralRange: this.integralRange,
              giftsName: this.giftsName,
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.giftsList = res.data.obj.list;
          this.pageTotal = res.data.obj.pager.total;
        })
      },
      go(currentPage){
        this.getGiftsList(currentPage,this.pageSize);
      },
    },
  }      
</script>

<style>
  .integrationCenter-wrapper .el-main{
    padding: 0;
    padding-left: 20px;
  }
  
  .integrationUse-wrapper .timeSelect.el-select{
    width: 80px;
    margin-right: 15px;
  }
  
  .integrationUse-wrapper{
    min-height: 666px;
  }
  
  .integrationUse-wrapper .typeSelect.el-select,
  .integrationUse-wrapper .integrationSelect.el-select{
    width: 180px;
    margin-right: 15px;
  }
  
  .integrationUse-wrapper .searchInput.el-input{
    width: 380px;
  }
  
  .el-select .el-input.is-focus .el-input__inner,
  .el-input__inner:focus{
    border-color: #13B5BB;
  }
  
  .integrationUse-wrapper .filter-wrapper{
    margin-bottom: 20px;
  }
  
  .integrationUse-wrapper .quanyi-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  .integrationUse-wrapper .quanyi-list li{
    margin-right: 20px;
    background: #FFF;
    margin-bottom: 20px;
    box-shadow:0px 4px 16px 0px rgba(0,0,0,0.1);
    cursor: pointer;
  }
  
  .integrationUse-wrapper .quanyi-list a:nth-child(3n) li{
    margin-right: 0;
  }
  
  .integrationUse-wrapper .quanyi-info{
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 16px;
  }
  
  .integrationUse-wrapper .quanyi-name{
    font-size: 14px;
    color: #0C0C0C;
    font-weight: bold;
  }
  
  .integrationUse-wrapper .quanyi-money{
    color: #989898;
    font-size: 14px;
    margin-top: 8px;
    display: flex;
    align-items: center;
  }
  
  .integrationUse-wrapper .quanyi-money img{
    width: 15px;
    margin-right: 5px;
  }
  
  .integrationUse-wrapper .el-pager li.active {
    color: #FFF;
    cursor: default;
    background: #13B5BB;
    border-radius: 4px;
  }
  
  .integrationUse-wrapper .el-pager li{
    width: 40px;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    background: #F6F6F6;
  }
  
  .integrationUse-wrapper .el-button--text{
    color:#13B5BB;
  }
  
  .integrationUse-wrapper .el-pager li.btn-quicknext, 
  .integrationUse-wrapper .el-pager li.btn-quickprev {
    line-height: 44px;
  }  
  
  .integrationUse-wrapper .el-pagination{
    background: #F6F6F6;
    display: flex;
    justify-content: center;
    height: 80px;
    align-items: center;
  }
  
  .integrationUse-wrapper .el-pagination .btn-next,
  .integrationUse-wrapper .el-pagination .btn-prev {
    background: center center no-repeat #F6F6F6; 
  }
  
  .integrationUse-wrapper .el-pagination button:disabled {
    background-color: #F6F6F6;
  }
  
  a{
    text-decoration: none;
  }
</style>