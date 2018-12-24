<!-- center Page Template -->
<template id="page-center">
	<f7-page >
		<f7-navbar title="个人中心" style="background:#e94e24;"></f7-navbar>
		<f7-list media-list class="no-margin-v" style="margin-top:1px">
			<ul class="no-border-v">
				<li>
					<a href="/personal-information/" class="item-link">
						<div class="item-content" style="background-color:#E94E24;">
							<div class="item-media">
								<img src='http://img.mp.itc.cn/upload/20170727/50ff47cacfb148fb95939512df6cb5d4_th.jpg' style="max-width:80px;max-height:800px;border-radius:50%">
								<i class="icon fa fa-opencart bg-red color-white align-center" style="font-size: 36px;width: 60px;height: 60px;line-height: 60px;border-radius: 50%;"></i>
							</div>
							<div class="item-inner" style="margin-top: -10px">
								<div class="item-title">&nbsp;</div>
								<div class="item-title-row">
									<div class="item-subtitle item-title" style="margin-left:-55px;color:white">&nbsp;{{name}}</div>
								</div>
								<div class="item-subtitle item-title" style="margin-left:-55px;color:white">￥{{amount}}</div>
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
					<a style="color: #000" href="/inbound/">
						<div class="center-item-image "><img src="../img/zb.png" style="max-height: 32px;max-width: 32px"></div>
						<div class="center-item-title">收入记录</div>
					</a>
				</div>
				<div class="center-item">
					<a style="color: #000" href="/outbound/">
						<div class="center-item-image"><img src="../img/txjl.png" style="max-height: 32px;max-width: 32px"></div>
						<div class="center-item-title">提现记录</div>
					</a>
				</div>
				<div class="center-item-last">
					<a style="color: #000" href="/cash/">
						<div class="center-item-image"><img src="../img/sqtx.png" style="max-height: 32px;max-width: 32px"></div>
						<div class="center-item-title">申请提现</div>
					</a>
				</div>
			</div>
		</f7-row>
		<f7-list media-list class="no-margin-v" style="margin-top:1px">

			<ul>
				<li class="media-item" icon="home"><a href="/trader-management/" class="item-link" v-if="type==='IR' || type==='CR'">
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title"><img src="../img/traders.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;商家管理</div>
								</div>
							</div>
						</div>
					</a></li>
				<li class="media-item"><a href="/device-management/traderId/unfidend/?foo=center#bar" class="item-link">
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title"><img src="../img/device.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;设备管理</div>
								</div>
							</div>
						</div>
					</a></li>
				<li class="media-item"><a href="#" class="item-link">
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title"><img src="../img/saler.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;促销员管理</div>
								</div>
							</div>
						</div>
					</a></li>
				<li class="media-item"><a href="/safety/" class="item-link">
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title"><img src="../img/anquan.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;安全</div>
								</div>
							</div>
						</div>
					</a></li>
				<li class="media-item"><a href="#" class="item-link">
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title"><img src="../img/message.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;信息</div>
									<div class="item-after"><span class="badge color-red">5</span></div>
								</div>
							</div>
						</div>
					</a></li>
			</ul>
		</f7-list>
		<!--<f7-button class="button button-round" big fill raised  color="red">退出</f7-button>-->
	</f7-page>
</template>
<script>
	export default {
    data(){
			return{
				type:'',
				name:'圈兔网络',
				amount:8888,//可用余额
			}
		},
		created() {
			self = this
			self.init()
		},
		methods:{
			init(){
				self = this;
				let USER_INFO = JSON.parse(localStorage.getItem('USER_INFO')) || {}
				if (USER_INFO) {
					self.name = USER_INFO.name || USER_INFO.nickName
					self.type = USER_INFO.userType
				}
			}
		}
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
