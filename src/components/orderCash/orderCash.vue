<template>
  <div class="orderSure-wrapper">
    <div class="order-content">
      <div class="title">
        <span>确认兑换信息</span>
        <span @click="toCenter"><i><<</i>返回积分商城</span>
      </div>
      <div class="orderCash-wrapper">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="支付宝" name="0">
            <el-form ref="zfbform" :model="zfbform" label-width="130px" :rules="rules">
              <el-form-item label="支付宝账号" prop="zfb_name" >
                <el-input v-model="zfbform.zfb_name" class="zfbNameInput" placeholder="请输入您的支付宝账号"></el-input>
              </el-form-item>
              <el-form-item label="确认账号" prop="zfb_sure" >
                <el-input v-model="zfbform.zfb_sure" class="zfbSureInput" placeholder="请确认您的支付宝账号"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="mobile" >
                <el-input v-model="zfbform.mobile" class="mobileInput" placeholder="请输入您的联系电话"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="银行打款" name="1">
            <el-form ref="yhkform" :model="yhkform" label-width="130px" :rules="rules">
              <el-form-item label="银行卡类型" prop="radio_value" >
                <el-radio-group v-model="yhkform.radio_value">
                  <el-radio label="中国银行"><img src="../../assets/bank_logo_zhh.png" alt="" />中国银行</el-radio>
                  <el-radio label="中国工商银行"><img src="../../assets/bank_logo_gh.png" alt="" />中国工商银行</el-radio>
                  <el-radio label="中国建设银行"><img src="../../assets/bank_logo_jh.png" alt="" />中国建设银行</el-radio>
                  <el-radio label="中国农业银行"><img src="../../assets/bank_logo_nh.png" alt="" />中国农业银行</el-radio>
                  <el-radio label="招商银行"><img src="../../assets/bank_logo_zh.png" alt="" />招商银行</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="银行开户地" prop="province" >
                <el-select v-model="yhkform.province" class="provinceSelect" @change="getCityByProvince(yhkform.province)" placeholder="请选择省份">
                  <el-option v-for="item in province_options" :label="item.provinceName" :value="item.provinceId" :key="item.provinceId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" prop="city" >
                <el-select v-model="yhkform.city" class="citySelect" placeholder="请选择城市">
                  <el-option v-for="item in city_options" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="银行卡卡号" prop="card_num" >
                <el-input v-model="yhkform.card_num" class="cardInput" placeholder="请填入您的银行卡卡号"></el-input>
                <span class="tips">不支持信用卡</span>
              </el-form-item>
              <el-form-item label="确认卡号" prop="sure_num" >
                <el-input v-model="yhkform.sure_num" class="cardSureInput" placeholder="请确认您的银行卡卡号"></el-input>
              </el-form-item>
              <el-form-item label="您的姓名" prop="name" >
                <el-input v-model="yhkform.name" class="nameInput" placeholder="请填写您的姓名"></el-input>
                <span class="tips">姓名必须要与银行开户姓名一致</span>
              </el-form-item>
              <el-form-item label="联系电话" prop="mobile" >
                <el-input v-model="yhkform.mobile" class="mobileInput" placeholder="请填写您的联系电话"></el-input>
                <span class="tips">请确保该联系电话能联系到您</span>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="pro_img"
          label="">
            <template slot-scope="scope">
              <div style="width: 120px;height: 90px;background: #D3BABD;">
                <img :src="'../upload/pic/pic_gift/'+scope.row.pro_img" alt="" width="100%" height="100%"/>
              </div>
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
        <el-button class="btn-submit" @click="confirmPay()" :loading="isload">提交</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认支付宝账号'));
        } else if (value !== this.zfbform.zfb_name) {
          callback(new Error('两次输入账号不一致!'));
        } else {
          callback();
        }
      };
      var validateCard = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认银号卡号'));
        } else if (value !== this.yhkform.card_num) {
          callback(new Error('两次输入卡号不一致!'));
        } else {
          callback();
        }
      };
      var validateMobile = (rule, value, callback) => {
        var regu = /^1[34578]\d{9}$/;
        if(regu.test(value)){
          this.axios.get(this.common.getApi() + '/web/api/register/checkMobile',{
            params:{
              params:{
                mobile: value
              }
            }
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              callback();
            }else{
              callback(new Error(res.data.msg))
            }
          })
        }else{
          callback(new Error('请输入正确的手机号'))
        }
      };
      return {
        activeName: '0',
        province_options:[],
        city_options: [],
        baseurl: baseurl,
        tableData: [{
          pro_img: this.$route.query.giftpicurl,
          pro_name: this.$route.query.giftname,
          pro_money: "-" + this.$route.query.giftprize,
          pro_num: 1,
          pro_deType: '支付宝或银行打款'
        }],
        isload:false,
        zfbform:{
          zfb_name: null,
          zfb_sure: null,
          mobile: null,
        },
        yhkform:{
          radio_value:null,
          province: null,
          city: null,
          card_num: null,
          sure_num:null,
          name:null,
          mobile: null,
        },
        rules: {
          zfb_name: [
            { required: true, message: '请输入支付宝账号', trigger: 'blur' },
          ],
          zfb_sure: [
            { required: true, message: '请确认支付宝账号', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          mobile:[
            { required: true, message: '请填写联系电话', trigger: 'blur' }
          ],
          radio_value:[
            { required: true, message: '请选择银行卡类型', trigger: 'change' }
          ],
          province:[
            { required: true, message: '请选择省份', trigger: 'change' }
          ],
          city: [
            { required: true, message: '请选择城市', trigger: 'change' }
          ],
          card_num:[
            { required: true, message: '请输入银行卡号', trigger: 'blur' }
          ],
          sure_num:[
            { required: true, message: '请输入银行卡号', trigger: 'blur' },
            { validator: validateCard, trigger: 'blur' }
          ],
          name:[
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
        },
      };
    },
    mounted(){
      this.getProvince();
    },
    methods: {
      confirmPay(formName) {
        this.$confirm('确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.onSubmit(formName)

        }).catch(() => {

        });
      },
      onSubmit(){
        if(this.activeName == 0){
          this.$refs['zfbform'].validate((valid) => {
            if (valid) {
              this.isload = true;
              this.axios.post(this.common.getApi() + '/web/api/convertgifs/exchangeCashGifts',{
                params:{
                  giftsId: Number(this.$route.query.id),
                  cashType: Number(this.activeName),
                  aliCount: this.zfbform.zfb_name,
                  linkPhone: this.zfbform.mobile
                }
              }).then((res) => {
                this.isload = false
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '提交成功'
                  })
                  this.$router.push('/integrationHistory');
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            }else {
                this.$message({
                  type: 'warning',
                  message: '提交失败'
                })
              console.log('error submit!!');
              return false;
            }
          })
        }else if(this.activeName == 1){
          this.$refs['yhkform'].validate((valid) => {
            if (valid) {
              this.isload = true;
              this.axios.post(this.common.getApi() + '/web/api/convertgifs/exchangeCashGifts',{
                params:{
                  giftsId: Number(this.$route.query.id),
                  cashType: Number(this.activeName),
                  bankName: this.yhkform.radio_value,
                  province: this.getLable(this.yhkform.province,this.province_options,'provinceId','provinceName'),
                  city: this.getLable(this.yhkform.city,this.city_options,'cityId','cityName'),
                  bankCardNum: this.yhkform.city,
                  bankAcountName: this.yhkform.card_num,
                  linkPhone: this.yhkform.mobile,
//                this.getLable(this.removeForm.zc_2,this.zc_2_options,'stationId','stationName'),
                }
              }).then((res) => {
                this.isload = false
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '提交成功'
                  })
                  this.$router.push('/integrationHistory');
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            }else {
                this.$message({
                  type: 'warning',
                  message: '提交失败'
                })
              console.log('error submit!!');
              return false;
            }
          })
        }
      },
      toCenter(){
        this.$router.push('/integrationUse');
      },
      //获取选中的文本
      getLable(value,list,id,name){
        let obj = {};
        if(id == "provinceId"){
          obj = list.find((item)=>{
            return item.provinceId === value;
          });
          return obj.provinceName;
        }else if(id == "cityId"){
          obj = list.find((item)=>{
            return item.cityId === value;
          });
          return obj.cityName;
        }
      },
      // 获取省份
      getProvince(){
        this.axios.get(this.common.getApi() + '/web/api/area/getProvince','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.province_options = res.data.obj;
          }
        })
      },
      //获取城市
      getCityByProvince(provinceId){
        this.axios.get(this.common.getApi() + '/web/api/area/getCityByProvince',{
          params:{
            params:{
              provinceId: provinceId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.city_options = res.data.obj;
          }
        })
      },
    }
  };
</script>

<style>
  .orderCash-wrapper{
    border-bottom: 1px solid #D9D9D9;
    margin-bottom: 40px;
  }

  .orderCash-wrapper .el-tabs{
    margin-bottom: 40px;
  }

  .orderCash-wrapper .zfbNameInput,
  .orderCash-wrapper .zfbSureInput,
  .orderCash-wrapper .mobileInput{
    width: 400px;
  }

  .orderCash-wrapper .el-tabs__header{
    margin: 0;
  }

  .orderCash-wrapper .el-tabs__content{
    border: 1px solid #D9D9D9;
    border-top: 0;
    padding: 40px 0;
  }

  .orderCash-wrapper .el-radio-group{
    width: 400px;
  }

  .orderCash-wrapper .el-radio+.el-radio:nth-child(2n-1) {
    margin-left: 0px;
  }

  .orderCash-wrapper .el-radio{
    width: 150px;
    margin: 7px 0px 13px 0;
  }

  .orderCash-wrapper .el-radio__label img{
    vertical-align: middle;
    margin-right: 6px;
  }

  .orderCash-wrapper .provinceSelect,
  .orderCash-wrapper .citySelect{
    width: 190px;
  }

  .orderCash-wrapper .citySelect{
    /*margin-left: 16px;*/
  }

  .orderCash-wrapper .cardInput,
  .orderCash-wrapper .cardSureInput,
  .orderCash-wrapper .nameInput,
  .orderCash-wrapper .mobileInput{
    width: 400px;
  }

  .orderCash-wrapper .tips{
    margin-left: 20px;
    font-size: 14px;
    color: #666666;
  }

  .orderCash-wrapper .el-tabs__item{
    color: #666666;
    background: #F5F5F5;
    border-bottom: 1px solid #D9D9D9!important;
  }

  .orderCash-wrapper .el-tabs__item.is-active{
    color: #333333;
    background: #FFFFFF;
    border-bottom: none!important;
  }

  .orderCash-wrapper .el-radio__input.is-checked .el-radio__inner {
    border-color: #13B5BB;
    background: #13B5BB;
  }

  .orderCash-wrapper .el-radio__inner:hover {
    border-color: #13B5BB;
  }

  .orderCash-wrapper .el-radio__input.is-checked+.el-radio__label {
    color: #13B5BB;
  }

  .orderCash-wrapper .el-select .el-input.is-focus .el-input__inner,
  .orderCash-wrapper .el-input__inner:focus{
    border-color: #13B5BB;
  }

  .orderCash-wrapper .el-input input{
    background: #F9F9F9;
  }

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