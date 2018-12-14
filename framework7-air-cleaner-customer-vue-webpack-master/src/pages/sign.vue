<template>
	<f7-page>
		<div class="header-logo">
			<img src="../img/img2039716589809cc0.png">
			<p>圈兔圈共享空气净化器</p>
		</div>
		</div>
		<div>
			<form>
				<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
					<input type="number" v-model= "admin.phoneNumber" placeholder="输入手机号码" style="height: 44px; line-height: 44px;  text-indent: 10px;"/>
				</div>
				<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
					<span style="width:70%;float: left;">
						<input type="number" v-model="admin.verificationCode" placeholder="输入验证码" style="height: 44px; line-height: 44px;  text-indent: 10px;"/>
					</span>
					<span style="width: 30%; ">
						<a href="#" id="code" @click="countDown" class="button button-fill" :class="{disabled: !this.canClick}"
						no-fast-click style="margin:0 auto;background:#e94e24;disable:disable;height: 44px; line-height:44px;">{{content}}</a>
					</span>
				</div>
				<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;">
					<span style="width:7%;float: left;text-align: left;">
						<input type="checkbox" name="my-checkbox" value="2"  style="height: 38px; line-height: 40px; "/>
					</span>
					<span style="width: 93%; ">
						<a href="#">我已阅读,并同意《用户注册协议》</a>
					</span>
				</div>
				<div style="width: 100%; margin-top: 20px;">
					<a class="button button-fill" @click="loginBtn()" style="width:90%;margin:0 auto;background:#e94e24;height: 44px; line-height:44px;">验证手机</a>
				</div>
			</form>
		</div>
	</f7-page>
</template>
<style>
	.disabled {
		background-color: #ddd;
		border-color: #ddd;
		color: #57a3f3;
		cursor: not-allowed;
	}

	input::-webkit-input-placeholder {
		/* placeholder颜色  */
		color: #aab2bd;
		/* placeholder字体大小  */
		font-size: 12px;
	}

	.ios .icon-checkbox,
	.ios .checkbox i {
		width: 18px;
		height: 18px;
		/* border-radius: 50%; */
		border: 1px solid #c7c7cc;
	}

	.content-block {
		margin: 0 auto 0 0;
		border: 0px solid white !important;
		font-size: 17px;
		color: #b9b9b9 !important;
		padding: 0px;
	}

	.header-logo {
		width: 100%;
		height: 175px;
		text-align: center;
	}

	.header-logo img {
		width: 160px;
		height: 70px;
		margin-top: 25px;
	}

	.header-logo p {
		color: #E94E24;
		margin-top: 20px;
		font-size: 16px;
	}
</style>

<script>
	import api from '../network'
	export default {
		data() {
			return {
				content: '发送验证码',
				totalTime: 60,
				canClick: true,
				smsCode:'',
				admin: {
					weixin:'aerstdyui',
					verificationCode:'',
					phoneNumber:'',
				}
			}
		},
		methods: {
			countDown() {
				if (!this.canClick) return
				this.canClick = false
				this.content = this.totalTime + 's后重新发送'
				let clock = window.setInterval(() => {
					this.totalTime--
					this.content = this.totalTime + 's后重新发送'
					if (this.totalTime < 0) {
						window.clearInterval(clock);
						this.content = '重新发送验证码'
						this.totalTime = 60
						this.canClick = true
					}
				}, 1000)
			},
			loginBtn(){
				if(this.admin.phoneNumber ==="" || this.admin.verificationCode=="") {
					return
				}
				api.login({
					phoneNumber: this.admin.phoneNumber,
					verificationCode: this.admin.verificationCode,
					weixin:this.admin.weixin
				}).then(res => {
					let data = res.data.data;
					if(res.data.data){
						//localStorage.setItem(JSON.stringify(data))
						localStorage.setItem('USER_INFO',JSON.stringify(data))
						this.$f7router.back('/center/')
					}
				}).catch(err =>{
					alert('服务器繁忙')
				})
			}
		}
	}
</script>
