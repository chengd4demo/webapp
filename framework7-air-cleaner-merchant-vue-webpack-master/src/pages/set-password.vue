<template>
	<f7-page>
		<f7-navbar title="设置提现密码" back-link="" style="background:#e94e24;"></f7-navbar>
		<f7-list form id='set-password' style="margin: auto">
				<input type="hidden" v-model="openId" name="openId" />
				<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
					<input type="number" v-model="phoneNumber" name="phoneNumber" @keyup="keyDown()" placeholder="输入已绑定的手机号码" oninput="if(value.length>11)value=value.slice(0,11)"
					 style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;" required validate />
				</div>
				<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
					<span style="width:70%;float: left;">
						<input type="number" v-model="verificationCode" @keyup="keyDown()" placeholder="输入验证码" oninput="if(value.length>6)value=value.slice(0,6)"
						 style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;" required validate />
					</span>
					<span style="width: 30%; ">
						<a href="#" id="code" @click="countDown" class="button button-fill" :class="{disabled: !this.canClick}" oninput="if(value.length>6)value=value.slice(0,6)"
						 no-fast-click style="margin:0 auto;background:#e94e24;disable:disable;height: 44px; line-height:44px;">{{content}}</a>
					</span>
				</div>
				<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;" v-if="isAlipay">
					<input type="password" v-model="oldTradePwd" name="oldTradePwd" @keyup="keyDown()" oninput="if(value.length>6)value=value.slice(0,6)" placeholder="输入旧提现密码" style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;"
					 required validate />
				</div>
				<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
					<input type="password" v-model="firstTraderPwd" @keyup="keyDown()" oninput="if(value.length>6)value=value.slice(0,6)" placeholder="输入新提现密码" style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;"
					 required validate />
				</div>
				<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
					<input type="password" v-model="tradePwd" name="tradePwd" @keyup="keyDown()" oninput="if(value.length>6)value=value.slice(0,6)" placeholder="确认新提现密码" style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;"
					 required validate />
				</div>
			<p class="submit-p"><a @click="submitPwdBtn()" :class="{disabled: this.canInput}" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;">提交</a></p>
		</f7-list>
	</f7-page>
</template>

<script>
  import api from '../network'
  import CommonUtils from '@/util/common'
  import md5 from 'js-md5'
  import config from '@/util/config'
  export default {
    data() {
			return {
				content: '获取验证码',
				totalTime: 60,
				canClick: true,
				canInput:true,
				verificationCode:'',
				openId:'',
				phoneNumber:'',
				tradePwd:'',
				oldTradePwd:'',
				firstTraderPwd:'',
				userType:'',
				smsCode:'',
				isAlipay:true
			}
		},
    created() {
      const self = this;
      self.init(JSON.parse(localStorage.getItem('M_USER_INFO')) || {});
    },
    methods: {
	    countDown() {
			window.scrollTo(0, 0);
			if(this.phoneNumber.length ==0 ){
			  this.alertMsg('请输入手机号码')
			  return
			} else if(this.phoneNumber.length !=0 && this.phoneNumber.length<11) {
			  this.alertMsg('请输入正确的手机号码')
			  return
			}
			this.querySmsCode(this.phoneNumber)
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
	    init(data){
		    const self = this;
		    self.isAlipay = data.alipay
		    self.openId=data.weixin
	    },
	    submitPwdBtn(){
		   let toastTop = this.$f7.toast.create({})
		   if (this.oldTradePwd !== '' && (this.oldTradePwd === this.tradePwd || this.oldTradePwd === this.tradePwd 
			  || this.oldTradePwd === this.firstTraderPwd || this.oldTradePwd === this.firstTraderPwd)) {
				this.alertMsg('旧密码与新密码相同,请重新输入')
				return
		   }
		   if(this.firstTraderPwd !== this.tradePwd){
			   this.alertMsg('两次密码不一致，请重新输入')
			   return
		   }
		  if(!this.canInput && this.firstTraderPwd !== '' && this.phoneNumber !== '' && this.tradePwd !== '' || (this.isAlipay && this.oldTradePwd !== '') ) {
			  let reParames = this.$f7.form.convertToData('#set-password');
			  if(!this.isAlipay){
				 reParames.tradePwd = md5(this.tradePwd)
				 reParames.firstTraderPwd = md5(this.firstTraderPwd)
			  } 
			  else{
				  reParames.oldTradePwd = md5(this.oldTradePwd)
				  reParames.tradePwd = md5(this.tradePwd)
				  reParames.firstTraderPwd = md5(this.firstTraderPwd)
			  }
				api.updateTradePwd(reParames).then(res => {
				const router = this.$f7router;
				console.log(config.cashAmount.cashAvailableAmount)
				console.log(config.cashAmount.cashTotalAcmount)
				let data = res.data
				  if (data.status=="200") {
				  this.alertMsg('设置成功')
				  if(router.history[router.history.length-2].indexOf('/cash/availableAmount/') != -1){
					  window.setTimeout(()=>{
					  router.back()
					  },1000)
				  }else{
					window.setTimeout(()=>{
					router.navigate('/home/')
					},1000)
					  location.reload()
				  }
				  }else {
					this.alertMsg('设置失败')
				}
				}).catch(err =>{
				  this.alertMsg('服务器繁忙')
				})
		  }
	    },
	    alertMsg(msg){
		  let toastTop = this.$f7.toast.create({
		    text: msg,
		    position: 'top',
		    closeTimeout: 1000,
		  })
		  toastTop.open();
	    },
		keyDown(){
			if (this.phoneNumber === '' || this.tradePwd === ''  || this.firstTraderPwd ==='' || (this.isAlipay && this.oldTradePwd === '') ||(this.verificationCode === '' && this.smsCode === '')) {
					this.canInput = true
			} else {
				if(this.smsCode.length!=0 && this.verificationCode.length == 6 &&  this.phoneNumber.length==11) 
				this.checkValidVerificationCode()
				//滚动到顶部
				window.scrollTo(0, 0);
			}
		},
		checkValidVerificationCode (){
			if (this.smsCode!=this.verificationCode) {
				this.alertMsg("输入验证码错误,请重新输入")
				return
			}
			api.checkValidVerificationCode({
					phoneNumber:this.phoneNumber,
				  inVerificationCode:this.verificationCode,
					verificationCode:this.smsCode
				}).then(res => {
						let data = res.data
						if (data.status != '200'){
								if (data.status == 'EP500') {
									this.alertMsg("服务繁忙")
								} else {
									this.alertMsg(data.description)
								}
								return
						} else {
								 this.canInput = false;
						}
				}).catch(err => {
						this.alertMsg("服务繁忙")
				})
		},
		querySmsCode(phoneNumber) {
			let parames = phoneNumber + '?smsType=changeApply'
			api.sendSms(parames).then(res => {
				if (res.data.status == '200' && res.data.data) {
					this.smsCode = res.data.data
					this.alertMsg('短信发送成功')
				} else {
					if (res.data.status == 'EP500') {
						this.alertMsg('服务器繁忙!')
					} else if (res.data.status == '1013' || res.data.status == '1014' || res.data.status == '1015') {
						this.alertMsg(res.data.description)
					}
				}
			}).catch(err => {
				this.alertMsg('发送短信失败')
			})
		}
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
		font-size: 17px;
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

	.input-data {
		font-size: 17px !important;
	}
</style>
