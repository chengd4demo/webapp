<template>
  <f7-page>
    <f7-navbar title="收入明细" back-link="" style="background:#e94e24;"></f7-navbar>
  <div class="mv-2">
    <div class="mv-3">
      <dl>
        <dd>付款时间：<span>2019-10-11 23:59:59</span></dd>
        <dd>使用时长：<span>0.5小时</span></dd>
        <dd>计费金额：<span>5元</span></dd>
        <dd>分润金额：<span>2.5元</span></dd>
        <dd>商户类型：<span>商家</span></dd>
        <dd>商户地址：<span>郑州市</span></dd>
      </dl>
    </div>
    <div class="mv-3">
      <dl>
        <dd>付款时间：<span>2019-10-11 10:00:00</span></dd>
        <dd>使用时长：<span>1小时</span></dd>
        <dd>计费金额：<span>6元</span></dd>
        <dd>分润金额：<span>3元</span></dd>
        <dd>商户类型：<span>投资商</span></dd>
        <dd>商户地址：<span>成都市</span></dd>
      </dl>
    </div>
  </div>
  </f7-page>
</template>

<style type="text/css">
  dd{
    font-size: 12px;
    line-height: 25px;
  }
  dl{
    margin-left: -40px;
  }
  .mv-2{
    width: 100%;
    margin:10px auto;
  }
  .mv-3{
    width: 90%;
    margin: 0px auto;
    text-indent: 10px;
    background: #EEEDED
  }

</style>
