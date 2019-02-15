<!-- center Page Template -->
<template id="page-center">
	<f7-page>
		<f7-navbar title="个人中心" style="background:#e94e24;"></f7-navbar>
		<f7-list media-list class="no-margin-v" style="margin-top:1px">
			<ul class="no-border-v">
				<li>
					<a href="/personal-information/" class="item-link">
						<div class="item-content" style="background-color:#E94E24;">
							<div class="item-media">
								<img :src='headUrl' style="max-width:80px;max-height:800px;border-radius:50%">
								<i class="icon fa fa-opencart bg-red color-white align-center" style="font-size: 36px;width: 60px;height: 60px;line-height: 60px;border-radius: 50%;"></i>
							</div>
							<div class="item-inner" style="margin-top: -10px">
								<div class="item-title">&nbsp;</div>
								<div class="item-title-row">
									<div class="item-subtitle item-title" style="margin-left:-55px;color:white">&nbsp;{{nickName}}</div>
								</div>
								<div id = 'amountId' class="item-subtitle item-title" style="margin-left:-55px;color:white">¥{{amount}}</div>
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
					<a style="color: #000" :href='getHref(amount,availableAmount)'>
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
	import api from "../network";
	import config from '@/util/config'
	export default {
    data(){
			return{
				type:'',
				nickName:'',
				headUrl:'',
				amount:0,//可用余额
				availableAmount:0
			}
		},
		mounted() {
			const self = this
			let weixin = localStorage.getItem('weixin') || config.wxUserInfo.openid
			if (weixin) {
				self.weixin = weixin
				self.init()
			} else{
				alert('网络连接超时')
				return
			}
		},
		methods:{
			init(){
				const self = this;
				self.resarchUserInfo(self.weixin)
			},
			queryAccount(weixin){
				const self = this;
				if(weixin)
				api.queryAccount(weixin).then(res =>{
					if(res.data.description === 'success') {
						let data = res.data.data;
						self.amount = data.totalAcmount
						self.availableAmount = data.availableAmount
						let num = 0;
						var t = setInterval(function(){
						   num++;
							self.amount = num
						   if(self.amount>=self.availableAmount){
								clearInterval(t);
						   }else{
							   self.amount = num 
						   }       
						},1);
					}
				}).catch(err => {
					
				})				
			},
			resarchUserInfo(weixin) {
				const self = this;
					api.queryUserInfo(weixin).then(res=>{
						let data = res.data.data;
						if(res.data.status == '200' && data){
							let M_USER_INFO = JSON.parse(localStorage.getItem('M_USER_INFO')) || {}
							data.weixin = self.weixin
							data.name = config.wxUserInfo.nickname
							self.nickName = data.nickName || data.name
							self.type = data.userType
							data.headerUrl = config.wxUserInfo.headimgurl || M_USER_INFO.headerUrl
							self.headUrl = config.wxUserInfo.headimgurl || M_USER_INFO.headerUrl
							localStorage.setItem('M_USER_INFO',JSON.stringify(data))
							self.queryAccount(self.weixin)
						}else{
							localStorage.removeItem('weixin')
							localStorage.removeItem('M_USER_INFO')
							location.reload()
						}
					}).catch(err => {
						alert('系统繁忙')
					})
			},
			alertMsg(msg){
				let toastTop = this.$f7.toast.create({
				  text: msg,
				  position: 'top',
				  closeTimeout: 1000,
				})
				toastTop.open();
			},
			getHref(amount,availableAmount) {
				return '/cash/availableAmount/' + availableAmount + '/totalAcmount/' + amount+'/';
			},
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
	
	.ios .icon-back,
  .ios .icon-prev {
    width: 12px;
    height: 20px;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D'12'%20height%3D'20'%20viewBox%3D'0%200%2012%2020'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20d%3D'M.18261596%209.4221638c.0352203-.05148305.07573462-.10050698.1215468-.14631917L9.1425872.4374202c.5830904-.58309038%201.52656832-.5849888%202.11643872.00488163.5857864.58578644.591222%201.53009836.0048816%202.11643873L3.82594417%209.9967039l7.43188553%207.4318855c.5830904.5830904.5849888%201.5265683-.0048817%202.1164387-.5857864.5857865-1.5300983.591222-2.11643868.0048816L.2980849%2010.7114853c-.3526746-.3526746-.3939974-.89699-.11546894-1.2893215z'%20fill%3D'%23ffffff'%20fill-rule%3D'evenodd'%2F%3E%3C%2Fsvg%3E");
  }
</style>
