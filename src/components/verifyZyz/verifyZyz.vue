<template>
  <div class="verifyZyz-wrapper">
    <div class="sure-state">
      <span class="state-txt">认证状态：你提交的职业证审核{{state_txt}}</span>
      <!--<span style="color: #ff6600;">上传执业证书，大约3-4天即可通过医师审核认证。</span>-->
    </div>
    <div style="padding: 14px 18px;">
      <el-form ref="form" :model="form" label-width="120px" label-position="left" :disabled = "isdisabled" >
        <el-form-item label="证书认证方式" required>
          <el-checkbox-group v-model="form.authentication_type">
            <el-checkbox label="1">上传执业证书</el-checkbox>
            <el-checkbox label="2">科室电话验证</el-checkbox>
          </el-checkbox-group>          
        </el-form-item>
        <div v-if="form.authentication_type.indexOf('1') != -1">
          <el-form-item label="执业证类型" prop="membercertificatetype">
            <el-select class="professionalSelect" placeholder="请选择执业证类型" v-model="form.membercertificatetype">
              <el-option label="医师资格证" value="1"></el-option>
              <el-option label="医师执业证" value="2"></el-option>
              <el-option label="护士资格证" value="3"></el-option>
              <el-option label="药师资格证" value="4"></el-option>
              <el-option label="药师执业证" value="5"></el-option>
              <el-option label="护士执业证" value="8"></el-option>
            </el-select>
          </el-form-item> 
          <el-form-item label="执业证书编号" prop="certificate_num">
            <el-input v-model="form.certificate_num" placeholder="请填写执业证书编号" class="certificateInput"></el-input>
          </el-form-item>
          <el-form-item label="执业证书第一页" required>
            <el-upload
              class="upload-demo"
              ref="upload1"
              action="123"
              :auto-upload=false
              :before-upload="beforeUpload1"
              :on-change="newhandleChange1"
              :on-success="newhandlesuccess1"
              :on-exceed="handleExceed1"
              :limit="1"
              accept="image/jpeg,image/png">
              <el-button size="small" type="primary" class="btn-upload">点击上传</el-button>
              <a href="" class="btn-example" target="_blank">查看示例图</a>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
            </el-upload>            
          </el-form-item>
          <el-form-item label="执业证书第二页" required>
            <el-upload
              class="upload-demo"
              ref="upload2"
              action="123"
              :auto-upload=false
              :before-upload="beforeUpload2"
              :on-change="newhandleChange2"
              :on-success="newhandlesuccess2"
              :on-exceed="handleExceed2"
              :limit="1"
              accept="image/jpeg,image/png">
              <el-button size="small" type="primary" class="btn-upload">点击上传</el-button>
              <a href="" class="btn-example" target="_blank">查看示例图</a>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
            </el-upload>            
          </el-form-item>
        </div>
        <div v-if="form.authentication_type.indexOf('2') != -1">
          <el-form-item label="科室电话" required>
            <el-form-item prop="region_number">
              <el-input placeholder="区号" type="number" v-model="form.region_number" class="regionnumInput"></el-input>              
            </el-form-item>
            <el-form-item prop="phone_number">
              <el-input placeholder="电话号码" v-model="form.phone_number" class="phonenumInput"></el-input>
            </el-form-item>
            <el-form-item prop="room_number">
              <el-input placeholder="分机号" v-model="form.room_number" class="roomnumInput"></el-input>
            </el-form-item>              
            
            <div class="phone-tips">如：010-55555555转606，请详细填写所在医院的固定电话区号-电话及分机号，请确定能联系到您。我们将拨打此电话，核实是否是本人注册。</div>
            <div class="phone-warning">注：此电话不会被公开</div>
          </el-form-item>
          <el-form-item label="接听电话时间" prop="end_time" required>
            <el-time-select
              placeholder="请选择起始时间"
              class="startTime"
              v-model="form.start_time"
              :picker-options="{
                start: '06:00',
                step: '01:00',
                end: '18:00',
              }">
            </el-time-select>
            <span style="margin: 0 12px;">到</span>
            <el-time-select
              placeholder="请选择结束时间"
              class="endTime"
              v-model="form.end_time"
              :picker-options="{
                start: '06:00',
                step: '01:00',
                end: '18:00',
                minTime: form.start_time
              }">
            </el-time-select>
          </el-form-item>
        </div>      
        <el-form-item>
          <el-button type="primary" :disabled = "isdisabled" @click="onSubmit('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var checkTime = (rule, value, callback) => {
        console.log(value);
        console.log(this.form.start_time);
        if(this.form.start_time == null){
          callback(new Error('请选择接听电话开始时间'));
        }else{
          callback();
        }
      };      
      return {
        path:"",
        memberIntegral:null,
        memberRealname:null,
        verify_type:null,
        state_txt:null,
        form:{
          sex: null,//性别
          birth_year:null,//出生年份
          meeting:'',//加入的学会
          level:null,//最高学历
          graduation_time:null,//毕业时间
          authentication_type:['1','2'],//证书认证方式
          certificate_num:null,//执业证书编号
          school:null,
          province:null,
          region_number:null,
          phone_number:null,
          room_number:null,
          start_time: null,
          end_time: null,
          fileParam_1:null,
          fileParam_2:null,
          membercertificatetype:null,     
        },
        rules: {
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
          birth_year: [
            { required: true, message: '请选择出生年份', trigger: 'change' }
          ],
          meeting:[
            { required: true, message: '请选择加入的学会', trigger: 'blur' }
          ],
          level:[
            { required: true, message: '请选择最高学历', trigger: 'change' },
          ],
          graduation_time:[
            { required: true, message: '请选择毕业时间', trigger: 'change' },
          ],
          school:[
            { required: true, message: '请选择毕业院校', trigger: 'change' },
          ],
          region_number:[
            { required: true, message: '请输入区号', trigger: 'blur' },
            { min: 3, message: '请输入正确的区号', trigger: 'blur' }
          ],
          phone_number:[
            { required: true, message: '请输入科室电话', trigger: 'blur' },
            { min: 7, message: '请输入正确的科室电话', trigger: 'blur' }
          ],
          room_number:[
            { required: true, message: '请输入分机号', trigger: 'blur' },
            { min: 3, message: '请输入正确的分机号', trigger: 'blur' }
          ],
          end_time:[
            { required: true, message: '请选择接听电话时间', trigger: 'change' },
            { validator: checkTime, trigger: 'change' }
          ],
          certificate_num:[
            { required: true, message: '请输入执业证书编号', trigger: 'blur'},
            { min: 12, message: '请输入正确的执业证书编号', trigger: 'blur' }
          ],
          membercertificatetype:[
            { required: true, message: '请选择执业证类型', trigger: 'change'},
          ],
        },
        isdisabled: null,
        certificate_num:null,
        fileList:[],
        uploadForm: new FormData(),
      };
    },
    created(){
    },
    mounted(){
      this.getMemberInfo();
      this.checkMemberState();
    },    
    methods: {
//    onSubmit(formName) {
//      this.$refs[formName].validate((valid) => {
//        if (valid) {
//          this.uploadForm.append('certificateOne', this.form.fileParam_1[0].raw);
//          this.uploadForm.append('certificateTwo', this.form.fileParam_2[0].raw);
//          this.uploadForm.append('memberidcard', this.form.certificate_num);
//          this.axios.post(this.common.getApi() + '/web/api/register/certificateAgainAudit',this.uploadForm,{
//            headers: {
//              'Content-Type': 'multipart/form-data'
//            }
//          }).then((res) => {
//            console.log(res)
//            if(res.data.success){
//              this.$message({
//                message: '提交成功',
//                type: 'success'
//              });
//              this.uploadForm = new FormData()
//            }else{
//              this.$message.error(res.data.msg);
//              this.fileList = [];
//              this.form.fileParam_1 = '';
//              this.form.fileParam_2 = '';
//              this.uploadForm = new FormData()
//            }
//            this.checkMemberState();
//            this.getMemberInfo();
//          })            
//        } else {
//          console.log(this.form.sex)
//          return false;
//        }
//      });
//    },
      onSubmit(formName) {
        console.log(this.form.authentication_type);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var checkmethod = null;
            if(this.form.authentication_type.length == 2){
              checkmethod = 0
            }else if(this.form.authentication_type.length == 1 && this.form.authentication_type[0] == '1'){
              checkmethod = 2
            }else if(this.form.authentication_type.length == 1 && this.form.authentication_type[0] == '2') {
              checkmethod = 1
            }
            if(checkmethod == 2){
              this.uploadForm.append('certificateOne', this.form.fileParam_1[0].raw);
              this.uploadForm.append('certificateTwo', this.form.fileParam_2[0].raw);
              this.uploadForm.append('memberidcard', this.form.certificate_num);                
              this.uploadForm.append('membercertificatetype',Number(this.form.membercertificatetype));
            }else if(checkmethod == 1){
              this.uploadForm.append('departmentstle', this.form.region_number+'-'+this.form.phone_number+'-'+this.form.room_number);
              this.uploadForm.append('beginTime', Number(this.form.start_time.slice(0,2)));
              this.uploadForm.append('endTime', Number(this.form.end_time.slice(0,2)));
            }else if(checkmethod == 0){
              this.uploadForm.append('certificateOne', this.form.fileParam_1[0].raw);
              this.uploadForm.append('certificateTwo', this.form.fileParam_2[0].raw);
              this.uploadForm.append('memberidcard', this.form.certificate_num);                
              this.uploadForm.append('membercertificatetype',Number(this.form.membercertificatetype));              
              this.uploadForm.append('departmentstle', this.form.region_number+'-'+this.form.phone_number+'-'+this.form.room_number);
              this.uploadForm.append('beginTime', Number(this.form.start_time.slice(0,2)));
              this.uploadForm.append('endTime', Number(this.form.end_time.slice(0,2)));
            }
            this.uploadForm.append('checkmethod', Number(checkmethod));
            this.axios.post(this.common.getApi() + '/web/api/register/memberAgainAudit',this.uploadForm,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then((res) => {
              console.log(res)
              if(res.data.success){
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.uploadForm = new FormData()
//              this.$router.push('/index');
              }else{
                this.$message.error(res.data.msg);
                this.fileList = [];
                this.uploadForm = new FormData()
              }
            })            
          } else {
            console.log(this.form.sex)
            return false;
          }
        });
      },
      getMemberInfo(){
        this.axios.get(this.common.getApi() + '/web/api/member/getMemberInfo','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.form.memberidcard = res.data.obj.memberidcard;
        })           
      },
      checkMemberState(){
        this.axios.get(this.common.getApi() + '/web/api/member/checkMemberState','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.state_txt = "已通过";
            this.isdisabled = true;
          }else if(res.data.code == '201'){
            this.state_txt = "未通过，用户手机号尚未激活"
            this.isdisabled = false;
          }else if(res.data.code == '202'){
            this.state_txt = "未通过，用户尚未完善资料"
            this.isdisabled = false;
          }else if(res.data.code == '203'){
            this.state_txt = "未通过"
            this.isdisabled = false;
          }else if(res.data.code == '204'){
            this.state_txt = "未通过，用户未登录"
            this.isdisabled = true;
          }else if(res.data.code == '205'){
            this.state_txt = "正在审核中"
            this.isdisabled = true;
          }
        })
      },
      handleExceed1(files, fileList) {
        this.$message.warning(`最多只能选择1个文件`);
      },
      beforeUpload1(file){
        
      },
      newhandlesuccess1(file){
        console.log(file);
      },
      newhandleChange1(response,file,filelist){
        this.form.fileParam_1 = file;
        console.log(this.form.fileParam_1);
      },
      handleExceed2(files, fileList) {
        this.$message.warning(`最多只能选择1个文件`);
      },
      beforeUpload2(file){
        
      },
      newhandlesuccess2(file){
        console.log(file);
      },
      newhandleChange2(response,file,filelist){
        this.form.fileParam_2 = file;
        console.log(this.form.fileParam);
      },            
    },
  }      
</script>

<style>
  .verifyZyz-wrapper{
    width: 880px;
    min-height: 800px;
    background: #FFFFFF;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  .verifyZyz-wrapper .sure-state{
    background: #FFFFFF;
    font-size: 14px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .verifyZyz-wrapper .sure-state .state-txt{
    color: #FF4461;
  }
  
  .verifyZyz-wrapper .sure-state .btn-resubmit{
    color: #FFFFFF;
    background: #13B5BB;
    border: none;
  }  
  
  .verifyZyz-wrapper .certificateInput{
    width: 400px;
  }
  
  .verifyZyz-wrapper .upload-demo{
    width: 400px;
  }  
  
  .verifyZyz-wrapper .el-upload{
    width: 100%;
    text-align: left;
  }
  
  .verifyZyz-wrapper .btn-example{
    color: #13B5BB;
    float: right;
  }    
  
  .verifyZyz-wrapper .btn-upload{
    /*background: #13B5BB;*/
    border: none;
  }  
  
  .verifyZyz-wrapper .btn-save{
    background: #13B5BB;
    color: #FFFFFF;
    border: 0;
    width: 80px;
    height: 40px;
  }  
  
  .verifyZyz-wrapper .regionnumInput{
    width: 80px;
  }
  
  .verifyZyz-wrapper .phonenumInput{
    width: 200px;
    margin-top: 10px;
    /*margin-left: 17px;*/
  }  
  
  .verifyZyz-wrapper .roomnumInput{
    width: 80px;
    margin-top: 10px;
    /*margin-left: 17px;*/
  }    
  
  .verifyZyz-wrapper .phone-tips{
    line-height: 20px;
    color: #666666;
    width: 400px;
    font-size: 12px;
    margin: 10px 0;
  }
  
  .verifyZyz-wrapper .phone-warning{
    color: #FF6161;
    font-size: 12px;
  }  
</style>