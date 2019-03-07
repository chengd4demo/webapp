<!-- center Page Template -->
<template id="page-center">

  <f7-page class="no-navbar">
    <!--头部logo-->
    <div class="header">
      <img class="header-img-1" src="../img/logo1.png">
      <p>享.新.鲜</p>
    </div>
    <!--空气指数-->
    <div class="particulate">
      <div class="spinner-box">
        <div class="circle-border">
          <div class="circle-core"></div>
        </div>
      </div>
      <div class="particulate-matter">
        <h>PM 2.5</h>
        <h3>{{pm25}}</h3>
      </div>
    </div>
    <!--消费时间 价格-->
    <div class="prices">
      <div v-for="(item, index) in priceList" :key="index" @click="onSelectPrice(index)">
        <a href="/confirm-payment/">
          <div class="price-item1" >
            <div class="price-time">{{item.costTime/60}}小时</div>
            <div class="price-value" v-if="item.discount <100 && item.realPrice != item.unitPrice">
              <div class="price"><em>¥</em>{{item.realPrice}}</div>
              <div class="del-price"><em>¥</em>{{item.unitPrice}}</div>
            </div>
            <div class="price-value" v-else>
              <div class="price" style="border-right: none"><em>¥</em>{{item.realPrice}}</div>
            </div>
          </div>
        </a>
      </div>
    </div>
    <!--异常显示-->
    <div class="device-state" id="noOnlineId" style="display: none;margin-top: 0px">
      <table>
        <tr>
          <td>设备序列号:</td>
          <td><span class="span-1">{{deviceSequence}}</span></td>
        </tr>
        <tr>
        <td>是否在线:</td>
        <td><span class="device-span" style="background: #D0D0D0;width: 30px;height: 10px;margin-left: 10px;padding: 2px 5px;color: ">{{onLine ? '在线':'不在线'}}</span></td>
      </tr>
        <tr>
          <td>是否可用:</td>
          <td><span class="device-span" style="background: #D0D0D0;width: 30px;height: 10px;margin-left: 10px;padding: 2px 5px;">{{onLine ? '可用':'不可用'}}</span></td>
        </tr>
      </table>
    </div>
      <div class="device-Msg" id="noDeviceId" style="display: none;text-align: right;margin-left: 20%;margin-right: 20%;">
      <table>
        <tr>
          <td>设备序列号:</td>
          <td><span class="span-3">{{deviceSequence}}</span></td>
        </tr>
        <tr>
          <td>提示:</td>
          <td style="text-align: left;"><span class="span-4">{{msg}}</span></td>
        </tr>
      </table>
    </div>
  </f7-page>
</template>
<script>
  import api from '../network'
  import config from '@/util/config'
  export default {
    data(){
      return {
        machNo: this.$f7route.params.machno,
        msg:'',
        onLine:0,
        deviceSequence:this.$f7route.params.devicesequence,
        priceList:[],
        pm25:300,
        priceObj:{}
      }
    },
    created() {
      const self = this;
      self.queryPriceList(self.deviceSequence);
    },
    methods:{
      queryPriceList(params){
        const self = this;
        api.queryDeviceStatus(params).then(function(res){
          if(res.data.status == '200') {
            let data = res.data.data.price;
            self.priceObj = res.data.data;
            self.pm25 = self.priceObj.pm25;
            data.forEach(function(value, index, array){
              self.priceList.push(value);
            });
          } else {
            if(res.data.status == '1013')  {
               console.log(1013)
              self.msg = res.data.description
              self.$$('#noDeviceId').css({
                'display': 'block',
              })

            } else if(res.data.status == '1012'){
             let onLine = res.data.data.onLine;
             if(onLine == 0) {
               console.log('onLine:' + onLine)
               self.$$('#noOnlineId').css({
                 'display': 'block',
               })
               self.onLine = onLine;
             }
            }
          }
        }).catch(function(err){
          self.alertMsg('服务繁忙')
        })
      },
      onSelectPrice(index){
        if(this.priceList.length!=0) {
          config.confirmPayment.realPrice = this.priceList[index].realPrice;
          config.confirmPayment.costTime = this.priceList[index].costTime;
          config.confirmPayment.priceId = this.priceList[index].priceId;
          config.confirmPayment.deviceSequence = this.deviceSequence;
          config.confirmPayment.available = this.priceObj.available;
          config.confirmPayment.onLine = this.priceObj.onLine;
          config.confirmPayment.pm25 = this.priceObj.pm25;
        }
      },
      alertMsg(msg){
        let toastTop = this.$f7.toast.create({
          text: msg,
          position: 'top',
          closeTimeout: 1000,
        })
        toastTop.open();
      },
    }
  }
</script>
<style type="text/css">
  .header{
    width: 100%;
    height: 200px;
    text-align: center;
    background: url("../img/bg-1.png");
  }
  .header-img-1{
    width: 160px;
    height: 70px;
    margin-top: 25px;
  }
  .header p{
    color: white;
    margin-top: 8px;
    font-size: 16px;
    margin-left: 32px;
    letter-spacing:30px;
  }
  .particulate{
    margin-top: -60px;
    text-align: center;
    position:relative;
  }
  .particulate-matter{
    width: 100px;
    height: 30px;
    margin: -90px auto;
    position: relative;
    color: white;
  }
  .particulate-matter h{
    font-size: 30px;
    font-family: initial;
    font-weight: 100;
  }
  .particulate-matter h3{
    font-size: 18px;
    margin: auto;
    font-family: initial;
    font-weight: 100;
  }
  .price-item1{
    display: flex;
    margin-top: 20px;
  }
  .prices{
    margin-top: 150px;
    background: transparent;
    padding: 15px;
  }
  .price-time{
    background: #f55f51;
    padding: 10px;
    color: #fff;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    width: 120px;
    text-align: center;
    font-size: 1.4em;
    font-weight: bold;
    box-shadow: 0 2px 0 #c93e34;
  }
  .price-value{
    flex: 1;
    background: #fff;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 0 #a9afab;
  }
  .price,.del-price{
    flex:1;
    text-align: center;
    font-size: 1.4em;
    font-weight: bold;
  }
  .price em,.del-price em{
    font-size: .8em;
  }
  .price{
    border-right: 2px solid #ddd;
    color: #ed4634;
  }
  .del-price{
    color: #8c8c8c;
    position: relative;
  }
  .del-price:after{
    content: '';
    position: absolute;
    border-top: 4px solid #8C8C8C;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    top: auto;
    bottom: calc(50% - 2px);
    width: 30px;
    left: calc(50% - 15px);
  }
  /*旋转*/
  /* KEYFRAMES */

  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to{
      transform: rotate(359deg);
    }
  }

  @keyframes configure-clockwise {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes configure-xclockwise {
    0% {
      transform: rotate(45deg);
    }
    25% {
      transform: rotate(-45deg);
    }
    50% {
      transform: rotate(-135deg);
    }
    75% {
      transform: rotate(-225deg);
    }
    100% {
      transform: rotate(-315deg);
    }
  }
  @keyframes pulse {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: .25;
      transform: scale(.75);
    }
  }
  /* GRID STYLING */
  * {
    box-sizing: border-box;
  }
  .spinner-box {
    width: 120px;
    height: 120px;
    /*display: flex;*/
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin: auto;
  }
  /* SPINNING CIRCLE */
  .circle-border {
    width: 120px;
    height: 120px;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: rgb(63,249,220);
    background: linear-gradient(0deg, #8BC34A 33%, rgb(123, 199, 233) 100%);
    animation: spin .8s linear 0s infinite;
  }
  .circle-core {
    width: 100%;
    height: 100%;
    background-color: rgba(121, 85, 72, 0.17);
    border-radius: 50%;
  }
  .device-state{
    position: relative;
  }
  .device-state table{
    margin: auto;
  }
  .device-state table tr td{
    padding-top: 10px;
  }
  .device-state table tr td:nth-child(1){
    text-align: right;
  }
  .device-state table tr td:nth-child(2){
    text-align: left;
  }
  .span-1{
    margin-left: 10px;
  }
  .device-Msg{
    position: relative;
  }
  .device-Msg table{
    margin: auto;
  }
  .device-Msg table tr td{
    padding-top: 10px;
  }
  .device-Msg table tr td:nth-child(1){
    text-align: right;
  }
  .device-Msg table tr td:nth-child(2){
    text-align: left;
  }
  .span-4{
    width: 30px;
    height: 10px;
    color: black;
    background: #D0D0D0;
  }

</style>
