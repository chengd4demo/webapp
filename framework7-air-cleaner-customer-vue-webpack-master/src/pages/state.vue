<!-- center Page Template -->
<template id="page-state">

  <f7-page>
    <div class="center">提示</div>
    <div class="cancel">
      <div class="img-1">
        <img src="../img/success.svg">
      </div>
      <div class="explain">
        <div class="p-1">恭喜，支付成功</div>
        <div class="p-2">设备号：{{machNo}}</div>
        <div class="p-2">  时长：{{costTime/60}}</div>
        <div class="p-2">支付金额：{{realPrice}}元</div>
        <!--<div class="p-2">优惠卷：10元</div>-->
      </div>
      <a href="/center/"><p class="button button-fill" style="margin-top: 50px; margin-left: 5%; width:90%;background:#e94e24;">返回(测试)</p></a>
    </div>

  </f7-page>
</template>
<script>
  import config from '@/util/config'
  export default {
    data(){
      return {
        realPrice: config.confirmPayment.realPrice,
        machNo: config.confirmPayment.machNo,
        costTime: config.confirmPayment.costTime,
        yhj:false
      }
    },
    methods:{
      pay() {

      }
    }
  }
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
    width: 48px;
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
    text-align:center;
    width: 100%;
    height: 25%;
    color: #7A7A7C;
  }
  .p-2{
    width: 200px;
    display: flex;
    color: #7A7A7C;
    margin-right: auto;
    margin-left: auto;
  }
</style>
