<template>
  <div class="feedback-wrapper">
    <div class="title">业务联系</div>
    <div class="feed-txt">
      医生说，是中国第一个专业的医生在线调查网站，现有医生会员超过 25000名。从 200 了年成立至今，医生说已执行医药研究项目超过5000人次。研究内容涉及药物、器械、治疗、政策、厂商等主题。我们用临床一线医生的专业经验，为大量医药企业改善产品及服务提供了数据支持。如您有医药研究需求，可留下您的联系方式，我们的客户服务人员会迅速与您取得联系。
    </div>

      <div class="form-wrapper">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" style="margin-top: 20px">
          <el-form-item label="真实姓名" prop="customName">
            <el-input v-model="form.customName"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="linkMobile">
            <el-input v-model="form.linkMobile"></el-input>
          </el-form-item>
          <el-form-item label="公司职位" prop="position">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="form.projectName"></el-input>
          </el-form-item>
          <el-form-item label="反馈细节" prop="projectDetail">
            <el-input v-model="form.projectDetail" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          customName: null,
          companyName: null,
          linkMobile: null,
          position: null,
          address: null,
          email: null,
          projectName: null,
          projectDetail: null
        },
        rules: {
          customName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          companyName: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          linkMobile: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          position: [
            { required: true, message: '请输入公司职位', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入联系地址', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          projectDetail: [
            { required: true, message: '请输入项目细节', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post(this.common.getApi() + '/web/api/business/addBusiness',{
              params:{
                customName: this.form.customName,
                companyName: this.form.companyName,
                linkMobile: this.form.linkMobile,
                position: this.form.position,
                address: this.form.address,
                email: this.form.email,
                projectName: this.form.projectName,
                projectDetail: this.form.projectDetail
              }
            }).then((res) => {
              if(res.data.success){
                this.$message({
                  type: 'success',
                  message: '反馈成功'
                })
                this.$refs[formName].resetFields();
              }else{
                this.$message.error(res.data.msg)
              }
            })              
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }  
</script>

<style>
  .feedback-wrapper{
    padding: 0 80px;
    background: #FFF;
    min-height: 666px;
    padding-bottom: 70px;
  }
  
  .feedback-wrapper .title {
    height: 99px;
    line-height: 99px;
    font-size: 18px;
    color: #343434;
    border-bottom: 1px solid #E6E6E6;
    font-weight: bold;
    margin-bottom: 39px;
  }  
  
  .feedback-wrapper .feed-txt{
    font-size:14px;
    color: #666666;
    padding-bottom: 38px;
    border-bottom: 1px dashed #E5E5E5;
  }
  
  .feedback-wrapper .form-wrapper{
    margin-top: 40px;
  }
  
  /*.feedback-wrapper .input-content{
    display: flex;
    align-items: center;
    margin-top: 20px;
  }*/
  
  .feedback-wrapper .el-input{
    width: 420px;
  }
  
  .feedback-wrapper .el-input input{
    background: #F9F9F9;
  }
  
  .feedback-wrapper .input-content span{
    font-size:14px;
    font-weight: bold;
    margin-right: 24px;
  }
  
  .feedback-wrapper .el-select .el-input.is-focus .el-input__inner,
  .feedback-wrapper .el-input__inner:focus,
  .feedback-wrapper .el-textarea__inner:focus{
    border-color: #13B5BB;
  }
    
  .feedback-wrapper .el-textarea {
    width: 420px;
  }    
  
  .feedback-wrapper .el-textarea__inner{
    background: #F9F9F9;
    font-family: Arial;
    height: 200px;
  }
  
  .feedback-wrapper .textarea-content{
    align-items: flex-start;
  }
  
  .feedback-wrapper .btnlist{
    margin-top: 20px;
    padding-left: 80px;
  }
  
  .feedback-wrapper .btn-reset{
    color: #666666;
    background-color: #F0F0F0;
    border: none;
  }
  
  .feedback-wrapper .btn-submit{
    color: #FFFFFF;
    background: #13B5BB;
    border: none;
  }  
</style>