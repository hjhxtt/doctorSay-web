<template>
  <div class="orderSure-wrapper">
    <div class="order-content">
      <div class="title">
        <span>确认兑换信息</span>
        <span @click="toCenter"><i><<</i>返回积分商城</span>
      </div>
      <div class="orderPhonepays-wrapper">
        <div class="phonepays-content">
          <el-form ref="form" :model="form" label-width="130px" :rules="rules">
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="form.mobile" class="mobileInput" placeholder="请输入您的手机号码"></el-input>
              <span class="tips">为了您的账户安全，目前只能充值注册手机号</span>
            </el-form-item>
            <el-form-item label="确认号码" prop="sure_mobile" required>
              <el-input v-model="form.sure_mobile" class="sureMobileInput" placeholder="请确认您的手机号码"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone" required>
              <el-input v-model="form.phone" class="phoneInput" placeholder="请输入您的联系电话"></el-input>
              <span class="tips">请确保该联系电话能联系到您</span>
            </el-form-item>
          </el-form>
        </div>
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
        <el-button class="btn-submit" @click="confirmPay('form')" :loading="isload">提交</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择确认号码'));
        } else if (value !== this.form.mobile) {
          callback(new Error('两次输入号码不一致!'));
        } else {
          callback();
        }
      };
      var validateMobile = (rule, value, callback) => {
        
        var regu = /^1[34578]\d{9}$/;
        if(regu.test(value)){
          // this.axios.get(this.common.getApi() + '/web/api/register/checkMobile',{
          //   params:{
          //     params:{
          //       mobile: value
          //     }
          //   }
          // }).then((res) => {
          //   if(res.data.code == '200'){
          //     callback();
          //   }else{
          //     callback(new Error(res.data.msg))
          //   }
          // })
          callback();
        }else{
          callback(new Error('请输入正确的手机号'))
        }
      };
      return {
        tableData: [{
          pro_img: this.$route.query.giftpicurl,
          pro_name: this.$route.query.giftname,
          pro_money: "-" + this.$route.query.giftprize,
          pro_num: 1,
          pro_deType: '手机充值'
        }],
        baseurl:baseurl,
        isload:false,
        form:{
          mobile: '',
          sure_mobile:'',
          phone:'',
        },
        rules: {
          mobile: [
            { required: true, message: '请填写手机号码', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' },
          ],
          sure_mobile: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone:[
            { required: true, message: '请填写联系电话', trigger: 'blur' }
          ],
        },
      };
    },
    mounted(){

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
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isload = true;
            this.axios.post(this.common.getApi() + '/web/api/convertgifs/exchangeInventedGifts',{
              params:{
                giftsId: Number(this.$route.query.id),
                exChangePhone: this.form.mobile,
                linkPhone: this.form.phone,
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
            console.log('error submit!!');
            this.$message({
                  type: 'warning',
                  message: '提交失败'
                })
            return false;
          }
        })
      },
      toCenter(){
        this.$router.push('/integrationUse');
      }
    }
  };
</script>

<style>
  .orderPhonepays-wrapper{
    border-bottom: 1px solid #D9D9D9;
    margin-bottom: 40px;
  }

  .orderPhonepays-wrapper .phonepays-content{
    width: 1000px;
    min-height: 260px;
    border: 1px solid #D9D9D9;
  }

  .orderPhonepays-wrapper .mobileInput,
  .orderPhonepays-wrapper .sureMobileInput,
  .orderPhonepays-wrapper .phoneInput{
    width: 400px;
  }

  .orderPhonepays-wrapper .el-form{
    margin-top: 40px;
  }

  .orderPhonepays-wrapper .el-select .el-input.is-focus .el-input__inner,
  .orderPhonepays-wrapper .el-input__inner:focus{
    border-color: #13B5BB;
  }

  .orderPhonepays-wrapper .el-input input{
    background: #F9F9F9;
  }

  .orderPhonepays-wrapper .tips{
    margin-left: 20px;
    font-size: 14px;
    color: #666666;
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