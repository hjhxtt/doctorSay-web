<template>
  <div class="basicData-wrapper">
    <div class="title">基本资料</div>
    <div class="form-wrapper">
      <div class="part-1">
        <div class="userhead">
          <el-upload
            class="avatar-uploader"
            :auto-upload="false"
            action="123"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="handleChange"
            accept="image/gif, image/jpeg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
          </el-upload>
          <span class="user-id">{{form_1.memberRealname}}</span>
        </div>
        <div class="change">可以修改邮箱和从医领域。其他资料的修改，请联系后台管理员：QQ-1523732752</div>
          <el-form :model="form_1" :rules="rules" ref="form_1" label-width="120px" :inline-message='true'>
            <el-form-item label="个人账号" prop="memberHandphone">
              <span class="user-account">{{form_1.memberHandphone}}</span>
              <span class="btn-jh" v-if="$store.state.status=='201'" @click="$router.push('/phoneVerification')">立即激活</span>
              <span class="btn-jh" v-if="$store.state.status=='202'" @click="$router.push('/perfectInformation')">立即完善资料</span>
              <span class="btn-jh" v-if="$store.state.status=='203'" @click="$router.push('/verifyZyz')">审核未通过，重新审核</span>
            </el-form-item>
            <el-form-item label="真实姓名" prop="memberRealname">
              <el-input placeholder="请填写您的真实姓名" v-model="form_1.memberRealname" class="unameInput" disabled></el-input>
            </el-form-item>
            <el-form-item label="您的性别" prop="memberSex">
              <el-radio-group v-model="form_1.memberSex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input placeholder="请填写您的电子邮箱" v-model="form_1.memberMail" class="emailInput"></el-input>
            </el-form-item>
            <!--------------------------------------------------------->
            <el-form-item label="所在医院" prop="fkHospitalId" >
              <el-select placeholder="请选择" v-model="form_1.memberProvince" style="width: 131px;" @change="getCityByProvince(form_1.memberProvince)" disabled>
                <el-option v-for="item in province_options" :label="item.provinceName" :value="item.provinceId" :key="item.provinceId"></el-option>
              </el-select>
              <el-select placeholder="请选择" v-model="form_1.memberCity" style="width: 131px;" @change = "getDistrictByCity(form_1.memberProvince,form_1.memberCity)" disabled>
                <el-option v-for="item in city_options" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
              </el-select>
              <el-select placeholder="请选择" v-model="form_1.fkDistrictId" style="width: 130px;" disabled>
                <el-option v-for="item in region_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <br />
              <el-form-item label="医院级别" style="margin-left:-120px;">
                <el-select placeholder="请选择" style="width: 400px;margin-top: 10px;" v-model="form_1.memberhospitallevel" disabled>
                  <el-option v-for="item in hospitalLev_options" :key="item.id" :label="item.sysname" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-select placeholder="请选择" style="width: 400px;margin-top: 10px;" v-model="form_1.fkHospitalId" disabled>
                <el-option v-for="item in hospital_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
                <el-option label="其他" value="-1"></el-option>
              </el-select>
              <br />
              <el-input style="width: 400px;margin-top: 10px;" v-if="form_1.fkHospitalId == -1" v-model="form_1.memberhospital" disabled></el-input>
              
            </el-form-item>

            <el-form-item label="工作科室" prop="membersectionoffice">
              <el-select v-model="form_1.hospital_departments_1" style="width: 198px;" @change="getSonOffice(form_1.hospital_departments_1)" disabled>
                <el-option v-for="item in hospital_1_options" :label="item.sectionofficename" :key="item.sectionofficeid" :value="item.sectionofficeid"></el-option>
              </el-select>
              <el-select v-model="form_1.membersectionoffice" style="width: 198px;" disabled>
                <el-option v-for="item in hospital_2_options" :label="item.sectionofficename" :key="item.sectionofficeid" :value="item.sectionofficeid"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职称" prop="memberstation">
              <el-select v-model="form_1.zc_1" @change = "getStationTechnicalTitle(form_1.zc_1)" style="width: 198px;" disabled>
                <el-option v-for="item in zc_1_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
              </el-select>
              <el-select v-model="form_1.memberstation" style="width: 198px;" disabled>
                <el-option v-for="item in zc_2_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="行政职位" prop="administrativeposition">
              <el-select v-model="form_1.administrativeposition" style="width: 200px;" disabled>
                <el-option v-for="item in xzzw_options" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="从医领域" prop="medical_field_2" >
              <el-select v-model="form_1.medical_field_1" placeholder="请选择" multiple style="width:400px;margin-bottom: 10px;" @change="getSonFields2(form_1.medical_field_1)">
                <el-option v-for="item in field_1_options" :label="item.fieldname" :key="item.id" :value="item.id"></el-option>
              </el-select>
              <br />
              <el-select v-model="form_1.membertechnical" placeholder="请选择" multiple style="width: 400px;">
                <el-option v-for="item in field_2_options" :label="item.fieldname" :key="item.id" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          
            <el-form-item style="border-bottom: 1px solid #E5E5E5;padding-bottom: 40px;">
              <el-button class="btn-save" @click="submitForm('form_1')" :loading="isload1">保存</el-button>
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
        imageUrl: '',
        user_name:'',
        user_email:'',
        province:'',
        city:'',
        hospital_province:'',
        hospital_city:'',
        hospital_region:'',
        hospital:'',
        hospital_name:'',
        work_department:'',
        job:'',
        job_name:'',
        job_level:'',
        job_field:'',
        job_year:'',
        sex:'',
        birth_year:'',
        meeting:'',
        school_level:'',
        graduation_time:'',
        school_province:'',
        school_city:'',
        school_region:'',
        school:'',
        authentication_type:[],
        professional_certificate:'',
        certificate_num:'',
        fileList:[],
        region_number:'',
        phone_number:'',
        room_number:'',
        start_time:'',
        end_time:'',
        memberHandphone:'',
        baseurl: baseurl,
        form_1: {
          memberHandphone: null,
          smscode: null,
          memberRealname:null,
          memberMail:null,
          memberSex: null,
          memberBirYear: null,
          departmentstle:null,
          workdate:null,
          zc_1:null,
          memberstation:null,
          memberidcard:null,
          administrativeposition:null,
          medical_field_1:null,
          membertechnical:null,
          hospital_departments_1:null,
          membersectionoffice:null,
          memberProvince:null,
          memberCity:null,
          fkDistrictId:null,
          fkHospitalId:null,
          societyid:null,
          memberEducation:null,
          graduationTime:null,
          endTime:null,
          beginTime:null,
          registerTime:null,
          memberhospital: null,
          province:null,
          graduationInstitutions:null,
          memberhospitallevel:null
        },
        form_2: {
          memberHandphone: null,
          smscode: null,
          memberRealname:null,
          memberMail:null,
          memberSex: null,
          memberBirYear: null,
          departmentstle:null,
          workdate:null,
          zc_1:null,
          memberstation:null,
          memberidcard:null,
          administrativeposition:null,
          medical_field_1:null,
          membertechnical:null,
          hospital_departments_1:null,
          membersectionoffice:null,
          memberProvince:null,
          memberCity:null,
          fkDistrictId:null,
          fkHospitalId:null,
          societyid:null,
          memberEducation:null,
          graduationTime:null,
          endTime:null,
          beginTime:null,
          registerTime:null,
          memberhospital: null,
          inputhospital: null,
          province:null,
          graduationInstitutions:null,
        },
        rules: {
          memberHandphone: [
            { required: true, message: '请填写手机号', trigger: 'blur' }
          ],
          memberRealname:[
            { required: true, message: '请填写真实姓名', trigger: 'blur' }
          ],
          memberSex:[
            { required: true, message: '请选择会员性别', trigger: 'change' }
          ],
          memberBirYear:[
            { required: true, message: '请选择出生年份', trigger: 'change' }
          ],
          fkHospitalId:[
            { required: true, message: '请选择所在医院', trigger: 'change' }
          ],
          membersectionoffice:[
            { required: true, message: '请选择工作科室', trigger: 'change' }
          ],
          departmentstle:[
            { required: true, message: '请填写科室电话', trigger: 'blur' }
          ],
          workdate:[
            { required: true, message: '请选择从医年份', trigger: 'change' }
          ],
          memberidcard:[
            { required: true, message: '请填写证件号', trigger: 'blur' }
          ],
          administrativeposition:[
            { required: true, message: '请选择行政职位', trigger: 'change' }
          ],
          memberstation:[
            { required: true, message: '请选择职称', trigger: 'change' }
          ],
          membertechnical:[
            { required: true, message: '请选择从医领域', trigger: 'change' }
          ],
        },
        zc_1_options:[],
        zc_2_options:[],
        xzzw_options:[],
        field_1_options:[],
        field_2_options:[],
        hospital_1_options:[],
        hospital_2_options:[],
        province_options:[],
        city_options:[],
        region_options:[],
        hospital_options:[],
        education_options:[],
        school_options:[],
        meeting_options:[],
        level:null,
        grade:null,
        hospitalNature:null,
        hospitalType:null,
        numberOfBeds:null,

        isload1: false,
        isload2: false,
        hospitalLev_options:[]
      };
    },
    mounted(){
      this.getMemberInfo();
      this.checkLogin();
      this.getProvince();
      this.getParentOffice();
      this.getStationDuties();
      this.getAdminiStraion();
      this.getParentFields();
      this.getSociety();
      this.getEducational();
      this.getHospitalLevel()
    },
    methods: {
      getHospitalLevel(){
        this.axios.get(this.common.getApi() + '/web/api/systemmaster/getHospitalLevel').then((res) => {
          if(res.data.code == '200'){
            this.hospitalLev_options = res.data.obj;
          }
        })
      },
      handleChange(file, fileList) {
        var formData = new FormData();
        console.log(file);
        formData.append('file', file.raw);
        // 发送请求;
        this.axios.post(this.common.getApi() + '/web/api/member/uploadMemberHead',formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then((res) => {
          if(res.data.success){
            this.imageUrl = this.baseurl + res.data.obj;
            this.$store.commit('set_headurl', res.data.obj);
          }else{
            this.$message.error(res.data.msg)
          }
        })
      },
      submitForm(formName){
          var memberSex = null
          if(this.form_1.memberSex == 0){
                memberSex = "男"
              }else{
                memberSex = "女"
              }
        if(formName == "form_1"){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.isload1 = true;
              this.axios.post(this.common.getApi() + '/web/api/member/editMemberInfoOne',{
                params:{
                  memberRealname: this.form_1.memberRealname,
                  memberMail: this.form_1.memberMail,
                  memberProvince: Number(this.form_1.memberProvince),
                  memberCity: Number(this.form_1.memberCity),
                  fkDistrictId: Number(this.form_1.fkDistrictId),
                  fkHospitalId: Number(this.form_1.fkHospitalId),
                  memberhospital: this.form_1.memberhospital,
                  membersectionoffice: Number(this.form_1.membersectionoffice),
                  memberstation: Number(this.form_1.memberstation),
                  administrativeposition: Number(this.form_1.administrativeposition),
                  membertechnical: this.form_1.membertechnical.join(','),
                  workdate: Number(this.form_1.workdate),
                  memberSex:memberSex
                },
              }).then((res) => {
                this.isload1 = false;
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '保存成功'
                  })
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }else if(formName == "form_2"){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.isload2 = true;
              var memberSex = null;
              if(this.form_2.memberSex == 0){
                memberSex = "男"
              }else{
                memberSex = "女"
              }
              this.axios.post(this.common.getApi() + '/web/api/member/editMemberInfoTwo',{
                params:{
                  memberSex: memberSex,
                  memberBirYear: Number(this.form_2.memberBirYear),
                  societyid: this.form_2.societyid.join(','),
                  memberEducation: Number(this.form_2.memberEducation),
                  graduationTime: this.form_2.graduationTime,
                  graduationInstitutions: this.form_2.graduationInstitutions,
                },
              }).then((res) => {
                this.isload2 = false
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '保存成功'
                  })
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
//      const isLt2M = file.size / 1024 / 1024 < 2;
//
//      if (!isLt2M) {
//        this.$message.error('上传头像图片大小不能超过 2MB!');
//      }
//      return isJPG && isLt2M;
      },
      getMemberInfo(){
        var that = this
        this.axios.get(this.common.getApi() + '/web/api/member/getMemberInfo','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            if(res.data.obj.memberSex == '男'){
              that.form_1.memberSex = 0
            }else{
              that.form_1.memberSex = 1
            }
            
            this.imageUrl = this.baseurl+'/'+res.data.obj.memberphoto
            this.form_1.memberRealname = res.data.obj.memberRealname;
            this.form_1.memberMail = res.data.obj.memberMail;
            this.form_1.memberHandphone = res.data.obj.memberHandphone.replace(res.data.obj.memberHandphone.substring(3,7),'****');
            this.form_1.memberProvince = res.data.obj.memberProvince;
            this.getCityByProvince(this.form_1.memberProvince)
            if(Boolean(res.data.obj.memberCity)){
              this.form_1.memberCity = res.data.obj.memberCity;
            }
            this.getDistrictByCity(this.form_1.memberProvince,this.form_1.memberCity);
            if(Boolean(res.data.obj.fkDistrictId)){
              if(res.data.obj.fkDistrictId == -1){
                this.form_1.fkDistrictId = null
              }else{
                this.form_1.fkDistrictId = res.data.obj.fkDistrictId.toString();
              }
              
            }
            //todo渲染医院级别 字段对上即可
            if(Boolean(res.data.obj.memberhospitallevel)){
              this.form_1.memberhospitallevel = res.data.obj.memberhospitallevel.toString()
            }
             
            if(Boolean(res.data.obj.fkHospitalId)){
              this.form_1.fkHospitalId = res.data.obj.fkHospitalId.toString();
            }else{
              this.form_1.fkHospitalId = null
            }
            
            this.form_1.memberhospital = res.data.obj.memberhospital.toString();
            this.form_1.membersectionoffice = res.data.obj.membersectionoffice;
            this.getSectionOfficeById();
            this.form_1.memberstation = res.data.obj.memberstation.toString();
            this.getStationById();
            this.form_1.administrativeposition = res.data.obj.administrativeposition.toString();
            this.form_1.membertechnical = res.data.obj.membertechnical;
            if(this.form_1.membertechnical.length != 0){
              this.form_1.membertechnical = this.form_1.membertechnical.split(',');
              var a = [];
              for(var i = 0; i < this.form_1.membertechnical.length; i++){
                a.push(this.form_1.membertechnical[i]);
              }
              this.form_1.membertechnical = a;
              console.log(this.form_1.membertechnical);
              this.getFieldsById();
            }
            debugger
            if(Boolean(res.data.obj.workdate)){
              this.form_1.workdate = res.data.obj.workdate.toString();
            }
            
            console.log(this.form_2.memberSex)
            if(this.form_2.memberSex == "男"){
              this.form_2.memberSex = 0
            }else{
              this.form_2.memberSex = 1
            }
            this.form_2.memberBirYear = res.data.obj.memberBirYear.toString();
            this.form_2.societyid = res.data.obj.societyid;
            if(this.form_2.societyid.length != 0){
              this.form_2.societyid = this.form_2.societyid.split(',');
              var b = [];
              for(var i = 0; i < this.form_2.societyid.length; i++){
                b.push(Number(this.form_2.societyid[i]));
              }
              this.form_2.societyid = b;
              console.log(this.form_2.societyid);
            }
            this.form_2.memberEducation = res.data.obj.memberEducation;
            this.form_2.graduationTime = res.data.obj.graduationTime;
            this.form_2.graduationInstitutions = res.data.obj.graduationInstitutions;
//          this.form.graduationInstitutions = res.data.obj.graduationInstitutions;
          }
        })
      },
      checkLogin(){
        this.axios.get(this.common.getApi() + '/web/api/auth/checkLogin','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
//          this.user_name = res.data.obj.memberRealname;
//          this.user_email = res.data.obj.memberMail;
//          this.memberHandphone = res.data.obj.memberHandphone.replace(res.data.obj.memberHandphone.substring(3,7),'****');
          }
        })
      },
      getStationById(){
        this.axios.get(this.common.getApi() + '/web/api/station/getStationById',{
          params:{
            params:{
              id: this.form_1.memberstation
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.form_1.zc_1 = res.data.obj.parentid.toString();
            this.getStationTechnicalTitle(Number(this.form_1.zc_1))
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
            this.zc_1_options = res.data.obj;
          }
        })
      },
      //获取职称二级
      getStationTechnicalTitle(parentId){
        this.axios.get(this.common.getApi() + '/web/api/station/getStationTechnicalTitle',{
          params:{
            params:{
              parentId: Number(parentId)
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.zc_2_options = res.data.obj;
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
            this.xzzw_options = res.data.obj;
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
      getSonFields1(parentId){
        console.log(parentId);
          this.axios.get(this.common.getApi() + '/web/api/fields/getSonFields',{
            params:{
              params:{
                parentId:Number(parentId),
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
        //}
        console.log(this.field_2_options);
      },
      getSonFields2(parentId){
        console.log(parentId);
        this.field_2_options = [];
        for(var i = 0; i < parentId.length; i++){
          this.axios.get(this.common.getApi() + '/web/api/fields/getSonFields',{
            params:{
              params:{
                parentId:Number(parentId[i]),
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
      },
      getFieldsById(){
        console.log(this.form_1.membertechnical);
        this.form_1.medical_field_1 = [];
        var that = this
        for(var i = 0; i < this.form_1.membertechnical.length;i++){
          this.axios.get(this.common.getApi() + '/web/api/fields/getFieldsById',{
            params:{
              params:{
                id: Number(this.form_1.membertechnical[i])
              }
            }
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              //todo 循环子数据  拿到父级数据
              console.log('3');
              debugger
              if(that.form_1.medical_field_1.indexOf(res.data.obj.parentid.toString()) == -1){
                
                that.form_1.medical_field_1.push(res.data.obj.parentid.toString());
                that.getSonFields1(res.data.obj.parentid);

              }
            }
          })
        }
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
      getSectionOfficeById(){
        this.axios.get(this.common.getApi() + '/web/api/sectionOffice/getSectionOfficeById',{
          params:{
            params:{
              id: this.form_1.membersectionoffice
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.form_1.hospital_departments_1 = res.data.obj.parentid;
            this.getSonOffice(this.form_1.hospital_departments_1)
          }
        })
      },
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
      //获取城市列表
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
      //获取地区
      getDistrictByCity(provinceId,cityId){
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
          }
        })
        //获取医院
        this.axios.get(this.common.getApi() + '/web/api/hospital/getHospital',{
          params:{
            params:{
              provinceId: provinceId,
              cityId: cityId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_options = res.data.obj;
          }
        })
      },
      //获取教育程度
      getEducational(){
        this.axios.get(this.common.getApi() + '/web/api/systemmaster/getEducational','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.education_options = res.data.obj;
          }
        })
      },
      getSociety(){
        this.axios.get(this.common.getApi() + '/web/api/society/getSociety','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          console.log(res);
          if(res.data.code == '200'){
            this.meeting_options = res.data.obj
          }
        })
      },
      getGraduateList(provinceId){
        this.school_options = null;
        this.form_2.school = null;
        this.axios.get(this.common.getApi() + '/web/api/graduate/getGraduateList',{
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
            this.school_options = res.data.obj;
          }
        })
      },
    }
  }
</script>

<style>
  .basicData-wrapper{
    width: 880px;
    min-height: 800px;
    background: #FFFFFF;
    box-sizing: border-box;
  }

  .basicData-wrapper .title{
    line-height: 80px;
    font-size: 20px;
    color: #0C0C0C;
    padding-left: 20px;
  }

  .basicData-wrapper .form-wrapper{
    padding: 0 20px 0 100px;
  }

  .basicData-wrapper .part-1{
    /*border-bottom: 1px solid #E5E5E5;*/
    padding-bottom: 20px;
  }

  .basicData-wrapper .avatar-uploader .el-upload {
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-right: 20px;
    width: 80px;
  }
  .basicData-wrapper .avatar-uploader .el-upload:hover .avatar-uploader-icon {
    opacity: 1;
  }

  .basicData-wrapper .avatar-uploader-icon {
    width: 100%;
    height: 100%;
    line-height: 80px;
    font-size: 14px;
    color: #8c939d;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #FFF;
    background: rgba(0,0,0,0.5);
    opacity: 0;
    transition: all 0.11s linear;
    text-align: center;
  }
  .basicData-wrapper .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }

  .basicData-wrapper .userhead{
    display:flex;
    align-items: center;
    margin-bottom: 30px;
  }

  .basicData-wrapper .userhead .user-id{
    font-size: 14px;
    color: #333;
  }

  .basicData-wrapper .user-account{
    color: #999999;
  }

  .basicData-wrapper .btn-jh{
    color: #13B5BB;
    text-decoration: underline;
    margin-left: 35px;
    cursor: pointer;
  }

  .basicData-wrapper .unameInput,
  .basicData-wrapper .emailInput{
    width: 400px;
  }

  .basicData-wrapper .btn-save{
    background: #13B5BB;
    color: #FFFFFF;
    border: 0;
    width: 80px;
    height: 40px;
  }

  .basicData-wrapper .btn-save:focus,
  .basicData-wrapper .btn-save:hover {
    border-color: #036C68;
    background-color: #15BFC1;
  }

  .basicData-wrapper .el-select .el-input.is-focus .el-input__inner,
  .basicData-wrapper .el-input__inner:focus{
    border-color: #13B5BB;
  }

  .basicData-wrapper .el-input input{
    background: #fff;
  }

  .basicData-wrapper .provinceSelect,
  .basicData-wrapper .citySelect,
  .basicData-wrapper .hospitalSelect,
  .basicData-wrapper .hospitalInput,
  .basicData-wrapper .workDepartmentInput,
  .basicData-wrapper .jobSelect,
  .basicData-wrapper .jobNameSelect,
  .basicData-wrapper .jobLevelSelect,
  .basicData-wrapper .jobFieldSelect,
  .basicData-wrapper .yearSelect,
  .basicData-wrapper .levelSelect,
  .basicData-wrapper .graduationTimeSelect,
  .basicData-wrapper .schoolSelect,
  .basicData-wrapper .professionalSelect,
  .basicData-wrapper .certificateInput{
    width: 400px;
  }

  .basicData-wrapper .hospitalSelect,
  .basicData-wrapper .hospitalInput,
  .basicData-wrapper .schoolSelect{
    margin-top: 20px;
  }

  .basicData-wrapper .hosProvinceSelect,
  .basicData-wrapper .hosCitySelect,
  .basicData-wrapper .hosRegionSelect,
  .basicData-wrapper .schProvinceSelect,
  .basicData-wrapper .schCitySelect,
  .basicData-wrapper .schRegionSelect{
    width: 120px;
    margin-left: 16px;
  }

  .basicData-wrapper .hosProvinceSelect,
  .basicData-wrapper .schProvinceSelect{
    margin-left: 0;
  }

  .basicData-wrapper .part-2,
  .basicData-wrapper .part-3{
    border-bottom: 1px solid #E5E5E5;
    padding-top: 40px;
  }

  .basicData-wrapper .meetingInput{
    width: 340px;
  }

  .basicData-wrapper .btn-addData{
    background: #13B5BB;
    color: #FFFFFF;
    border: none;
    width: 40px;
    height: 40px;
    text-align: center;
    padding: 0;
    margin-left: 15px;
  }

  .basicData-wrapper .upload-demo{
    width: 400px;
  }

  .basicData-wrapper .el-upload{
    width: 100%;
    text-align: left;
  }

  .basicData-wrapper .btn-example{
    color: #13B5BB;
    float: right;
  }

  .basicData-wrapper .btn-upload{
    background: #13B5BB;
    border: none;
  }

  .basicData-wrapper .regionnumInput{
    width: 80px;
  }

  .basicData-wrapper .phonenumInput{
    width: 200px;
    margin-left: 17px;
  }

  .basicData-wrapper .roomnumInput{
    width: 80px;
    margin-left: 17px;
  }

  .basicData-wrapper .phone-tips{
    line-height: 20px;
    color: #666666;
    width: 400px;
    font-size: 12px;
    margin: 10px 0;
  }

  .basicData-wrapper .phone-warning{
    color: #FF6161;
    font-size: 12px;
  }

  .basicData-wrapper .startTime,
  .basicData-wrapper .endTime{
    width: 180px;
  }
  .change{
    color:red;
    margin-bottom: 50px;
  }
</style>