<template>
  <div class="integrationHistory-wrapper">
    <p class="but">推荐记录</p><span style="font-weight:700;">我的推荐码：{{smscode}}</span>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="memberRealname"
        label="推荐人姓名">
      </el-table-column>
      <el-table-column
        prop="memberState"
        label="推荐人激活状态">
      </el-table-column>
      <el-table-column
        prop="registerTime"
        label="推荐人注册时间">
      </el-table-column>
      
      <el-table-column
        prop="integral"
        label="我推荐的奖励积分">
      </el-table-column>
      <el-table-column
        prop="isblackname"
        label="推荐人认证状态">
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
        tableData: [],
        pageIndex: 1,
        pageSize: 12,
        pageTotal: null,
        smscode:''
      }
    },
    mounted(){
      this.getMemberRecommendRecord(this.pageIndex,this.pageSize)
      this.getMemberInfo()
    },
    methods: {
      getMemberInfo(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/web/api/member/getMemberInfo').then((res) => {
          if(res.data.success){

            this.smscode = res.data.obj.smscode
            
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      getMemberRecommendRecord(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/web/api/member/getMemberRecommendRecord',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
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
              if(this.tableData[i].isblackname == 0){
                this.tableData[i].isblackname = '未审核'
              }else if(this.tableData[i].isblackname == 2){
                this.tableData[i].isblackname = '审核通过'
              }else if(this.tableData[i].isblackname == 3){
                this.tableData[i].isblackname = 'ID审核'
              }else if(this.tableData[i].isblackname == 4){
                this.tableData[i].isblackname = '待定'
              }else if(this.tableData[i].isblackname == 5){
                this.tableData[i].isblackname = '未审核通过'
              }else if(this.tableData[i].isblackname == 6){
                this.tableData[i].isblackname = '信息填写错误'
              }else if(this.tableData[i].isblackname == 7){
                this.tableData[i].isblackname = '科室电话错误'
              }else if(this.tableData[i].isblackname == 8){
                this.tableData[i].isblackname = '未联系到本人'
              }else if(this.tableData[i].isblackname == 9){
                this.tableData[i].isblackname = '不良和注销'
              }else if(this.tableData[i].isblackname == 10){
                this.tableData[i].isblackname = '测试'
              }

              if(this.tableData[i].memberState == 1){
                this.tableData[i].memberState = '已激活'
              }else{
                this.tableData[i].memberState = '未激活'
              }
            }

          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      go(currentPage){
        this.getMemberRecommendRecord(currentPage,this.pageSize);
      },
    }
  }
</script>

<style>
  .integrationHistory-wrapper{
    background: #FFFFFF;
    min-height: 900px;
  }

  .el-table td, .el-table th.is-leaf {
    text-align: center;
  }

  .integrationHistory-wrapper .el-pagination{
    background: #FFF;
    display: flex;
    justify-content: center;
    height: 80px;
    align-items: center;
  }

  .el-table{
    font-size: 12px;
  }

  .el-table thead tr th{
    background: #13B5BB;
    color: #FFF;
    font-size: 14px;
    height: 64px;
  }

  .integrationHistory-wrapper .el-table th>.cell{
    border-right: 1px solid #FFF;
  }

  .integrationHistory-wrapper .el-table thead tr th:nth-child(6) .cell{
    border: none;
  }

  .integrationHistory-wrapper .el-pager li.active {
    color: #FFF;
    cursor: default;
    background: #13B5BB;
    border-radius: 4px;
  }

  .integrationHistory-wrapper .el-pager li{
    width: 40px;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
  }

  .integrationHistory-wrapper .el-button--text{
    color:#13B5BB;
  }

  .integrationHistory-wrapper .el-pager li.btn-quicknext,
  .integrationHistory-wrapper .el-pager li.btn-quickprev {
    line-height: 44px;
  }

  .integrationHistory-wrapper .el-pagination button:disabled {
    background-color: #FFFFFF;
  }

  .integrationHistory-wrapper .el-pagination{
    background: #FFFFFF;
  }

  .integrationHistory-wrapper .el-pager li {
    background: #FFF;
  }

  .integrationHistory-wrapper .el-pagination button:disabled {
    background-color: #FFFFFF;
  }

  .integrationHistory-wrapper .el-pagination .btn-next,
  .integrationHistory-wrapper .el-pagination .btn-prev {
    background: center center no-repeat #FFFFFF;
  }
  .el-table__row {
    height: 70px;
}
p.but{
    display: inline-block;
    background: #13B5BB;
    color: #FFF;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 14px;
    margin: 20px;
}
</style>