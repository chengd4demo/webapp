<!-- center Page Template -->
<template id="page-msg">

  <f7-page class="no-navbar">
    <div class="center">提示</div>
    <div class="cancel">
      <div class="img-1">
        <img src="../img/success.svg">
      </div>
      <div class="explain">
        <div class="message-success">恭喜，支付成功</div>
        <table>
          <tr>
            <td>设备号:</td>
            <td><span class="span">{{machNo}}</span></td>
          </tr>
          <tr>
            <td>时长:</td>
            <td><span class="span">{{costTime/60}}小时</span></td>
          </tr>
          <tr>
            <td>支付金额:</td>
            <td><span class="span">{{realPrice}}元</span></td>
          </tr>
          <!--<tr>
            <td>优惠卷:</td>
            <td><span class="span">10元</span></td>
          </tr>-->
        </table>
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
  .message-success{
    text-align:center;
    width: 100%;
    height: 25%;
    color: #7A7A7C;
  }
  .explain table{
    margin: auto;
  }
  .explain table tr td{
    padding-top: 10px;
  }
  .explain table tr td:nth-child(1){
    text-align: right;
  }
  .explain table tr td:nth-child(2){
    text-align: left;
  }
  .explain table tr td span{
    margin-left: 10px;
  }
</style>
