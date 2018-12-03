<!-- center Page Template -->
<template id="page-state">

  <f7-page>
    <div class="center">提示</div>
    <div class="cancel">
      <div class="img-1">

      </div>
      <div class="explain">
       <div class="p-1">恭喜，支付成功</div>
        <div class="p-2">设备号：90342353452345</div>
        <div class="p-2">时长：12小时</div>
        <div class="p-2">支付金额：10元</div>
        <div class="p-2">优惠卷：10元</div>
      </div>
    </div>

  </f7-page>
</template>
<script>

</script>
<style type="text/css">
  .center{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: white;
    font-family: 微软雅黑;
    background: #E94E24;
    text-align: center;
  }
.cancel{
  width: 100%;
  height: 350px;
  position: absolute;
}
  .img-1{
    width: 150px;
    height: 150px;
    background: darkcyan;
    margin-right: auto;
    margin-left: auto;
    margin-top: 10%;
    display: flex;
  }
  .explain{
    width: 100%;
    height: 150px;
    margin-top: 7%;
  }
  .p-1{
    width: 100px;
    height: 25%;
    margin-right: auto;
    margin-left: auto;
  }
  .p-2{
    width: 200px;
    display: flex;
    margin-right: auto;
    margin-left: auto;
  }
</style>
