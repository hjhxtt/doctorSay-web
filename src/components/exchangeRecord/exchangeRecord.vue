<template>
  <div class="integrationHistory-wrapper">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="converttime"
        label="兑换时间">
      </el-table-column>
      <el-table-column
        prop="giftprize"
        label="兑换金额">
      </el-table-column>
      <el-table-column
        prop="giftname"
        label="兑换礼品">
      </el-table-column>
      
      <el-table-column
        prop="deliverstatus"
        label="订单状态">
      </el-table-column>
      <el-table-column
        prop="adress"
        label="明细">
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
      }
    },
    mounted(){
      this.getConvertGiftsRecord(this.pageIndex,this.pageSize)
    },
    methods: {
      getConvertGiftsRecord(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/web/api/convertgifs/getConvertGiftsRecord',{
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
              if(this.tableData[i].deliverstatus == 0){
                this.tableData[i].deliverstatus = '待支付'
              }else if(this.tableData[i].deliverstatus == 1){
                this.tableData[i].deliverstatus = '已支付'
              }else if(this.tableData[i].deliverstatus == 3){
                this.tableData[i].deliverstatus = '无效订单'
              }else if(this.tableData[i].deliverstatus == 5){
                this.tableData[i].deliverstatus = '未发放显示原因'
              }
            }
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      go(currentPage){
        this.getConvertGiftsRecord(currentPage,this.pageSize);
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
</style>