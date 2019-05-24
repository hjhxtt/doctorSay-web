<template>
  <div class="register-wrapper">
    <div class="resetPwd-content">
      <div class="process-wrapper">
        <div class="process-1 active">
          1、基本信息
          <div class="triangle">
            <span></span>
          </div>
        </div>
        <div class="process-2">
          2、手机验证
          <div class="triangle">
            <span></span>
          </div>
        </div>
        <div class="process-3">
          3、完善资料
        </div>
      </div>

      <div class="tips">请真实填写您的基本信息，否则您可能无法收到网站发放的奖品！</div>

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" :inline-message="true">
        <el-form-item label="推荐码" prop="referral_code" style="margin-bottom: 55px;">
          <el-input v-model="ruleForm.referral_code" placeholder="字符推荐码或者推荐人的手机号码"></el-input>
          <div class="form-tips">如无人推荐，请点此 <span @click="getcode">获取推荐码</span> <b v-if="isgetcode">LHOZL1</b></div>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile" style="margin-bottom: 101px;">
          <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码"></el-input>
          <div class="form-tips">
            我们将只会使用该手机号码以短信的形式通知您参加调查以及兑换奖品等 紧急联系，仅用于您在医生说网站相关事情的沟通。
            <div class="form-warning">注：手机号将被严格保密！</div>
          </div>
        </el-form-item>
        <el-form-item label="登录密码" prop="loginPwd">
          <el-input type="password" v-model="ruleForm.loginPwd" placeholder="请输入登录密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="surePwd">
          <el-input type="password" v-model="ruleForm.surePwd" placeholder="请确认登录密码"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="Email">
          <el-input v-model="ruleForm.Email" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="real_name">
          <el-input v-model="ruleForm.real_name" placeholder="请输入您的真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="所在医院" required prop="hospital">
          <el-select placeholder="请选择" v-model="ruleForm.province" style="width: 131px;" @change="getCityByProvince(ruleForm.province)">
            <el-option v-for="item in province_options" :label="item.provinceName" :value="item.provinceId" :key="item.provinceId"></el-option>
          </el-select>
          <el-select placeholder="请选择" v-model="ruleForm.city" style="width: 131px;" @change="getDistrictByCity(ruleForm.city)">
            <el-option v-for="item in city_options" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
          </el-select>
          <el-select placeholder="请选择" v-model="ruleForm.region" style="width: 130px;" @change="getHospital(ruleForm.province,ruleForm.city)">
            <el-option v-for="item in region_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-col style="width: 400px;margin-top: 20px;">
            <el-select placeholder="请选择" v-model="ruleForm.hospital">
              <el-option v-for="item in hospital_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="工作科室" prop="hospital_departments_2">
          <el-select v-model="ruleForm.hospital_departments_1" style="width: 198px;" @change="getSonOffice(ruleForm.hospital_departments_1)">
            <el-option v-for="item in hospital_1_options" :label="item.sectionofficename" :key="item.sectionofficeid" :value="item.sectionofficeid"></el-option>
          </el-select>
          <el-select v-model="ruleForm.hospital_departments_2" style="width: 198px;">
            <el-option v-for="item in hospital_2_options" :label="item.sectionofficename" :key="item.sectionofficeid" :value="item.sectionofficeid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="您的职务" prop="duties">
          <el-select v-model="ruleForm.duties" placeholder="请选择您的职务" style="width: 400px;" @change="getStationTechnicalTitle(ruleForm.duties)">
            <el-option v-for="item in duties_options" :label="item.stationName" :value="item.stationId" :key="item.stationId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="您的职称" prop="equivalent_position">
          <el-select v-model="ruleForm.equivalent_position" placeholder="请选择您的职称" style="width: 400px;">
            <el-option v-for="item in title_options" :label="item.stationName" :value="item.stationId" :key="item.stationId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行政职位" prop="executive_position">
          <el-select v-model="ruleForm.executive_position" placeholder="请选择您的行政职位" style="width: 400px;">
            <el-option v-for="item in executive_options" :label="item.sysname" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="从医领域" prop="medical_field_2">
          <el-select v-model="ruleForm.medical_field_1" placeholder="请选择" multiple style="width:400px;margin-bottom: 10px;" @change="getSonFields(ruleForm.medical_field_1)">
            <el-option v-for="item in field_1_options" :label="item.fieldname" :key="item.id" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="ruleForm.medical_field_2" placeholder="请选择" multiple style="width: 400px;">
            <el-option v-for="item in field_2_options" :label="item.fieldname" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="从医年份" prop="doctor_year">
          <el-date-picker
            v-model="ruleForm.doctor_year"
            type="year"
            placeholder="选择年"
            value-format="yyyy">
          </el-date-picker>
        </el-form-item>
        <el-form-item  prop="checked">
          <el-checkbox v-model="ruleForm.checked" class="check-txt">我阅读并接受医生说网站的<i>《注册条款》</i>和<i>《隐私保护政策》</i></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-register" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.loginPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateCheck = (rule, value, callback) => {
        console.log(value);
        if (value === '' || value == false) {
          callback(new Error('请先阅读医生说网站的《注册条款》和《隐私保护政策》'));
        }else {
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
      var validateRecommendCode = (rule, value, callback) => {
        if(value == ''){
          callback(new Error('请输入推荐码'))
        }else{
          this.axios.get(this.common.getApi() + '/web/api/register/checkRecommendcode',{
            params:{
              params:{
                recommendcode: value
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
        }
      };

      return {
        ruleForm: {
          referral_code:'',//推荐码
          mobile:'',//手机号
          loginPwd:'',//登录密码
          surePwd:'',//确认密码
          Email:'',//电子邮箱
          province:'',
          city:'',
          region:'',
          hospital:'',
          real_name:'',//真实姓名
          hospital_departments_1:'',//工作科室
          hospital_departments_2:'',
          duties:'',//职务
          equivalent_position:'',//职称
          executive_position:'',//行政职位
          medical_field_1:'',//从医领域
          medical_field_2:'',//从医领域
          doctor_year:'',//从医年份
          checked:false,
        },
        isgetcode:false,
        checked:false,
        rules: {
          referral_code: [
            { validator: validateRecommendCode, trigger: 'blur' }
          ],
          mobile:[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ],
          loginPwd:[
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 5, max: 8, message: '密码要在5到8位之间', trigger: 'blur' }
          ],
          surePwd:[
            { required: true, message: '请确认登录密码', trigger: 'blur' },
            { min: 5, max: 8, message: '密码要在5到8位之间', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          Email:[
            { required: true, message: '请输入电子邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的电子邮箱', trigger: 'blur'}
          ],
          real_name:[
            { required: true, message: '请输入您的真实姓名', trigger: 'blur' },
            { pattern:  /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请输入您的真实姓名' }
          ],
          hospital:[
            { required: true, message: '请选择您的所在医院', trigger: 'change' }
          ],
          hospital_departments_2:[
            { required: true, message: '请选择您的工作科室', trigger: 'change' },
          ],
          duties:[
            { required: true, message: '请选择您的职务', trigger: 'change' }
          ],
          equivalent_position:[
            { required: true, message: '请选择您的职称', trigger: 'change' }
          ],
          executive_position:[
            { required: true, message: '请选择您的行政职位', trigger: 'change' }
          ],
          medical_field_2:[
            { required: true, message: '请选择您的从医领域', trigger: 'blur' }
          ],
          doctor_year:[
            { required: true, message: '请选择您的从医年份', trigger: 'change' }
          ],
          checked:[
//          { required: true, message: '请先阅读医生说网站的《注册条款》和《隐私保护政策》', trigger: 'change' }
            { validator: validateCheck, trigger: 'blur' }
          ]
        },
        province_options:[],
        city_options: [],
        region_options: [],
        hospital_options: [],
        hospital_1_options:[],
        hospital_2_options:[],
        duties_options:[],
        title_options:[],
        executive_options:[],
        field_1_options:[],
        field_2_options:[],
      };
    },
    mounted(){
      this.getStationDuties();
      this.getProvince();
      this.getParentOffice();
      this.getAdminiStraion();
      this.getParentFields();
    },
    methods: {
      getcode(){
        this.isgetcode = true;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.registerBase();
          } else {
            console.log('error submit!!');
//          console.log(this.ruleForm.medical_field_1);
            return false;
          }
        });
      },
      registerBase(){
        var membertechnical = this.ruleForm.medical_field_2.join(",");
        this.axios.post(this.common.getApi() + '/web/api/register/registerBase',{
          params:{
            recommendcode:this.ruleForm.referral_code,
            memberHandphone:this.ruleForm.mobile,
            checkkey: this.ruleForm.loginPwd,
            memberMail: this.ruleForm.Email,
            memberRealname: this.ruleForm.real_name,
            memberProvince: Number(this.ruleForm.province),
            memberCity: Number(this.ruleForm.city),
            fkDistrictId: Number(this.ruleForm.region),
            memberhospital: Number(this.ruleForm.hospital),
            membersectionoffice: Number(this.ruleForm.hospital_departments_2),
            memberstation: Number(this.ruleForm.equivalent_position),
            administrativeposition: Number(this.ruleForm.executive_position),
            membertechnical:membertechnical,
            workdate: Number(this.ruleForm.doctor_year)
          }
        }).then((res) => {
          if(res.data.success){
            this.$message({
              type:'success',
              message:'提交成功'
            })
            this.$router.push('/phoneVerification')
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      //获取职称一级
      getStationDuties(){
        this.axios.get(this.common.getApi() + '/web/api/station/getStationDuties','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.duties_options = res.data.obj;
          }
        })
      },
      //获取职称二级
      getStationTechnicalTitle(parentId){
        this.axios.get(this.common.getApi() + '/web/api/station/getStationTechnicalTitle',{
          params:{
            params:{
              parentId: parentId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.title_options = res.data.obj;
          }
        })
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
            this.ruleForm.city = '';
            this.ruleForm.region = ''
            this.ruleForm.hospital = ''


          }
        })
      },
      //获取地区
      getDistrictByCity(cityId){
        this.axios.get(this.common.getApi() + '/web/api/area/getDistrictByCity',{
          params:{
            params:{
              cityId: cityId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.region_options = res.data.obj;
            this.ruleForm.region = ''
            this.ruleForm.hospital = ''

          }
        })
      },
      //获取医院
      getHospital(provinceId,cityId){
        this.axios.get(this.common.getApi() + '/web/api/hospital/getHospital',{
          params:{
            params:{
              provinceId:provinceId,
              cityId: cityId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            // var newObj = res.data.obj.push({fkCityId: 54,
            //                               fkDistrictId: 644,
            //                               fkPolyclinicId: 6,
            //                               fkProvId: 7,
            //                               fkSpecialtyId: 0,
            //                               hospitalGrade: 1,
            //                               hospitalLevel: 1,
            //                               id: 1562,
            //                               name: "其他",
            //                               nature: 1,
            //                               numberOfBeds: 108})
            this.hospital_options = res.data.obj;
            //console.log(this.hospital_options);
            this.ruleForm.hospital = ''
          }
        })
      },
      //获取科室一级
      getParentOffice(){
        this.axios.get(this.common.getApi() + '/web/api/sectionOffice/getParentOffice','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_1_options = res.data.obj;
          }
        })
      },
      //获取科室二级
      getSonOffice(parentId){
        this.axios.get(this.common.getApi() + '/web/api/sectionOffice/getSonOffice',{
          params:{
            params:{
              parentId:parentId,
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_2_options = res.data.obj;
          }
        })
      },
      //获取行政职位
      getAdminiStraion(){
        this.axios.get(this.common.getApi() + '/web/api/systemmaster/getAdminiStraion','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.executive_options = res.data.obj;
          }
        })
      },
      //获取从医领域一级
      getParentFields(){
        this.axios.get(this.common.getApi() + '/web/api/fields/getParentFields','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.field_1_options = res.data.obj;
          }
        })
      },
      getSonFields(parentId){
        console.log(parentId);
        this.field_2_options = [];
        for(var i = 0; i < parentId.length; i++){
          this.axios.get(this.common.getApi() + '/web/api/fields/getSonFields',{
            params:{
              params:{
                parentId:parentId[i],
              }
            }
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              this.field_2_options = this.field_2_options.concat(res.data.obj);
            }
          })
        }
        console.log(this.field_2_options);
      }
    },
    watch:{

    }
  }
</script>

<style>
  .register-wrapper{
    width: 100%;
    background: #F6F6F6;
    padding-top: 20px;
    padding-bottom: 40px;
  }

  .register-wrapper .resetPwd-content{
    width: 1180px;
    min-height: 640px;
    background: #FFF;
    padding-top: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 0 200px;
    padding-top: 40px;
  }

  .register-wrapper .process-wrapper{
    width: 780px;
    height: 48px;
    border: 1px solid #E6E6E6;
    margin: 0 auto;
    display: flex;
    line-height: 48px
  }

  .register-wrapper .process-1,
  .register-wrapper .process-2,
  .register-wrapper .process-3{
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #333333;
    position: relative;
  }

  .register-wrapper .triangle {
    width: 0;
    height: 0;
    border-width: 25px 0 25px 24px;
    border-style: solid;
    border-color: transparent transparent transparent #E6E6E6;
    position: absolute;
    top: -1px;
    right: -25px;
  }

  .register-wrapper .triangle span{
    display: block;
    width: 0;
    height: 0;
    border-width: 25px 0 25px 24px;
    border-style: solid;
    border-color: transparent transparent transparent #fff;
    position: absolute;
    top: -25px;
    left: -26px;
  }

  .register-wrapper .process-wrapper .process-1.active,
  .register-wrapper .process-wrapper .process-2.active,
  .register-wrapper .process-wrapper .process-3.active{
    background: #13B5BB;
    color: #FFFFFF;
  }

  .register-wrapper .process-wrapper .process-1.active .triangle span,
  .register-wrapper .process-wrapper .process-2.active .triangle span{
    border-color: transparent transparent transparent #13B5BB;
  }

  .register-wrapper .phoneInput input{
    background: #F9F9F9;
  }

  .register-wrapper .btn-register{
    width: 400px;
    background: #13B5BB;
    color: #FFFFFF;
    border: none;
    margin-top: 40px;
    margin-bottom: 80px;
  }

  .register-wrapper .el-select .el-input.is-focus .el-input__inner,
  .register-wrapper .el-input__inner:focus{
    border-color: #13B5BB;
  }

  .register-wrapper .process-1 {
    z-index: 100;
  }

  .register-wrapper .tips{
    font-weight: bold;
    font-size: 14px;
    color: #0C0C0C;
    padding: 29px 0;
    border-bottom: 1px solid #E6E6E6;
  }

  .register-wrapper .el-form{
    margin-top: 40px;
  }

  .register-wrapper .el-form-item__content>.el-input {
    width: 400px;
  }

  .register-wrapper .form-tips{
    color: #666666;
    font-size: 12px;
    width: 400px;
    line-height: 20px;
    margin-top: 8px;
    position: absolute;
  }

  .register-wrapper .form-tips span{
    color: #3A88FF;
    font-size: 12px;
    text-decoration: underline;
    margin-right: 30px;
    cursor: pointer;
  }

  .register-wrapper .form-warning{
    color: #FF6161;
    font-size: 12px;
    margin-top: 10px;
  }

  .register-wrapper .el-select{
    width: 100%;
  }

  .register-wrapper .check-txt{
    font-size: 12px;
    color: #676767;
  }

  .register-wrapper .check-txt i{
    color: #3A88FF;
  }
</style>