<template>
  <div class="address-wrapper">
    <div class="title">
      收货地址
    </div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="地址消息" required>
        <el-select v-model="province" class="provinceSelect" placeholder="请选择省份"></el-select>
        <el-select v-model="city" class="citySelect" placeholder="请选择城市"></el-select>
        <el-select v-model="region" class="regionSelect" placeholder="请选择地区"></el-select>
      </el-form-item>
      <el-form-item label="详细地址" required>
         <el-input type="textarea" v-model="address" resize="none" class="addressInput"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" required>
        <el-input v-model="post_code" class="postcodeInput"></el-input>
      </el-form-item>
      <el-form-item label="收货人" required>
        <el-input v-model="name" class="nameInput"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" required>
        <el-input v-model="mobile" class="mobileInput"></el-input>
      </el-form-item>
      <el-form-item required>
        <el-checkbox v-model="checked">设置为默认地址</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-save">保存</el-button>
      </el-form-item>
    </el-form>
    
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="收货人"
        width="59px">
      </el-table-column>
      <el-table-column
        prop="area"
        label="所在地区"
        width="120px">
      </el-table-column>
      <el-table-column
        prop="address"
        label="详细地址">
      </el-table-column>
      <el-table-column
        prop="post_code"
        label="邮政编码"
        width="80">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号码"
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="设置"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" class="btn-default">默认地址</el-button>
        </template>
      </el-table-column>      
    </el-table>    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        province:'',
        city:'',
        region:'',
        address:'',
        post_code:'',
        name:'',
        mobile:'',
        checked: false,
        tableData: [{
          name: '王小虎',
          area:'上海 上海市 静安区',
          address: '上海市普陀区金沙江路 1518 弄',
          post_code: '200072',
          mobile: '13512114841'
        }, {
          name: '王小虎',
          area:'上海 上海市 静安区',
          address: '上海市普陀区金沙江路 1518 弄',
          post_code: '200072',
          mobile: '13512114841'
        }, {
          name: '王小虎',
          area:'上海 上海市 静安区',
          address: '上海市普陀区金沙江路 1518 弄',
          post_code: '200072',
          mobile: '13512114841'
        }, {
          name: '王小虎',
          area:'上海 上海市 静安区',
          address: '上海市普陀区金沙江路 1518 弄',
          post_code: '200072',
          mobile: '13512114841'
        }]        
      };
    },
    methods: {
      
    }
  }
</script>

<style>
  .address-wrapper {
    padding: 0 80px;
    padding-bottom:80px;
    background: #FFF;
    min-height: 666px;
  }
  
  .address-wrapper .title {
    height: 99px;
    line-height: 99px;
    font-size: 18px;
    color: #343434;
    border-bottom: 1px solid #E6E6E6;
    font-weight: bold;
    margin-bottom: 17px;
  }  
  
  .address-wrapper .provinceSelect,
  .address-wrapper .citySelect,
  .address-wrapper .regionSelect{
    width: 120px;
    margin-left: 16px;
  }
  
  .address-wrapper .provinceSelect{
    margin-left: 0;
  }
  
  .address-wrapper .addressInput{
    width: 400px;
    height: 64px;
  }
  
  .address-wrapper .postcodeInput,
  .address-wrapper .nameInput,
  .address-wrapper .mobileInput{
    width: 400px;
  }
  
  .address-wrapper .btn-save{
    width:400px;
    background: #13B5BB;
    color: #FFFFFF;
    border: 0;
    height: 40px;    
  }
  
  .address-wrapper .btn-save:focus,
  .address-wrapper .btn-save:hover {
    border-color: #036C68;
    background-color: #15BFC1;
  }     
  
  .address-wrapper .el-form {
    margin-bottom: 60px;
  }
  
  .address-wrapper .el-table td,
  .address-wrapper .el-table th.is-leaf {
    font-size: 12px;
  }  
  
  .address-wrapper .el-table th.is-leaf {
    background: #E4E4E4;
    color: #4D4D4D;
  }
</style>