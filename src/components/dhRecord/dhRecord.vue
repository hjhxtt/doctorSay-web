<template>
  <div class="joinRecord-wrapper">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="memberRealname"
        label="会员姓名">
      </el-table-column>
      <el-table-column
        prop="deliverstatus"
        label="审核状态">
      </el-table-column>
      <el-table-column
        label="礼品名称"
        prop="giftname">
      </el-table-column>
      <el-table-column
        prop="giftprize"
        label="所需积分">
      </el-table-column>
      <el-table-column
        prop="converttime"
        label="兑换时间">
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
      this.getConvertGiftsRecord(this.pageIndex,this.pageSize);
    },
    methods: {
      getConvertGiftsRecord(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/web/api/convertgifs/getConvertGiftsRecord',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{}
          }
        }).then((res) => {
          if(res.data.success){
            this.tableData = res.data.obj.list;
            this.pageTotal = res.data.obj.pager.total;            
          }
//        console.log(this.pageTotal);
        })        
      },
      go(currentPage){
        this.getJoinProjectList(currentPage,this.pageSize);
      },           
    }
  }
</script>

<style>
  .joinRecord-wrapper .el-table{
    font-size: 12px;
  }
  
  .joinRecord-wrapper .el-table thead tr th{
    background: #13B5BB;
    color: #FFF;
    font-size: 14px;
    height: 64px;
  }
  
  .joinRecord-wrapper .el-table th>.cell{
    border-right: 1px solid #FFF;
  }
  
  .joinRecord-wrapper .el-table thead tr th:last-child .cell{
    border: none;
  }  
  
  .joinRecord-wrapper .el-table td, .el-table th.is-leaf {
    text-align: center;
  }   
  
  .joinRecord-wrapper .el-pagination{
    background: #FFF;
    display: flex;
    justify-content: center;
    height: 80px;
    align-items: center;
  }  
  
  .joinRecord-wrapper .el-pager li.active {
    color: #FFF;
    cursor: default;
    background: #13B5BB;
    border-radius: 4px;
  }
  
  .joinRecord-wrapper .el-pager li{
    width: 40px;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
  }
  
  .joinRecord-wrapper .el-button--text{
    color:#13B5BB;
  }
  
  .joinRecord-wrapper .el-pager li.btn-quicknext, .el-pager li.btn-quickprev {
    line-height: 44px;
  }
  
  .joinRecord-wrapper .el-pagination button:disabled {
    background-color: #FFFFFF;
  }    
    
</style>