<template>
  <div class="investgationPro-wrapper">
    <div class="filter-wrapper">
      <el-select v-model="projectState" placeholder="项目状态" @change="getMemberProjectList(pageIndex,pageSize)">
        <el-option label="正在进行" value="0"></el-option>
        <el-option label="已完成" value="1"></el-option>
        <el-option label="等待积分处理" value="2"></el-option>
        <el-option label="暂停" value="3"></el-option>
        <el-option label="尚未开始" value="5"></el-option>
        <el-option label="项目撤销" value="6"></el-option>
      </el-select>
      <el-select v-model="joinState" placeholder="参与状态" @change="getMemberProjectList(pageIndex,pageSize)">
        <el-option label="未参与" value="0"></el-option>
        <el-option label="已参与" value="1"></el-option>
      </el-select>

      <el-input placeholder="调查编号/调查名称" class="searchInput" v-model="search" suffix-icon="el-icon-search" @change="getMemberProjectList(pageIndex,pageSize)"></el-input>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="projectId"
        label="调查编号">
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="调查名称">
      </el-table-column>
      <el-table-column
        prop="projectState"
        label="调查状态">
      </el-table-column>
      <el-table-column
        prop="joinState"
        label="参与状态">
      </el-table-column>
      <el-table-column
        prop="projectIntegral"
        label="调查酬金">
      </el-table-column>
      <el-table-column
        prop="projectEndTime"
        label="结束时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small"  @click="gotowelcome(scope.row)">立即参与</el-button>

        </template>
      </el-table-column>
    </el-table>
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
        value: '',
        projectState:0,
        joinState:null,
        search:null,
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
        pageIndex: 1,
        pageSize: 12,
        pageTotal: null,
      }
    },
    mounted(){
      this.getMemberProjectList(this.pageIndex,this.pageSize)
      if(this.projectState == 0 ){
          this.projectState = '正在进行'
      }
    },
    methods: {
      gotowelcome(data){
              

                this.axios.get(this.common.getApi() + '/web/api/project/goToProjectJoinPage',{
                  params:{
                    params:{
                      id: Number(data.id),
                    }
                  }
                },{
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }).then((res) => {
                  if(res.data.success){
                    console.log(res.data.obj);
                    
                    this.$router.push({
                      path:'/welcomeAnser',
                      query:{
                        params:JSON.stringify(res.data.obj),
                        data:JSON.stringify(data)
                      }
                    })
                  }else{
                    this.$message.error(res.data.msg);
                  }
                })
                
      },
      getMemberProjectList(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/web/api/project/getMemberProjectList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
              projectState: this.projectState,
              joinState: this.joinState,
              search: this.search,
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.tableData = res.data.obj.list;
            this.pageTotal = res.data.obj.pager.total;
            for(var i = 0; i < this.tableData.length; i++){
              if(this.tableData[i].projectState == 0){
                this.tableData[i].projectState = "正在进行"
              }else if(this.tableData[i].projectState == 1){
                this.tableData[i].projectState = "已完成"
              }else if(this.tableData[i].projectState == 2){
                this.tableData[i].projectState = "等待积分处理"
              }else if(this.tableData[i].projectState == 3){
                this.tableData[i].projectState = "暂停"
              }else if(this.tableData[i].projectState == 5){
                this.tableData[i].projectState = "尚未开始"
              }else if(this.tableData[i].projectState == 6){
                this.tableData[i].projectState = "项目撤销"
              }
              if(this.tableData[i].joinState == 0){
                this.tableData[i].joinState = "未参与"
              }else if(this.tableData[i].joinState == 1){
                this.tableData[i].joinState = "已参与"
              }
            }
          }
        })
      },
      go(currentPage){
        this.getMemberProjectList(currentPage,this.pageSize);
      },
    }
  }
</script>

<style>
  .investgationService-wrapper {
    min-height: 500px;
  }

  .investgationService .investgationService-wrapper .el-main{
    padding: 0;
    padding-left: 20px;
  }

  .investgationService .investgationService-wrapper .el-main .el-select{
    width: 180px;
    margin-right: 15px;
  }

  .investgationService .investgationService-wrapper .el-main .searchInput.el-input {
    width: 280px;
  }

  .investgationService .investgationService-wrapper .el-main .el-date-editor.el-input{
    width: 180px;
    margin-right: 15px;
  }

  .investgationService-wrapper .el-select .el-input.is-focus .el-input__inner,
  .investgationService-wrapper .el-input__inner:focus{
    border-color: #13B5BB;
  }

  .investgationService-wrapper .filter-wrapper{
    margin-bottom: 20px;
  }

  .investgationService-wrapper .el-table td, .el-table th.is-leaf {
    text-align: center;
  }

  .investgationService-wrapper .el-main .el-pagination{
    background: #FFF;
    display: flex;
    justify-content: center;
    height: 80px;
    align-items: center;
  }

  .investgationService-wrapper .el-table{
    font-size: 12px;
  }

  .investgationService-wrapper .el-table thead tr th{
    background: #13B5BB;
    color: #FFF;
    font-size: 14px;
    height: 64px;
  }

  .investgationService-wrapper .el-main .el-table th>.cell{
    border-right: 1px solid #FFF;
  }

  .investgationService-wrapper .el-main .el-table thead tr th:last-child .cell{
    border: none;
  }

  .investgationService-wrapper .el-pager li.active {
    color: #FFF;
    cursor: default;
    background: #13B5BB;
    border-radius: 4px;
  }

  .investgationService-wrapper .el-pager li{
    width: 40px;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
  }

  .investgationService-wrapper .el-button--text{
    color:#13B5BB;
  }

  .investgationService-wrapper .el-pager li.btn-quicknext, .el-pager li.btn-quickprev {
    line-height: 44px;
  }

  .investgationService-wrapper .el-pagination button:disabled {
    background-color: #FFFFFF;
  }
</style>