<template>
  <div class="companyIntr-wrapper">
    <div class="intr-img">
      <img src="../../assets/banner2.png" alt="" />
    </div>
    <div class="intr-title">
      我们能做什么
    </div>
    <div class="intr-content">
      <div class="content-1">
        <div class="service-img">
          <img src="../../assets/abus_1.png" alt="" style="border-radius: 100%;"/>
        </div>
        <p>医疗专业服务</p>
        <div class="service-txt">
          您将有机会与医学行业的专家 及专业公司分享你的意见与建 议，从而引导医学、医药行业 新的产品、疗法、服务的方向 更好地为您及您的病人服务
        </div>
      </div>
      <div class="content-2">
        <div class="service-img">
          <img src="../../assets/abus_2.png" alt="" style="border-radius: 100%;"/>
        </div>
        <p>意见反馈</p>
        <div class="service-txt">
          我们将对您的意见、建议喝宝 贵的时间给予包括现金的奖励
        </div>
      </div>
      <div class="content-3">
        <div class="service-img">
          <img src="../../assets/abus_3.png" alt="" style="border-radius: 100%;"/>
        </div>
        <p>权威报告</p>
        <div class="service-txt">
          您有机会分享与您一样从全国 各地医务工作者和病友的调查 结果，同时您还可以看到世界 各地各种医学相关的权威报告
        </div>
      </div>
    </div>
    
    <div class="yss-say">
      <div class="yss-txt">
        通过加入我们的社区及参与我们的调查，您将会了解我们是一家专业的市场研究机构,所有行为都受世界调查协会行业行为准则。我们是中国及世界领先的医学专业市场研究机构。
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>
  .companyIntr-wrapper{
    background: #F1F1F1;
  }
  
  .companyIntr-wrapper .intr-img{
    width: 100%;
    height: 240px; 
    background: #012849;
    margin-bottom: 50px;
  }
  
  .companyIntr-wrapper .intr-title{
    text-align: center;
    font-size: 24px;
    color: #343434;
    font-weight: bold;
    margin-bottom: 50px;
  }
  
  .companyIntr-wrapper .intr-content{
    display: flex;
    justify-content: center;
    margin-bottom: 80px;
  }
  
  .companyIntr-wrapper .content-1,
  .companyIntr-wrapper .content-2,
  .companyIntr-wrapper .content-3{
    width:220px;
    height:380px;
    box-shadow:0px 8px 16px 0px rgba(0,0,0,0.05);
    background: #FFFFFF;
    padding: 0 20px;
    box-sizing: border-box;
  }
  
  .companyIntr-wrapper .content-2{
    margin: 0 30px;
  }
  
  .companyIntr-wrapper .yss-txt{
    width: 720px;
    padding: 40px 16px;
    border: 1px dashed #DADADA;
    margin: 0 auto;
  }
  
  .companyIntr-wrapper .yss-say{
    width: 100%;
    height: 260px;
    background: #FFF;
    padding-top: 37px;
    box-sizing: border-box;
  }
  
  .companyIntr-wrapper .service-img{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #B6926D;
    margin: 0 auto;
    margin-top: 30px;
  }
  
  .companyIntr-wrapper .intr-content p{
    font-size:18px;
    font-weight: bold;
    margin: 25px 0;
    text-align: center;
  }
  
  .companyIntr-wrapper .intr-content .service-txt{
    font-size:14px;
    color: #666;
    margin: 0 auto;
  }
</style>