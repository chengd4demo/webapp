<template>
  <f7-page>
        <f7-list media-list>
          <div style="background-color: red;margin-top: -35px;text-align: center;font-size:24px;color: aliceblue">个人中心</div>
            <ul class="no-border-v" >
                <li>
                    <a href="/form/" class="item-link">
                        <div class="item-content" style="background-color: red;margin-top: 1px" >
                            <div class="item-media">
                                <img src='http://img.mp.itc.cn/upload/20170727/50ff47cacfb148fb95939512df6cb5d4_th.jpg' style="min-height:100px;max-width:80px;max-height:800px;border-radius:50%">
                                <i class="icon fa fa-opencart bg-red color-white align-center" style="border-radius: 50%;"></i>
                            </div>
                            <div class="item-inner" style="margin-top: 20px;">
                                <div class="item-title" style="color: aliceblue">苍老师</div>
                                <div class="item-title-row">
                                    <div class="item-subtitle" style="color: aliceblue">￥ 1000</div>
                                </div>
                               
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </f7-list>
    <div class="row no-gutter" style="padding-left:50px;background-color: aliceblue">
      <!-- Each "cell" has col-[widht in percents] class -->
      <div class="col-33" icon="icon">收入记录</div>
      <div class="col-33">提现记录</div>
      <div class="col-33">申请提现</div>
    </div>
        <f7-list>
            <f7-list-item link="/form/" title="商家管理"></f7-list-item>
            <f7-list-item link="/form/" title="设备管理"></f7-list-item>
            <f7-list-item link="/form/" title="促销员管理"></f7-list-item>
            <f7-list-item link="/form/" title="安全"></f7-list-item>
            <f7-list-item link="/form/" title="信息" badge="5" badge-color="red"></f7-list-item>
        </f7-list>
            <f7-button class="button button-round" big fill raised  color="red">退出</f7-button>
        <com-toolbar :active="active"></com-toolbar>
    </f7-page>
</template>

<style>
  .page-content {
    padding-top: 0px !important;
  }
</style>
<script>

export default {}
</script>
