<!-- center Page Template -->
<template id="page-msg">

  <f7-page class="no-navbar">
    <div class="center">提示</div>
    <!--支付成功-->
    <div class="cancel" v-if="this.wxMsgType == 'success'">
      <div class="img-1">
        <img src="../img/success.svg">
      </div>
      <div class="explain">
        <div class="message-success">恭喜，支付成功</div>
        <table>
          <tr>
            <td>设备序列号:</td>
            <td><span class="span">{{deviceSequence}}</span></td>
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
      <p class="button button-fill close-popup" style="margin-top: 50px; margin-left: 5%; width:90%;background:#e94e24;">关闭</p>
    </div>
    <!--支付失败-->
    <div class="other" v-else>
      <div class="img-1">
        <img src="../img/fail.svg">
      </div>
      <div class="explain"  v-if="this.wxMsgType == 'fail'">
        <div class="message-success">对不起，支付失败</div>
        <table>
          <tr>
            <td style="text-align: center">请检查您的余额是否充足,或者网络是否已连接</td>
          </tr>
          <tr>
            <td style="text-align: center">如需再次使用,请重新发起支付</td>
          </tr>
        </table>
      </div>
      <p class="button button-fill close-popup" style="margin-top: 50px; margin-left: 5%; width:90%;background:#e94e24;">关闭</p>
      <!--取消支付-->
      <div class="explain"  v-if="this.wxMsgType == 'cancel'">
        <div class="message-success">取消支付成功</div>
        <table>
          <tr>
            <td style="text-align: center">如需再次使用,请重新发起支付</td>
          </tr>
        </table>
      </div>
      <p class="button button-fill close-popup" style="margin-top: 50px; margin-left: 5%; width:90%;background:#e94e24;">关闭</p>
      <!--支付异常-->
      <div class="explain"  v-if="this.wxMsgType == 'other'">
        <div class="message-success">支付异常</div>
        <table>
          <tr>
            <td style="text-align: center">请继续支付</td>
          </tr>
        </table>
      </div>
      <p class="button button-fill close-popup" style="margin-top: 50px; margin-left: 5%; width:90%;background:#e94e24;">关闭</p>
    </div>
    
  </f7-page>
</template>
<script>
  import config from '@/util/config'
  import api from '../network'
  export default {
    data(){
      return {
        transactionId: '-',
        body: '',
        bankType: '',
        totalFee:0,
        billingNumber: this.$f7route.params.billingNumber,
        type: this.$f7route.params.type,
        wxMsgType:'other',
      }
    },
    methods:{
      queryMsg() {
        api.queryWxMsg('?billingNumber='+this.billingNumber +'&type' + this.type).then(res=>{
          let data = res.data.data;
          if (res.data.status == '200' && data) {
            this.wxMsgType = data.wxMsgType
            if ('success' == this.wxMsgType) {
              if (data.err_code == undefined) {
                this.transactionId = data.transaction_id
                this.body = data.body
                this.bankType = data.backType
                this.totalFee = parseInt(data.total_fee)/100
              } else {
                this.body=data.err_code_des
              }
            }
          }
        }).catch(err => {
          this.alertMsg("获取支付信息结果失败")
        })
      },
      alertMsg(msg){
        let toastTop = this.$f7.toast.create({
          text: msg,
          position: 'top',
          closeTimeout: 1000,
        })
        toastTop.open();
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
