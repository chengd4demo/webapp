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
								<img src='http://img2.imgtn.bdimg.com/it/u=1932439000,2358402856&fm=26&gp=0.jpg' style="max-width:80px;max-height:800px;border-radius:50%;">
								<i class="icon fa fa-opencart bg-red color-white align-center" style="font-size: 36px;width: 60px;height: 60px;line-height: 60px;border-radius: 50%;"></i>
							</div>
							<div class="item-inner">
								<div class="item-title">&nbsp;</div>
								<div class="item-title-row">
									<div class="item-subtitle item-title" style="margin-left:-55px;color:white">{{nickName}}</div>
								</div>
								<!--<div class="item-text" style="margin-left:-55px;color:	white">￥ 1000</div>-->
							</div>
						</div>
					</a>
				</li>
			</ul>

		</f7-list>
    <f7-row>
      <div class="center-1">
        <div class="center-item">
            <div class="center-item-image "><img src="../../img/msg.png" style="max-height: 32px;max-width: 32px"></div>
            <div class="center-item-title">消息</div>
        </div>
        <div class="center-item">
          <a style="color: #000" href="/equipment-list/">
            <div class="center-item-image"><img src="../../img/shebei.png" style="max-height: 32px;max-width: 32px"></div>
            <div class="center-item-title">设备监控</div>
          </a>
        </div>
        <div class="center-item-last">
          <a style="color: #000" href="/record/">
            <div class="center-item-image"><img src="../../img/zb.png" style="max-height: 32px;max-width: 32px"></div>
            <div class="center-item-title">使用记录</div>
          </a>
        </div>
      </div>
    </f7-row>
    <f7-list media-list class="no-margin-v" style="margin-top:1px">

      <ul>
        <li class="media-item"><a href="#" class="item-link">
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title"><img src="../../img/youhuijuan.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;优惠</div>
              </div>
            </div>
          </div>
        </a></li>
        <li class="media-item"><a href="#" class="item-link">
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title"><img src="../../img/kehu.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;在线客服</div>
              </div>
            </div>
          </div>
        </a></li>
        <li class="media-item"><a href="#" class="item-link">
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title"><img src="../../img/map.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;地图</div>
              </div>
            </div>
          </div>
        </a></li>
        <li class="media-item"><a href="#" class="item-link">
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title"><img src="../../img/dizhi.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;地址管理</div>
              </div>
            </div>
          </div>
        </a></li>
        <li class="media-item"><a href="#" class="item-link">
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title"><img src="../../img/jiangping.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;我的奖品</div>
              </div>
            </div>
          </div>
        </a></li>
      </ul>
    </f7-list>
	</f7-page>
</template>
<script>
export default {
	data(){
		return {
			headUrl:'',
			nickName:'冬天的萝卜'
		}
	},
	mounted() {
		self = this;
		let USER_INFO = JSON.parse(localStorage.getItem('USER_INFO')) || {}
		if (USER_INFO){
		 self.nickName = USER_INFO.name
		}

	},
}
</script>
<style type="text/css">
  img {
    width: 50px;
    height: 50px;
  }

  .ios .media-list .item-title,
  .ios li.media-item .item-title {
    font-weight: normal;
    font-size: 14px;
    color: #111;
  }
  .ios .icon-back,
  .ios .icon-prev {
    width: 12px;
    height: 20px;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D'12'%20height%3D'20'%20viewBox%3D'0%200%2012%2020'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20d%3D'M.18261596%209.4221638c.0352203-.05148305.07573462-.10050698.1215468-.14631917L9.1425872.4374202c.5830904-.58309038%201.52656832-.5849888%202.11643872.00488163.5857864.58578644.591222%201.53009836.0048816%202.11643873L3.82594417%209.9967039l7.43188553%207.4318855c.5830904.5830904.5849888%201.5265683-.0048817%202.1164387-.5857864.5857865-1.5300983.591222-2.11643868.0048816L.2980849%2010.7114853c-.3526746-.3526746-.3939974-.89699-.11546894-1.2893215z'%20fill%3D'%23ffffff'%20fill-rule%3D'evenodd'%2F%3E%3C%2Fsvg%3E");
  }
  .ios .navbar {
    height: 44px;
    font-size: 17px;
    background: #E94E24;
    color: white;
  }
  .center {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: white;
    font-family: 微软雅黑;
    background: #E94E24;
    text-align: center;
  }

  .center-1 {
    width: 100%;
    height: 80px;
    margin-top: -28px;
    display: flex;
    background: gray;
  }

  .center-item {
    width: 34%;
    height: 80px;
    text-align: center;
    background: white;
    border-right: 1px solid #CDCDCD;
  }

  .center-item-last {
    width: 34%;
    height: 80px;
    text-align: center;
    background: white;
    border: none
  }

  .center-item-image {
    width: 40px;
    height: 40px;
    margin: 5px auto;

  }

  .center-item-title {
    width: 100%;
  }
</style>
