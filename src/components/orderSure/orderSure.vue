<template>
  <div class="orderSure-wrapper">
    <div class="order-content">
      <div class="title">
        <span>确认兑换信息</span>
        <span><i><<</i>返回积分商城</span>
      </div>
      <router-view></router-view>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="pro_img"
          label="">
            <template slot-scope="scope">
              <div style="width: 120px;height: 90px;background: #D3BABD;"></div>
            </template>
        </el-table-column>
        <el-table-column
          prop="pro_name"
          label="礼品信息">
        </el-table-column>
        <el-table-column
          prop="pro_money"
          label="消耗积分">
        </el-table-column>
        <el-table-column
          prop="pro_num"
          label="礼品数量">
        </el-table-column>
        <el-table-column
          prop="pro_deType"
          label="配送方式">
        </el-table-column>
      </el-table>

      <div class="btn-content">
        <el-button class="btn-submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          pro_img: '<img src="../../assets/home_banner.png">',
          pro_name: '迷你智能暖风机',
          pro_money: '-200',
          pro_num: 1,
          pro_deType: '顺丰包邮'
        }, {
          pro_img: '2016-05-02',
          pro_name: '迷你智能暖风机',
          pro_money: '-200',
          pro_num: 1,
          pro_deType: '顺丰包邮'
        }, {
          pro_img: '2016-05-02',
          pro_name: '迷你智能暖风机',
          pro_money: '-200',
          pro_num: 1,
          pro_deType: '顺丰包邮'
        }]
      }
    }
  }
</script>

<style>
  .orderSure-wrapper{
    background: #F6F6F6;
    padding-top: 20px;
    padding-bottom: 200px;
  }

  .orderSure-wrapper .order-content{
    width: 1180px;
    min-height: 900px;
    background: #FFF;
    margin: 0 auto;
    padding: 0 100px 0 80px;
    box-sizing: border-box;
  }

  .orderSure-wrapper .title{
    height: 99px;
    line-height: 99px;
    border-bottom: 1px solid #E6E6E6;
    margin-bottom: 39px;
    display: flex;
    justify-content: space-between;
  }

  .orderSure-wrapper .title span:nth-child(1){
    font-size: 18px;
    color: #343434;
    font-weight: bold;
  }

  .orderSure-wrapper .title span:nth-child(2){
    font-size: 14px;
    color: #4D4D4D;
    cursor: pointer;
  }

  .orderSure-wrapper .title span:nth-child(2) i{
    color: #13B5BB;
    font-size: 7px;
  }

  .orderSure-wrapper .el-table--border::after,
  .orderSure-wrapper .el-table--group::after,
  .orderSure-wrapper .el-table::before{
    background-color: #333333;
    height: 2px;
  }

  .orderSure-wrapper .el-table td{
    border-bottom: none;
    border-top: 2px solid #A1A1A1;
    text-align: center;
  }

  .orderSure-wrapper .el-table th.is-leaf {
    border-bottom: 2px solid #333333;
    border-top: 2px solid #A1A1A1;
    text-align: center;
  }

  .orderSure-wrapper .el-table__header{
    margin-bottom: 2px;
  }

  .orderSure-wrapper .el-table td,
  .orderSure-wrapper .el-table th{
    padding: 23px 0;
  }

  .orderSure-wrapper .el-table thead .cell {
    width: 100%;
    border-right: 1px solid #E6E5E5;
    min-height: 23px;
  }

  .orderSure-wrapper .btn-submit{
    margin: 40px 0;
    background: #13B5BB;
    color: #FFFFFF;
    border: 0;
    width: 100px;
    height: 40px;
  }

  .orderSure-wrapper .btn-submit:focus,
  .orderSure-wrapper .btn-submit:hover {
    border-color: #036C68;
    background-color: #15BFC1;
  }

  .orderSure-wrapper .btn-content{
    text-align: right;
  }

  .orderSure-wrapper .el-table__body tbody tr:last-child td{
    border-bottom: 2px solid #A1A1A1;
  }

  .orderSure-wrapper .el-table__body{
    padding-bottom: 4px;
  }
</style>