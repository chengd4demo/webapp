<!-- center Page Template -->
<template id="page-center">

  <f7-page>
    <f7-navbar class="header-title" title="确认支付" back-link="" style="background: #E94E24" ></f7-navbar>
    <div class="header-confirm">
      <div class="confirm-v">
        <img src="../img/logo1.png">
      </div>
    </div>
    <div class="confirm-state">
      <p style="margin-left: 25px">设备号:<span class="span-1">{{machNo}}</span></p>
      <p>是否在线:<span class="span-2"> {{onLine ? '在线':'不在线'}}</span></p>
      <p>是否可用:<span class="span-2"> {{available ? '可用':'不可用'}}</span></p>
      <p style="margin-left: 25px">PM2.5:<span class="span-2">{{pm25}}</span></p>
      <p>使用时长:<span class="span-1">{{costTime/60}}小时</span></p>
      <p>支付金额:<span class="span-1">{{realPrice}}元</span></p>
      <p style="margin-left: 25px"  v-if='yhj'>优惠卷:<span class="span-1">10元</span></p>
    </div>
    <p style="margin-top: 50px;"><a href="/center/" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;">立即支付</a></p>
  </f7-page>
</template>
<script>
  import config from '@/util/config'
  export default {
    data(){
      return {
        realPrice: config.confirmPayment.realPrice,
        pm25: config.confirmPayment.pm25,
        machNo: config.confirmPayment.machNo,
        costTime: config.confirmPayment.costTime,
        available: config.confirmPayment.available,
        onLine:  config.confirmPayment.onLine,
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
  .header-confirm{
    width: 100%;
    height: 200px;
    text-align: center;
    padding-top:3px;
  }
  .confirm-v{
    width: 100%;
    height: 200px;
    border-radius:0px 0px 200px 200px;
    background: #E94E24;
  }
  .confirm-v img{
    width: 160px;
    height: 70px;
    margin-top: 30px;
  }
  .confirm-state p{
    font-size: 14px;
    margin-left: 10px;
  }
  .span-1{
    margin-left: 10px;
  }
  .span-2{
    width: 30px;
    height: 10px;
    color: white;
    margin-left: 10px;
    padding: 2px 5px;
    background: #43CF7C;
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
    background: #E94E24;
  }
</style>
