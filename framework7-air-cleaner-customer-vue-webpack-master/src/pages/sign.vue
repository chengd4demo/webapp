<template>
	<f7-page>
		<div class="header-logo">
			<img src="../img/img2039716589809cc0.png">
			<p>圈兔圈共享空气净化器</p>
		</div>
		<div>
			<form>
				<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
					<input type="number" v-model= "admin.phoneNumber" placeholder="输入手机号码" @keyup = "keyDown()" oninput="if(value.length>11)value=value.slice(0,11)"   style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;"/>
				</div>
				<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
					<span style="width:70%;float: left;">
						<input id="phone" type="number" v-model="admin.verificationCode" @keyup = "keyDown()" placeholder="输入验证码" oninput="if(value.length>6)value=value.slice(0,6)" style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;"/>
					</span>
					<span style="width: 30%; ">
						<a href="#" id="code" @click="countDown" class="button button-fill" :class="{disabled: !this.canClick}"
						no-fast-click style="margin:0 auto;background:#e94e24;disable:disable;height: 44px; line-height:44px;">{{content}}</a>
					</span>
				</div>
				<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;" >
					<label for="label" style="width:7%;float: left;text-align: left;"  @change="keyDown()">
						<input type="checkbox" checked  v-model="checkBox"  style="height: 38px; line-height: 40px; margin-left: 10px;"/>
					</label>
					<span style="width: 93%; ">
						<f7-button style="height: 44px; line-height: 44px; color:#b9b9b9; text-align: left;border:0px;" popup-open=" #popup" class="about-div">我已阅读,并同意《用户注册协议》</f7-button>
					</span>
				</div>
				<div style="width: 100%; margin-top: 20px;">
					<a class="button button-fill " :class="{disabled: this.canInput}"  @click="loginBtn()" style="width:90%;margin:0 auto;background:#e94e24;height: 44px; line-height:44px;">验证手机</a>
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
	import CommonUtils from '@/util/common'
    import config from '@/util/config'
	export default {
		data() {
			return {
				content: '发送验证码',
				totalTime: 60,
				canClick: true,
				smsCode:'',
				canInput:true,
				checkBox:false,
				admin: {
					weixin:localStorage.getItem('weixin'),
					verificationCode:'',
					phoneNumber:'',
				}
			}
		},
    mounted(){
	 //1.用户授权
	 //2.获取授权后的用户信息
	 let code = CommonUtils.getQueryString('code')
        if (code ===null || code === ''){ //用户授权
          api.authorize().then(res=>{
            let data = res.data.data
            window.location.href = data;
          }).catch(err=>{
            alert('获取授权失败')
          })
        } else { //获取用户微信信息
           api.queryObtainUserInfo({code:code}).then(res=>{
              let data = res.data.data
              if(res.data.status == '200') {
                 config.wxUserInfo.openid = data.openid
                 config.wxUserInfo.nickname = data.nickname
                 config.wxUserInfo.sex = data.sex
                 config.wxUserInfo.province = data.province
                 config.wxUserInfo.city = data.city
                 config.wxUserInfo.country = data.country
                 config.wxUserInfo.headimgurl = data.headimgurl
              }
           }).catch(err=>{

           })
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
					weixin:this.admin.weixin || config.wxUserInfo.openid,
					headerUrl:config.wxUserInfo.headimgurl,
					sex:config.wxUserInfo.sex,
					address:config.wxUserInfo.country + ' ' + config.wxUserInfo.province + ' ' + config.wxUserInfo.city,
					nickName: config.wxUserInfo.nickname
				}).then(res => {
					let data = res.data.data;
					if (res.data.status == '200' && res.data.data){
						localStorage.setItem('weixin',res.data.data.weixin)
						this.$f7router.navigate('/center/')
					} else {
            if (res.data.status == 'EP500') {
              this.alertMsg('服务器繁忙')
            } else if(res.data.status == '1013'){
              this.alertMsg('手机号码或验证码有误,请重新输入')
            }else{
              this.alertMsg(res.data.description)
            }
					}
				}).catch(err =>{
					this.alertMsg('服务器繁忙')
				})
			},
			keyDown(){
				if (this.admin.phoneNumber !=="" && this.admin.verificationCode!=="" && this.checkBox && this.admin.phoneNumber.length >10 && this.admin.verificationCode.length > 5) {
					this.canInput = false
					//滚动到顶部
					window.scrollTo(0, 0);
				} else {
					this.canInput = true;
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
			}
	}
</script>
