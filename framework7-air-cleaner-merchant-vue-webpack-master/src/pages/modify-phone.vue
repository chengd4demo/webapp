<template>
  <f7-page>
    <f7-navbar title="修改手机号码" back-link="" style="background:#e94e24;"></f7-navbar>
    <form style="margin-top:41px;">
      <div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
        <input type="tel" v-model="phoneNumber" placeholder="输入现在绑定的手机号码" @keyup="keyDown()"
               oninput="if(value.length>11)value=value.slice(0,11)"
               style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;"/>
      </div>
      <div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
				<span style="width:70%;float: left;">
					<input type="number" v-model="verificationCode" placeholder="输入验证码" @keyup="keyDown()"
                 oninput="if(value.length>6)value=value.slice(0,6)"
                 style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;"/>
				</span>
        <span style="width: 30%; ">
					<a href="#" id="code" @click="countDown" class="button button-fill" :class="{disabled: !this.canClick}"
             no-fast-click style="margin:0 auto;background:#e94e24;disable:disable;height: 44px; line-height:44px;">{{content}}</a>
				</span>
      </div>
      <div style="width: 100%; margin-top: 20px;">
        <a :href="getAffirmHref()" class="button button-fill"  :class="{disabled: this.canInput}"
           style="width:90%;margin:0 auto;background:#e94e24;height: 44px; line-height:44px;">下一步</a>
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
  import api from "../network";
  import CommonUtils from '@/util/common';
  export default {
    data() {
      return {
        content: '发送验证码',
        totalTime: 60,
        canClick: true,
        smsCode: '111111',
        verificationCode: '',
        phoneNumber: '',
        canInput:true,
        canClickDate:new Date()
      }
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
        this.canClickDate = new Date()
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
      updatePhoneNumber(params) {
        var self = this;
        api.updatePhoneNumber(params).then(function (res) {
          var data = res.data.data;
          self.verificationCode = data.verificationCode
          self.phoneNumber = data.phoneNumber
        }).catch(function(err){
          console.log(err+'sss')
        })
      },
      alertMsg( msg ) {
        let toastTop = this.$f7.toast.create({
          text: msg,
          position: 'top',
          closeTimeout: 1000,
        })
        toastTop.open();
      },
      keyDown() {
        if (this.phoneNumber !== "" && this.verificationCode !== "" && this.phoneNumber.length === 11 && this.verificationCode.length === 6) {
          if (!this.checkedPhoneNumber(this.phoneNumber)) {
            this.alertMsg('请输入绑定的手机号码')
            return
          }
					if(this.smsCode.length!=0 && this.verificationCode.length == 6 &&  this.phoneNumber.length==11) {
						this.checkValidVerificationCode()
						//滚动到顶部
						window.scrollTo(0, 0);
					}
        } else {
          this.canInput = true;
        }
      },
      checkedPhoneNumber(phoneNumber){
        let M_USER_INFO = JSON.parse(CommonUtils.localStorage.getItem('M_USER_INFO')) || {}
        if (!phoneNumber || phoneNumber !== M_USER_INFO.phoneNumber) {
          return false;
        }
        return true;
      },
      getAffirmHref() {
        return '/affirm-phone/verificationCode/' + this.verificationCode + '/phoneNumber/' + this.phoneNumber + '/';
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
									 this.canInput = false
							}
					}).catch(err => {
							this.alertMsg("服务繁忙")
					})
			},
			querySmsCode(phoneNumber) {
				let parames = phoneNumber + '?smsType=chagePhone'
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
