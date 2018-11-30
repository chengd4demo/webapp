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
            <f7-list-item link="/order/" title="地址管理"></f7-list-item>
        </f7-list>
        <com-toolbar :active="active"></com-toolbar>
    </f7-page>
</template>
<script>

</script>
<style type="text/css">
.box {
	height: 50px;
	width: 50px;
	overflow: hidden;
	background-repeat: no-repeat;
	background-position: center center;
	float: left;
  border-radius:100%;
  position:relative;
  left:4%;
  top:17%;
}
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
</style>
