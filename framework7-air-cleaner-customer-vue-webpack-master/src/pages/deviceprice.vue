<!-- center Page Template -->
<template id="page-center">
   
    <f7-page class="no-navbar">
      <!--头部logo-->
         <div class="header">
            <img class="header-img-1" src="../img/logo1.png">
           <p>享.新.鲜</p>
         </div>
      <!--空气指数-->
        <div class="mt">
          <img id="mt-1" src="../img/pm2.5.png"/>
          <i class="mt-2">150</i>
        </div>
      <!--消费时间 价格-->
      <div class="prices">
      <div v-for="(item, index) in priceList" :key="index" @click="onSelectPrice(index)">
        <a href="/confirm-payment/">
          <div class="price-item1" >
            <div class="price-time">{{item.costTime/60}}小时</div>
            <div class="price-value">
              <div class="price"><em>¥</em>{{item.realPrice}}</div>
              <div class="del-price"><em>¥</em>{{item.unitPrice}}</div>
            </div>
          </div>
        </a>
      </div>
        <!--<a href="/confirm-payment/"><div class="price-item1" >
          <div class="price-time">2小时</div>
          <div class="price-value">
            <div class="price"><em>¥</em>6</div>
            <div class="del-price"><em>¥</em>8</div>
          </div>
        </div></a>
          <a href="/confirm-payment/"><div class="price-item1" >
          <div class="price-time">4小时</div>
          <div class="price-value">
            <div class="price"><em>¥</em>10</div>
            <div class="del-price"><em>¥</em>12</div>
          </div>
        </div></a>
            <a href="/confirm-payment/"><div class="price-item1" >
          <div class="price-time">12小时</div>
          <div class="price-value">
            <div class="price"><em>¥</em>20</div>
            <div class="del-price"><em>¥</em>24</div>
          </div>
        </div></a>-->
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
        priceList:[],
        priceObj:{}
      }
    },
    created() {
      const self = this;
      self.queryPriceList(self.machNo);
    },
    methods:{
      queryPriceList(params){
        const self = this;
        api.queryDeviceStatus(params).then(function(res){
          let data = res.data.data.price;
          self.priceObj = res.data.data;
          data.forEach(function(value, index, array){
            self.priceList.push(value);
          });
        }).catch(function(err){
          console.log(err+'sss')
        })
      },
      onSelectPrice(index){
         if(this.priceList.length!=0) {
             config.confirmPayment.realPrice = this.priceList[index].realPrice;
             config.confirmPayment.costTime = this.priceList[index].costTime;
             config.confirmPayment.machNo = this.machNo;
             config.confirmPayment.available = this.priceObj.available;
             config.confirmPayment.onLine = this.priceObj.onLine;
             config.confirmPayment.pm25 = this.priceObj.pm25;
         }
      }
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
.mt{
  margin-top: -80px;
  text-align: center;
  margin-left: -20px;
  position:relative;
}
#mt-1{
  width: 120px;
  height: 120px;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 100px;

}
  .mt-2{
    width: 50px;
    height: 50px;
    color: #ffe7ce;
    margin-left: -86px;
    margin-top: 105px;
    position: absolute;
  }
.price-item1{
  display: flex;
  margin-top: 20px;
}
.prices{
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
</style>
