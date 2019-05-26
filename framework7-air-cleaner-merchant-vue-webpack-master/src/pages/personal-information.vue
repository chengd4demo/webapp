<template>
	<f7-page>
		<f7-navbar title="个人信息设置" back-link="" style="background:#e94e24;"></f7-navbar>
		<f7-list form id='personinfo' style="margin: auto">
			<input type="hidden" v-model = "sex" name = "sex"/>
			<input type="hidden" v-model="name" name="name"/>
			<div class="list inline-labels no-hairlines-md" style="margin: auto;">
				<ul>
					<!--昵称-->
					<li class="item-content item-input">
						<div class="item-inner">
							<div class="item-title item-label" style="width: auto">昵称:</div>
							<div class="item-input-wrap">
								<input type="text" v-model="nickName" name="nickName" placeholder="请输入昵称" required validate>
								<span class="input-clear-button"></span>
							</div>
						</div>
					</li>
					<!--微信号-->
					<li class="item-content item-input">
						<div class="item-inner">
							<div class="item-title item-label" style="width: auto">微信号:</div>
							<div class="item-input-wrap">
								<input type="text" v-model="weixin" name = "weixin" disabled ='true'  maxlength="12">
							</div>
						</div>
					</li>
					<!--身份证-->
					<li class="item-content item-input">
						<div class="item-inner">
							<div class="item-title item-label" style="width: auto">身份证号码:</div>
							<div class="item-input-wrap">
								<input type="text" v-model="identificationNumber"  name="identificationNumber" placeholder="请输入身份证号码"
								 pattern="(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)" data-error-message="请输入正确的身份证号码" required validate>
								<span class="input-clear-button"></span>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<p class="submit-p"><a @click="submitBtn()" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;">提交</a></p>
		</f7-list>
	</f7-page>
</template>
<script>
	import api from '../network'
	import CommonUtils from '@/util/common'
	export default {
		data() {
			return {
				totalTime: 60,
				canClick: true,
				identificationNumber: '',
				nickName: '',
				weixin: '',
				name:'',
				sex:1,
				age:0,
				birthday:''
			}
		},
		created() {
			const self = this;
			self.init(JSON.parse(CommonUtils.localStorage.getItem('M_USER_INFO')) || {});
		},
		methods: {
			init(data) {
				const self = this;
				self.nickName = data.nickName
				self.name = data.name 
				self.identificationNumber = data.identificationNumber
				self.weixin=data.weixin
				self.sex = CommonUtils.getSex(self.identificationNumber)
				self.age = CommonUtils.getAge(self.identificationNumber)
				self.birthday =  CommonUtils.getBirthDay(self.identificationNumber)
				let M_USER_INFO = JSON.parse(CommonUtils.localStorage.getItem('M_USER_INFO')) || {}
				console.log(M_USER_INFO)
				if (M_USER_INFO) {
					self.weixin = M_USER_INFO.weixin
				} else {
					self.alertMsg('验证失效，请重新认证')
				}
			},
			submitBtn() {
				let toastTop = this.$f7.toast.create({})
				api.updateSelfInfo(this.$f7.form.convertToData('#personinfo')).then(res => {
					let data = res.data
					if (data.status == "200") {
						this.alertMsg('设置成功')
						window.setTimeout(()=>{
						this.$f7router.navigate('/home/')
						},1000)
					} else {
						this.alertMsg('设置失败')
					}
				}).catch(err => {
					this.alertMsg('服务器繁忙')
				})
			},
			alertMsg(msg) {
				let toastTop = this.$f7.toast.create({
					text: msg,
					position: 'top',
					closeTimeout: 1000,
				})
				toastTop.open();
			},
		}
	}
</script>

<style type="text/css">
	input::-webkit-input-placeholder {
		/* placeholder颜色  */
		color: #aab2bd;
		/* placeholder字体大小  */
		font-size: 12px;
	}

	.md .list input[type="text"],
	.checkbox,
	.radio {
		font-size: 14px;
	}

	.disabled {
		background-color: #ddd;
		border-color: #ddd;
		color: #57a3f3;
		cursor: not-allowed;
	}

	.submit-p {
		margin-top: 35px;
	}
</style>
