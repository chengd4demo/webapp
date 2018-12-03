<template>
  <f7-page>
    <f7-navbar title="设备列表" back-link="后退"></f7-navbar>
    <div class="dm-2">
      <div class="dm-3">
        <dl>
          <dd>商家名称：<span>喜乐会</span><span style="color: #00d449;float: right">正在使用</span></dd>
          <dd>设备标号：8765478364672722</dd>
          <dd>使用时间：<span>2019-10-11 23:59:59</span></dd>
          <dd>使用时长：<span>1.5小时</span></dd>
          <dd>剩余时长：<span>0.5小时</span></dd>
          <dd>计费金额：<span>2元</span></dd>
        </dl>
      </div>
      <div class="dm-3">
        <dl>
          <dd>商家名称：<span>喜乐会</span><span style="color:#ff0000;">已停止</span></dd>
          <dd>设备标号：6782673792663372</dd>
          <dd>使用时间：<span>2019-10-10 21:11:11</span></dd>
          <dd>使用时长：<span>4小时</span></dd>
          <dd>剩余时长：<span>0小时</span></dd>
          <dd>计费金额：<span>4元</span></dd>
        </dl>
      </div>
    </div>
  </f7-page>
</template>

<script>
  export default {
    name: "trader-management"
  }
</script>

<style type="text/css">
  dd{
    font-size: 12px;
    line-height: 25px;
  }
  dl{
    margin-left: -40px;
  }
  .dm-2{
    width: 100%;
    margin:10px auto;
  }
  .dm-3{
    width: 90%;
    margin: 0px auto;
    text-indent: 10px;
    background: #EEEDED
  }

</style>
