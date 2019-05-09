<template>
	<f7-page>
		<f7-navbar title="提现申请" back-link="" style="background:#e94e24;"></f7-navbar>
		<div style="min-height:15%; margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;border-bottom:1px solid #e0e0e0">
			<div class="row" style="margin-left:50px">
				<div class="col-auto" style="text-indent: 15px;">当前账户余额：¥{{totalAcmount}}</div>
				<div class="col-auto"></div>
			</div>
			<div class="row" style="margin-left:50px;margin-top:15px">
				<div class="col-auto" style="text-indent: 29px;">可提现余额：¥{{availableAmount}}</div>
				<div class="col-auto"></div>
			</div>
		</div>

		<div class="demok3_lable" style="text-indent: 10px;max-height:25px;font-size: 17px;">提现金额:</div>
		<div class="demok3_input"><input type="number" v-model="amount" name="amount" @keyup="keyDown()" onkeyup="if(! /^\d+(\.\d{0,2})?$/.test(this.value)||this.value>200||this.value==0){this.value='';}"
			 style="border:1px solid #e0e0e0; height:25px; margin-left:10px;" placeholder="请输入提现金额,最大200元" /></div>
		<div style="width:100%;margin:10px auto;float:left;">
			<div style="width:95%;background: #EEEDED;margin: 0px auto;text-indent: 5px;">
				<p>注:</p>
				<p>1.提现申请提交后，当前余额账户将被冻结，暂无法做别的操作!</p>
				<p>2.单次提现金额最小2元，最大200元。提现成功后，将由微信红包方式发送到您的微信号上，请注意查收!</p>
				<p>3.红包发送24小时内务必领取，超过24小时后，红包会自动返回到当前帐户，用户需要再次提交申请!</p>
				<p>4.提现将按照国家规定产生代扣税金!</p>
			</div>
		</div>
		<p><a href="#" @click="openPassword()" class="button button-fill" :class="{disabled: this.canInput}" style="width:90%;margin:0 auto;background:#e94e24;height: 40px;line-height: 40px;">提&nbsp;交</a></p>
	</f7-page>
</template>
<script>
	import api from '../network'
	import CommonUtils from '@/util/common'
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				availableAmount: 0,
				totalAcmount: 0,
				canInput: true,
				amount: ''
			}
		},
		created() {
			const self = this;
			self.init();
		},
		methods: {
			init() {
				const self = this
				let weixin = localStorage.getItem('weixin') || config.wxUserInfo.openid
				if (weixin) {
					self.weixin = weixin
					api.queryAccount(weixin).then(res => {
						if (res.data.description === 'success') {
							let data = res.data.data;
							self.totalAcmount = Number(data.totalAcmount.toString().match(/^\d+(?:\.\d{0,2})?/))
							self.availableAmount = Number(data.availableAmount.toString().match(/^\d+(?:\.\d{0,2})?/))
						}
					}).catch(err => {})
				} else {
					alertMsg('网络连接超时')
					return
				}
			},
			openPassword() {
				let self = this;
				let app = self.$f7;
				let router = self.$f7router;
				console.log('cash');
				app.params.dialog.PreloaderTitle = '加载中...'
				app.params.dialog.buttonCancel = '<span style="color:black">取消</span>'
				app.params.dialog.buttonOk = '<span style="color:black">确定</span>'
				let M_USER_INFO = JSON.parse(localStorage.getItem('M_USER_INFO'))
				if (M_USER_INFO.alipay == false) {
					window.scrollTo(0, 0);
					self.$f7router.navigate('/set-password/')
					return
				}
				app.dialog.password('', '请输入提现密码', (password) => {
					let weixin = M_USER_INFO.weixin
					let identificationNumber = M_USER_INFO.identificationNumber
					if (weixin == null) {
						self.alertMsg("登录失效，请重新验证！")
						setTimeout(function() {
							window.scrollTo(0, 0);
							self.$f7router.navigate('/sign/')
						}, 2000)
					}
					if (password !== '' && password.length !== 0) {
						password = md5(password)
						api.applyForAccountOutbound({
							"password": password,
							"amount": this.amount,
							"weixin": weixin,
							"name": M_USER_INFO.nickName,
							"userType": M_USER_INFO.userType,
							"identificationNumber": identificationNumber
						}).then(res => {
							window.scrollTo(0, 0);
							let data = res.data.data;
							if (res.data.status === '200') {
								self.alertMsg('提现申请已提交!')
								window.setTimeout(() => {
									this.$f7router.navigate('/outbound/')
								}, 2000)
							} else {
								if (res.data.status === 'EP500') {
									self.alertMsg('提现申请失败,请重新提交！')
								} else {
									self.alertMsg(res.data.description)
								}

							}
						})
					} else {
							})
					},
			keyDown(){
					if (this.amount!==""&&this.amount!=="0" && this.amount <= "200") {
						this.canInput = false
						window.scrollTo(0, 0);
						self.alertMsg('请输入提现密码!')
					}
				})
			},
			keyDown() {
				if (this.amount !== "" && this.amount !== "0" && this.amount <= 200) {
					this.canInput = false
					window.scrollTo(0, 0);
				} else {
					this.canInput = true;
				}
			},
			alertMsg(msg) {
				let toastTop = this.$f7.toast.create({
					text: msg,
					position: 'center',
					closeTimeout: 1000,
				})
				toastTop.open();
			}
		}
	}
</script>
<style>
	.demok3_lable {
		width: 100px;
		float: left;
	}

	.demok3_input {
		width: 200px;
		height: 20px;
		float: left;
		margin-left: -25px;
	}
</style>
