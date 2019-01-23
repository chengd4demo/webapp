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
      <table>
        <tr>
          <td>设备序列号:</td>
          <td><span class="span-1">{{deviceSequence}}</span></td>
        </tr>
        <tr>
          <td>是否在线:</td>
          <td><span class="span-2">{{onLine ? '在线':'不在线'}}</span></td>
        </tr>
        <tr>
          <td>是否可用:</td>
          <td><span class="span-2">{{available ? '可用':'不可用'}}</span></td>
        </tr>
        <tr>
          <td>PM2.5:</td>
          <td><span class="span-2">{{pm25}}</span></td>
        </tr>
        <tr>
          <td>使用时长:</td>
          <td><span class="span-1">{{costTime/60}}小时</span></td>
        </tr>
        <tr>
          <td>支付金额:</td>
          <td><span class="span-1">{{realPrice}}元</span></td>
        </tr>
        <!--<tr>
          <td>优惠卷:</td>
          <td v-if='yhj'><span class="span-1">10元</span></td>
        </tr>-->
      </table>

    </div>
    <p style="margin-top: 50px;"><a href="#" @click="pay()" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;">立即支付</a></p>
  </f7-page>
</template>
<script>
  import config from '@/util/config'
  import api from '../network'
  export default {
    data(){
      return {
        realPrice: config.confirmPayment.realPrice,
        pm25: config.confirmPayment.pm25,
        deviceSequence: config.confirmPayment.deviceSequence,
        costTime: config.confirmPayment.costTime,
        available: config.confirmPayment.available,
        onLine:  config.confirmPayment.onLine,
        priceId:  config.confirmPayment.priceId,
        yhj:false
      }
    },
    methods:{
    
      pay() {
          alert(this.priceId)
        api.pay('?priceId=' + this.priceId + '&machNo='+ this.deviceSequence).then(res=>{
          let data = res.data.data
          if (res.data.status == '200' && data){
            window.location.href = data
          } else {
            alert(res.data.description)
          }

        }).catch(err => {

        })
      
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
  .confirm-state{
    margin-top: 20px;
  }
  .confirm-state table{
    margin: auto;
  }
  .confirm-state table tr td{
    padding-top: 10px;
  }
  .confirm-state table tr td:nth-child(1){
    text-align: right;
  }
  .confirm-state table tr td:nth-child(2){
    text-align: left;
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
