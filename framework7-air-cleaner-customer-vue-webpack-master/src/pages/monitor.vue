<!-- center Page Template -->
<template id="page-center">

  <f7-page>
    <f7-navbar class="header-title" title="我的PM2.5" back-link="" style="background:#000000; opacity: 0.2;"></f7-navbar>
    <div class="header-quality">
      <div class="air-quality">55</div>
      <p class="air-condition">空气状况:良好</p>
      <p class="health-advice">健康建议:极少数敏感人群应减少户外运动</p>
    </div>
    <div class="running-state">
      <p>设备号:3458934589456</p>
      <p>设备运行状态:正常</p>
      <p>设备运行时长:2小时22分</p>
      <p>剩余运行时长:1小时40分钟</p>
    </div>
    <a href="/price/"><div class="bottom"><button>加&nbsp;&nbsp;时</button></div></a>
    <!--右下角客服跳转按钮-->
<!--    <div class="fab fab-right-bottom color-purple">
      &lt;!&ndash;1:定义悬浮按钮UI样式&ndash;&gt;
      <a href="/abount/">
        <i class="icon-23453fdf"><img src="../img/kehu.png"></i>

      </a>
    </div>-->
  </f7-page>
</template>
<script>

</script>
<style type="text/css">
.header-quality{
  width: 100%;
  height: 200px;
  text-align: center;
  background: url("../img/sl.jpg");
}
  .air-quality{
    font-size: 80px;
    color: white;
  }
  .header-quality p{
    font-size: 14px;
    color: white;
  }
  .running-state p{
    font-size: 14px;
    margin-left: 10px;
  }
  .bottom{
    width: 100%;
  }
.bottom button{
  font-size: 20px;
  padding: 5px 0;
  border: none;
  color: white;
  text-align: center;
  background: #D43030;
}
</style>
