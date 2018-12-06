<!-- center Page Template -->
<template id="page-center">
   
    <f7-page no-navbar>
          <div class="center">个人中心</div>
        <f7-list media-list class="no-margin-v" style="margin-top:1px">  
            <ul class="no-border-v">            
                <li>
                    <a href="/personal-information/" class="item-link">
                        <div class="item-content" style="background-color:#E94E24;">
                            <div class="item-media">
                                <img src='http://img2.imgtn.bdimg.com/it/u=1932439000,2358402856&fm=26&gp=0.jpg' style="max-width:80px;max-height:800px;border-radius:50%">
                                <i class="icon fa fa-opencart bg-red color-white align-center" style="font-size: 36px;width: 60px;height: 60px;line-height: 60px;border-radius: 50%;"></i>
                            </div>
                           <div class="item-inner">
                                <div class="item-title">&nbsp;</div>
                                <div class="item-title-row">
                                    <div class="item-subtitle item-title" style="margin-left:-55px;color:white">冬天的萝卜</div>
                                </div>
                                <!--<div class="item-text" style="margin-left:-55px;color:	white">￥ 1000</div>-->
                            </div>
                        </div>
                    </a>
                </li>
            </ul>

        </f7-list >
        <f7-row>
          <div class="center-1">
              <div class="center-item">
                <div class="center-item-image" >
                  <img src="../../img/msg.png">
                </div>
               <div class="center-item-title">消息</div>
              </div>
              <div class="center-item">
                <a href="/equipment-list/"><div class="center-item-image">
                  <img src="../../img/shebei.png">
                </div>
                <div class="center-item-title">设备监控</div></a>
              </div>
              <div class="center-item-1">
                <a href="/record/"><div class="center-item-image">
                  <img src="../../img/zb.png">
                </div>
                  <div class="center-item-title">使用记录</div></a>
              </div>
          </div>
        </f7-row>
        <f7-list media-list class="no-margin-v" style="margin-top:1px ;;">

          <div class="jump-list"><img src="../../img/youhuijuan.png"><f7-list-item class="jump-list-title" link="/center/" title="优惠"></f7-list-item></div>
          <div class="jump-list"><img src="../../img/kehu.png"><f7-list-item class="jump-list-title" link="/center/" title="在线客服"></f7-list-item></div>
          <div class="jump-list"><img src="../../img/map.png"><f7-list-item class="jump-list-title" link="/center/" title="地图"></f7-list-item></div>
          <div class="jump-list"><img src="../../img/dizhi.png"> <f7-list-item class="jump-list-title" link="/address/" title="地址管理"></f7-list-item></div>
          <div class="jump-list"><img src="../../img/jiangping.png"><f7-list-item class="jump-list-title" link="/center/" title="我的奖品"></f7-list-item></div>
        </f7-list>
    </f7-page>
</template>
<script>

</script>
<style type="text/css">
img {
  width:50px;
  height:50px;
}
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
.center-1{
  width: 100%;
  height: 80px;
  margin-top: -32px;
  display: flex;
  margin-bottom: -1px;
}
.center-item{
  width: 34%;
  height: 80px;
  border-right: 1px solid #CDCDCD;
  text-align: center;

}
.center-item-1{
  width: 34%;
  height: 80px;
  text-align: center;

}
.center-item-image{
  width: 40px;
  height: 40px;
  margin: 5px auto;
}
.center-item-image img{
  width: 32px;
  height: 32px;
}
.center-item-title{
  width: 100%;
  color: black;
  margin-top: 5px;
}
.jump-list{
  list-style: none;
  border: 1px solid #E9E9E9;
}
.jump-list-title{
  margin-left: 30px;
}
.jump-list img {
  width: 15px;
  height: 15px;
  position: fixed;
  margin-top: 18px;
  margin-left: 15px;
}
</style>
