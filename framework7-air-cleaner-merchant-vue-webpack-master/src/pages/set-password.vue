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
				isAlipay:true
			}
		},
    created() {
      const self = this;
      self.init(JSON.parse(localStorage.getItem('USER_INFO')) || {});
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
	    init(data){
		    const self = this;
		    self.isAlipay = data.alipay
		    self.openId=data.weixin
	    },
	    submitPwdBtn(){
			alert();
		   let toastTop = this.$f7.toast.create({})
		   if (this.oldTradePwd !== '' && (this.oldTradePwd === this.tradePwd || this.oldTradePwd === this.tradePwd 
			  || this.oldTradePwd === this.firstTraderPwd || this.oldTradePwd === this.firstTraderPwd)) {
				this.alertMsg('旧密码与新密码相同,请重新输入')
				return
		   }
		  if(!this.canInput && this.firstTraderPwd !== '' && this.phoneNumber !== '' && this.tradePwd !== '' || (this.isAlipay && this.oldTradePwd !== '') ) {
			  api.updateTradePwd(this.$f7.form.convertToData('#set-password')).then(res => {
				let data = res.data
			    if (data.status=="200") {
				  this.alertMsg('设置成功')
				  window.setTimeout(()=>{
				  this.$f7router.navigate('/home/')
				  },1000)
			    } else if(data.status=="1016" || data.status=="1017" || data.status=="1018") {
				  this.alertMsg(data.description)
			    } else {
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
			if (this.phoneNumber === '' || this.tradePwd === ''  || this.firstTraderPwd ==='' || (this.isAlipay && this.oldTradePwd === '')) {
					this.canInput = true
			} else {
				this.canInput = false;
				//滚动到顶部
				window.scrollTo(0, 0);
			}
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
