<template>
  <div class="personalIndex-wrapper">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      width="30%">
      <span>您还未激活，请立即前往激活</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="$router.push('/phoneVerification')">立即激活</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%">
      <span>您还未完善资料，请立即前往完善</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="$router.push('/perfectInformation')">立即完善</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible3"
      width="30%">
      <span>您的审核未通过，请重新提交</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="$router.push('/verifyZyz')">重新提交</el-button>
      </span>
    </el-dialog>

    <div class="sure-state">
      <span class="state-txt"  v-if="$store.state.status=='200'">认证状态：您提交的职业证审核已通过</span>
      <span class="state-txt"  v-if="$store.state.status=='201'">认证状态：您还未激活</span>
      <span class="state-txt"  v-if="$store.state.status=='202'">认证状态：您还未完善资料</span>
      <span class="state-txt"  v-if="$store.state.status=='203'">认证状态：您提交的执业证审核未通过</span>
      <span class="state-txt"  v-if="$store.state.status=='205'">认证状态：您提交的执业证审核正在审核中</span>
      <el-button class="btn-resubmit" v-if="$store.state.status=='201'" @click="$router.push('/phoneVerification')">立即激活</el-button>
      <el-button class="btn-resubmit" v-if="$store.state.status=='202'" @click="$router.push('/perfectInformation')">立即完善资料</el-button>
      <el-button class="btn-resubmit" v-if="$store.state.status=='203'" @click="$router.push('/verifyZyz')">立即重新提交</el-button>
    </div>

    <div class="main">
      <div class="tips">
        <span>你的推荐码：<b style="color: #000;">{{$store.state.recode}}</b> (推荐同事或者真实医生立即获得30元奖励)</span>
        <!--<span class="detail">查看详细</span>-->
      </div>
      <div class="title">调研服务</div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="projectId"
          label="项目编号">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="projectState"
          label="项目状态">
        </el-table-column>
        <el-table-column
          prop="state"
          label="参与状态">
        </el-table-column>
        <el-table-column
          prop="projectIntegral"
          label="项目礼金">
        </el-table-column>
         <el-table-column
          prop="integral"
          label="获得积分">
        </el-table-column>
        <el-table-column
          prop="joinTime"
          label="参与时间">
        </el-table-column>
        <el-table-column
          prop="proTime"
          label="项目期间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button v-if="scope.row.projectState != '已结束' " type="text" size="small" @click="goToProjectJoinPage(scope.row)">立即参与</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="pageTotal"
        :page-size="pageSize"
        @current-change="go">
      </el-pagination>
      <div class="title">积分商城</div>
      <ul class="quanyi-list">
        <router-link :to="{path:'/proDetail',query: {id: item.id}}" v-for="item in giftsList">
          <li>
            <div class="quanyi-img" style="width: 260px;">
              <img :src="baseurl + item.giftpicurl" alt="" width="100%"/>
            </div>
            <div class="quanyi-info">
              <p class="quanyi-name">{{item.giftname}}</p>
              <p class="quanyi-money"><span class="icon-jf"><img src="../../assets/icon_jf.png" alt=""/></span>{{item.giftprize}}</p>
            </div>
          </li>
        </router-link>
      </ul>
      <el-pagination
        layout="prev, pager, next"
        :total="pageTotal1"
        :page-size="pageSize1"
        @current-change="go1">
      </el-pagination>
    </div>
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
        pageIndex1: 1,
        pageSize1: 3,
        pageTotal1: null,
        baseurl: baseurl,
        giftsList:[],
        dialogVisible1:false,
        dialogVisible2:false,
        dialogVisible3:false,
        proTime:'',
      }
    },
    mounted(){
      this.getMemberProjectList(this.pageIndex,this.pageSize);
      this.getGiftsList(this.pageIndex1,this.pageSize1);
      this.checkMemberState();
      console.log(this.$store.state.status);

    },
    methods:{
      getMemberProjectList(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/web/api/project/getMemberProjectList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == "200"){

            res.data.obj.list.map(e=>{
              if(e.state == 0){
                e.state = '中途退出'
              }else if(e.state == 1){
                e.state = '不符合条件'
              }else if(e.state == 2){
                e.state = '配额满'
              }else if(e.state == 3){
                e.state = '已完成'
              }else if(e.state == 4){
                e.state = '审核拒绝'
              }

              e.proTime = e.projectPutTime + '-' +e.projectEndTime
            })

            this.tableData = res.data.obj.list;

            this.pageTotal = res.data.obj.pager.total;
            for(var i = 0; i < this.tableData.length; i++){
              if(this.tableData[i].projectState == 0){
                this.tableData[i].projectState = "正在进行"
              }else if(this.tableData[i].projectState == 1){
                this.tableData[i].projectState = "已结束"
              }else if(this.tableData[i].projectState == 2){
                this.tableData[i].projectState = "等待积分处理"
              }else if(this.tableData[i].projectState == 3){
                this.tableData[i].projectState = "暂停"
              }else if(this.tableData[i].projectState == 5){
                this.tableData[i].projectState = "尚未开始"
              }else if(this.tableData[i].projectState == 6){
                this.tableData[i].projectState = "项目撤销"
              }
              if(this.tableData[i].joinState == 0){
                this.tableData[i].joinState = "未参与"
              }else if(this.tableData[i].joinState == 1){
                this.tableData[i].joinState = "已参与"
              }
            }
          }
        })
      },
      go(currentPage){
        this.getMemberProjectList(currentPage,this.pageSize);
      },
      goToProjectJoinPage(row){
        this.axios.get(this.common.getApi() + '/web/api/project/goToProjectJoinPage',{
          params:{
            params:{
              id: row.id,
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            
            this.$router.push({
                      path:'/welcomeAnser',
                      query:{
                        params:JSON.stringify(res.data.obj),
                        data:JSON.stringify(row)
                      }
                    })

          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      go1(currentPage){
        this.getGiftsList(currentPage,this.pageSize1);
      },
      getGiftsList(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/web/api/gifts/getGiftsList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
              giftstairkind: this.giftstairkind,
              integralRange: this.integralRange,
              giftsName: this.giftsName,
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.giftsList = res.data.obj.list;
          this.pageTotal1 = res.data.obj.pager.total;
        })
      },
      checkMemberState(){
        this.axios.get(this.common.getApi() + '/web/api/member/checkMemberState','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){//成功
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '201'){//用户手机号尚未激活
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '202'){//用户尚未完善资料
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '203'){//用户审核未通过
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '204'){//未登录
            this.$store.commit('set_status', res.data.code);
          }else if(res.data.code == '205'){//用户审核中
            this.$store.commit('set_status', res.data.code);
          }
          console.log(this.$store.state.status);
          if(this.$store.state.status == '201'){
            console.log(this.$store.state.status);
            this.dialogVisible1 = true;
          }else if(this.$store.state.status == '202'){
            console.log(this.$store.state.status);
            this.dialogVisible2 = true;
          }else if(this.$store.state.status == '203'){
            console.log(this.$store.state.status);
            this.dialogVisible3 = true;
          }

        })
      }
    }

  }
</script>

<style>
  .personalIndex-wrapper .sure-state{
    background: #FFFFFF;
    font-size: 14px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .personalIndex-wrapper .sure-state .state-txt{
    color: #FF4461;
  }

  .personalIndex-wrapper .sure-state .btn-resubmit{
    color: #FFFFFF;
    background: #13B5BB;
    border: none;
  }

  .personalIndex-wrapper .main{
   padding: 0 18px;
   min-height: 600px;
   background: #FFFFFF;
   margin-top: 20px;
  }

  .personalIndex-wrapper .main .title{
    font-weight: bold;
    font-size: 16px;
    margin: 20px 0;
    color: #000;
  }

  .personalIndex-wrapper .main .tips{
    font-size: 14px;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ECECEC;
  }

  .personalIndex-wrapper .main .detail{
    color: #13B5BB;
    text-decoration: underline;
    margin-left: 20px;
  }

  .personalIndex-wrapper .main .el-table{
    margin-bottom: 80px;
  }

  .personalIndex-wrapper .main .el-table th.is-leaf {
    background: #13B5BB;
    color: #FFF;
  }

  .personalIndex-wrapper .main .el-table th{
    padding: 20px 0;
  }

  .personalIndex-wrapper .main .el-table th.is-leaf .cell{
    border-left: 1px solid #fff;
  }

  .personalIndex-wrapper .main .el-table thead tr th.is-leaf:nth-child(1) .cell{
    border-left: none;
  }

  .personalIndex-wrapper .quanyi-list {
    display: flex;
    flex-wrap: wrap;
  }

  .personalIndex-wrapper .quanyi-list li {
    margin-right: 20px;
    background: #FFF;
    margin-bottom: 20px;
    box-shadow: 0px 4px 16px 0px rgba(0,0,0,0.1);
    cursor: pointer;
    width: 260px;
  }

  .personalIndex-wrapper .quanyi-info {
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 16px;
  }

  .personalIndex-wrapper .quanyi-name {
    font-size: 14px;
    color: #0C0C0C;
    font-weight: bold;
  }

  .personalIndex-wrapper .quanyi-money {
    color: #989898;
    font-size: 14px;
    margin-top: 8px;
    display: flex;
    align-items: center;
  }

  .personalIndex-wrapper .quanyi-list a:nth-child(3n) li {
    margin-right: 0;
  }

  .personalIndex-wrapper  .el-pagination{
    background: #FFF;
    display: flex;
    justify-content: center;
    height: 80px;
    align-items: center;
  }

  .personalIndex-wrapper a{
    text-decoration: none;
  }
</style>