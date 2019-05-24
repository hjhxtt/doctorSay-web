<template>
  <div class="orderPhysical-wrapper">
    <el-dialog
      :visible.sync="dialogVisible"
      width="680px"
      :close-on-press-escape="true"
      :lock-scroll="true">
      <div slot="title" class="dialog-title">
        <span>新增收货人信息</span>
      </div>
      <div>
        <el-form ref="form" label-width="100px">
          <el-form-item label="地址信息" required>
            <el-select placeholder="请选择省份" class="provinceSelect" v-model="province_select"></el-select>
            <el-select placeholder="请选择城市" class="citySelect" v-model="city_select"></el-select>
            <el-select placeholder="请选择地区" class="regionSelect" v-model="region_select"></el-select>
          </el-form-item>
          <el-form-item label="详细地址" required>
            <el-input type="textarea" v-model="address_detail" resize="none" placeholder="请填写详细地址信息" class="addressInput"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码" required>
            <el-input v-model="post_code" placeholder="请填写邮政编码" class="postCodeInput"></el-input>
          </el-form-item>
          <el-form-item label="收货人" required>
            <el-input v-model="name" placeholder="请填写收货人姓名" class="nameInput"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" required>
            <el-input v-model="mobile" placeholder="请填写手机号码" class="mobileInput"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">设为默认地址</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-save">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>   
    
    <div class="noaddress-content">
        <el-button class="btn-addAddress" :autofocus="true" @click="dialogVisible=true"><i>+</i>新增收货地址</el-button>
      </div>
      
      <div class="hasaddress-content">
        <div class="head">收货人信息</div>
        <ul class="addresslist">
          <li class="default-address">
            <span class="address-owner">
              张浩成<span class="icon-default"><img src="../../assets/dh_icon_xz.png" alt="" /></span>
            </span>
            <span class="address-name">张浩成</span>
            <span class="address-province">上海市</span>
            <span>上海</span>
            <span>静安区</span>
            <span>灵石路695号珠江创意中心1号楼E101室</span>
            <span>15012223333</span>
            <span class="default">默认地址</span>
          </li>
          <li>
            <span class="address-owner">张浩成</span>
            <span class="address-name">张浩成</span>
            <span class="address-province">上海市</span>
            <span>上海</span>
            <span>静安区</span>
            <span>灵石路695号珠江创意中心1号楼E101室</span>
            <span>15012223333</span>
            <span class="btnlist">
              <span>设为默认</span>
              <span>编辑</span>
              <span>删除</span>
            </span>
          </li>
          <li>
            <span class="address-owner">张浩成</span>
            <span class="address-name">张浩成</span>
            <span class="address-province">上海市</span>
            <span>上海</span>
            <span>静安区</span>
            <span>灵石路695号珠江创意中心1号楼E101室</span>
            <span>15012223333</span>
              <span class="btnlist">
              <span>设为默认</span>
              <span>编辑</span>
              <span>删除</span>
            </span>
          </li>          
        </ul>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible:false,
        province_select:'',
        city_select:'',
        region_select:'',
        address_detail:'',
        post_code:'',
        name:'',
        mobile:'',
        checked: false,
      }
    }
  }  
</script>

<style>
  .orderPhysical-wrapper{
    border-bottom: 1px solid #D9D9D9;
    margin-bottom: 40px;
  }
  
  .orderPhysical-wrapper .btn-addAddress{
    width: 1000px;
    height: 64px;
    background: #FAFAFA;
    color: #333333;
    border: 1px solid #E6E6E6;
  }
  
  .orderPhysical-wrapper .btn-addAddress:focus,
  .orderPhysical-wrapper .btn-addAddress:hover {
    color: #333;
    border-color: #C6C6C6;
    background-color: #EAEAEA;
  }
  
  .orderPhysical-wrapper .btn-addAddress i{
    color: #13B5BB;
    margin-right: 5px;
  }
  
  .orderPhysical-wrapper .noaddress-content{
    margin-bottom: 40px;
  }

  .orderPhysical-wrapper .el-dialog__header {
    padding: 20px 40px 0 40px;
  }
  
  .orderPhysical-wrapper .dialog-title{
    font-size:16px;
    font-weight: bold;
    color: #333;
    width: 600px;
    border-bottom: 1px solid #E6E6E6;
    padding-bottom: 20px;
  }
  
  .orderPhysical-wrapper .provinceSelect,
  .orderPhysical-wrapper .citySelect,
  .orderPhysical-wrapper .regionSelect{
    width: 120px;
    margin-left: 17px;
  }
  
  .orderPhysical-wrapper .provinceSelect{
    margin-left: 0;
  }
  
  .orderPhysical-wrapper .el-textarea__inner{
    width: 400px;
    height: 64px;
    font-family: Arial!important;
  }  
  
  .orderPhysical-wrapper .postCodeInput,
  .orderPhysical-wrapper .nameInput,
  .orderPhysical-wrapper .mobileInput{
    width: 400px;
  }
  
  .orderPhysical-wrapper .btn-save{
    background: #13B5BB;
    width: 400px;
    color: #FFFFFF;
  }
  
  .orderPhysical-wrapper .btn-save:focus,
  .orderPhysical-wrapper .btn-save:hover {
    background-color: #15BFC1;
  }
  
  .orderPhysical-wrapper .hasaddress-content{
    width: 1000px;
    border: 1px solid #D9D9D9;
    margin-bottom: 40px;
    padding: 0 30px;
    box-sizing: border-box;
    padding-bottom: 50px;
  }
  
  .orderPhysical-wrapper .hasaddress-content .head{
    font-size:14px;
    font-weight: bold;
    color: #333;
    height: 50px;
    line-height: 50px;
  }
  
  .orderPhysical-wrapper .addresslist li{
   margin-bottom: 20px;
   background: #F5F5F5;
  }  
  
  .orderPhysical-wrapper .addresslist li .address-owner{
    width: 160px;
    height: 40px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
    border: 2px solid #F5F5F5;
    box-sizing: border-box;
    color: #676767;
    margin-left: 0;
    background: #FFFFFF;
    position: relative;
  }
  
  .orderPhysical-wrapper .addresslist li span.icon-default{
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
    line-height: 0;
  }
  
  .orderPhysical-wrapper .addresslist li.default-address .address-owner{
    border: 2px solid #13B5BB;
  }
  
  .orderPhysical-wrapper .addresslist li.default-address{
    background: #FFF;
  }
  
  .orderPhysical-wrapper .addresslist li span{
    margin: 0 8px;
  }
  
  .orderPhysical-wrapper .addresslist span.default{
    display: inline-block;
    width: 60px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background: #999999;
    color: #FFFFFF;
    border-radius: 2px;
  }
  
  .orderPhysical-wrapper .addresslist .btnlist{
    color: #13B5BB;
    float: right;
    height: 40px;
    line-height: 40px;
  }
  
  .orderPhysical-wrapper .addresslist .btnlist span{
    cursor: pointer;
  }  
</style>