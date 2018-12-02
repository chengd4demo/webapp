<!-- center Page Template -->
<template id="page-center">
   
    <f7-page>
          <div class="center">个人中心</div>
        <f7-list media-list class="no-margin-v" style="margin-top:1px">  
            <ul class="no-border-v">            
                <li>
                    <a href="/info/" class="item-link">
                        <div class="item-content" style="background-color:#4cd964;">
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
        <div class="row no-gutter">
              <div class="center-item col-33">
                <div class="center-item-image"></div>
                <div class="center-item-title">消息</div>
              </div>
              <div class="center-item col-33">
                <div class="center-item-image"></div>
                <div class="center-item-title">设备监控</div>
              </div>
              <div class="center-item col-33">
                <div class="center-item-image"></div>
                <div class="center-item-title">使用记录</div>
              </div>

        </div>
        <f7-list media-list class="no-margin-v" style="margin-top:1px">

          <f7-list-item link="/address/" title="地址管理"></f7-list-item>
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
  background: #49D160;
  text-align: center;
}
.center-item{
  height: 58px;
  width:10%;
  margin:0 2px;
  border: 1px solid rebeccapurple;
}
.center-item-image{
  height: 35px;
  background: whitesmoke;
}
.center-item-title{
  text-align: center;
  font-size: 1.0em;
}
</style>
