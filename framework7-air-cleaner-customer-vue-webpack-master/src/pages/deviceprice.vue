<!-- center Page Template -->
<template id="page-center">
   
    <f7-page>
      <!--头部logo-->
         <div class="header">
         </div>
      <!--空气指数-->
        <div class="mt">
          <img id="mt-1" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543555548747&di=77f3ccddc74d680acce0f923c9945dc0&imgtype=0&src=http%3A%2F%2Fwww.vdarts.tw%2Fstatic%2Fimage%2Fproduct%2FHat-trick.gif"/>
          <i class="mt-2">PM&nbsp;2.5</i>
        </div>
      <!--消费时间 价格-->
      <div class="prices">
        <div class="price-item1" >
          <div class="price-time">6小时</div>
          <div class="price-value">
            <div class="price"><em>¥</em>6</div>
            <div class="del-price"><em>¥</em>12</div>
          </div>
        </div>
        <div class="price-item1" >
          <div class="price-time">6小时</div>
          <div class="price-value">
            <div class="price"><em>¥</em>6</div>
            <div class="del-price"><em>¥</em>12</div>
          </div>
        </div>
        <div class="price-item1" >
          <div class="price-time">6小时</div>
          <div class="price-value">
            <div class="price"><em>¥</em>6</div>
            <div class="del-price"><em>¥</em>12</div>
          </div>
        </div>
        <div class="price-item1" >
          <div class="price-time">6小时</div>
          <div class="price-value">
            <div class="price"><em>¥</em>6</div>
            <div class="del-price"><em>¥</em>12</div>
          </div>
        </div>
      </div>
    </f7-page>
</template>
<script>

</script>
<style type="text/css">
.header{
  width: 100%;
  height: 200px;
  background: green;
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
    font-size: 30px;
    font-weight: 300;
    color: #ffe7ce;
    margin-left: -110px;
    margin-top: 60px;
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
