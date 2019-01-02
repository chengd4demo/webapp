<template>
	<f7-page>
		<f7-navbar title="修改手机号码" back-link="" style="background:#e94e24;"></f7-navbar>
		<form>
			<input type="hidden" v-model="weixin" name="weixin" />
			<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
				<input type="number" v-model="phoneNumber" placeholder="输入已绑定的手机号码" oninput="if(value.length>11)value=value.slice(0,11)"
				 style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;" />
			</div>
			<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
				<span style="width:70%;float: left;">
					<input type="number" v-model="verificationCode" placeholder="输入验证码" oninput="if(value.length>6)value=value.slice(0,6)"
					 style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;" />
				</span>
				<span style="width: 30%; ">
					<a href="#" id="code" @click="countDown" class="button button-fill" :class="{disabled: !this.canClick}"
					 no-fast-click style="margin:0 auto;background:#e94e24;disable:disable;height: 44px; line-height:44px;">{{content}}</a>
				</span>
			</div>
			<div style="width: 100%; margin-top: 20px;">
				<a class="button button-fill" @click="nextBtn(parames)" style="width:90%;margin:0 auto;background:#e94e24;height: 44px; line-height:44px;">下一步</a>
			</div>
		</form>
	</f7-page>
</template>
<style>
	.disabled {
		background-color: #ddd;
		border-color: #ddd;
		color: #57a3f3;
		cursor: not-allowed;
	}
</style>

<script>
	import api from '../network'
	export default {
		data() {
			return {
				content: '获取验证码',
				totalTime: 60,
				canClick: true,
				verificationCode: '',
				weixin: '',
				phoneNumber: ''
			}
		},
		created() {
			const self = this;
			self.init(JSON.parse(localStorage.getItem('USER_INFO')) || {});
		},
		methods: {
			init(data) {
				const self = this;
				self.phoneNumber = data.phoneNumber
				self.verificationCode = data.verificationCode
				self.weixin = data.weixin
				let USER_INFO = JSON.parse(localStorage.getItem('USER_INFO')) || {}
				console.log(USER_INFO)
				if (USER_INFO) {
					self.weixin = USER_INFO.weixin
				} else {
					self.alertMsg('手机号错误，请重新输入！')
				}
			},
			countDown() {
				if (!this.canClick) return
				this.canClick = false
				this.content = this.totalTime + 's后重新获取'
				let clock = window.setInterval(() => {
					this.totalTime--
					this.content = this.totalTime + 's后重获取'
					if (this.totalTime < 0) {
						window.clearInterval(clock);
						this.content = '重新获取验证码'
						this.totalTime = 60
						this.canClick = true
					}
				}, 1000)
			},
			nextBtn(parames) {
				if (this.phoneNumber === "" || this.weixin === "") {
					return
				}
				api.updatePhoneNumber({
					phoneNumber: this.phoneNumber,
					verificationCode: this.verificationCode,
					weixin: this.weixin,
				}).then(res => {
					let data = res.data.data;
					if (res.data.data) {
						localStorage.setItem('USER_INFO', JSON.stringify(data))
						this.$f7router.back('/home/')
						this.$f7router.url = '/affirm-phone/'
					}
				}).catch(err => {
					alert('服务器繁忙')
				})
			},
		}
	}
</script>
