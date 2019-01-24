<template>
  <f7-page class="no-navbar">
    <div style="width:100%;min-height:115px;margin-bottom:-35px;text-align:center;margin-top:20px;border-bottom: 1px solid #ececec;">
      <div>
        <img src="../img/img2039716589809cc0.png" style="width:auto;" />
      </div>
      <div style="margin-top:10px;color:#e94e24;">
        <span>圈兔圈共享空气净化器</span>
      </div>
    </div>
    <form style="margin-top:41px;">
      <div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
        <input type="tel"  v-model="admin.phoneNumber" placeholder="输入手机号码"  @keyup = "keyDown()" oninput="if(value.length>11)value=value.slice(0,11)"  style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;"/>
			</div>
      <div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
				<span style="width:70%;float: left;">
					<input type="text" v-model="admin.verificationCode"  placeholder="输入验证码"  @keyup = "keyDown()" oninput="if(value.length>6)value=value.slice(0,6)" style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;"/>
				</span>
        <span style="width: 30%; ">
					<a href="#" id="code" @click="countDown" class="button button-fill" :class="{disabled: !this.canClick}"
             no-fast-click style="margin:0 auto;background:#e94e24;disable:disable;height: 44px; line-height:44px;">{{content}}</a>
				</span>
      </div>
      <div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
        <input type="text" v-model="admin.identificationNumber" placeholder="身份唯一识别码"  @keyup = "keyDown()" style="height: 44px; line-height: 44px;  text-indent: 10px;width: 100%;" oninput="if(value.length>18)value=value.slice(0,18)"/>
      </div>
      <div style="height: 44px; line-height: 44px; width: 100%; background: #fff;">
				<span style="width:7%;float: left;text-align: left;" @change="keyDown()">
					<input type="checkbox" checked  v-model="checkBox"  style="height: 38px; line-height: 40px; "/>
				</span>
        <span style="width: 93%; ">
					<f7-button style="height: 44px; line-height: 44px; color:#b9b9b9; text-align: left; border:0px;" popup-open=" #popup" class="about-div">我已阅读,并同意《用户注册协议》</f7-button>
				</span>
      </div>
      <div style="width: 100%; margin-top: 20px;">
        <a  class="button button-fill" :class="{disabled: this.canInput}"  @click="loginBtn()" style="width:90%;margin:0 auto;background:#e94e24;height: 44px; line-height:44px;">验证手机</a>
      </div>
    </form>
  </f7-page>
</template>
<style>
  .about-div {
    margin: 0 auto 0 0;
    border: 0px solid white !important;
    font-size: 17px;
    color: #b9b9b9 !important;
    padding: 0px;
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
        admin:{
          identificationNumber:'',
          weixin:localStorage.getItem('weixin') || '',
          verificationCode:'',
          phoneNumber:'',
        }
      }
    },
    mounted(){
      let code = CommonUtils.getQueryString('code')
        if (code ===null){ //用户授权
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
        if (config.wxUserInfo.openid) {
          this.admin.weixin = config.wxUserInfo.openid
        }
        if(this.admin.phoneNumber ==="" || this.admin.verificationCode==""||this.admin.weixin==""||this.admin.identificationNumber=="") {
          return
        }
        api.login({
          phoneNumber: this.admin.phoneNumber,
          verificationCode: this.admin.verificationCode,
          weixin:this.admin.weixin || config.wxUserInfo.openid,
          identificationNumber:this.admin.identificationNumber,
					headerUrl:config.wxUserInfo.headimgurl,
          sex:config.wxUserInfo.sex,
					address:config.wxUserInfo.country + ' ' + config.wxUserInfo.province + ' ' + config.wxUserInfo.city,
					nickName: config.wxUserInfo.nickname
        }).then(res => {
          let data = res.data.data;
					console.log(data);
          if(res.data.status == '200' && res.data.data){
            localStorage.setItem('weixin',res.data.data.weixin)
						this.$f7router.navigate('/home/')
          }
        }).catch(err =>{
          this.alertMsg('服务器繁忙')
        })
      },
      keyDown(){
          if (this.admin.phoneNumber !=="" && this.admin.verificationCode!=="" && this.admin.identificationNumber!=="" && this.checkBox) {
            this.canInput = false
            //滚动到顶部
            window.scrollTo(0, 0);
          } else {
            this.canInput = true;
          }
        }
      },
      alertMsg(msg) {
        let toastTop = this.$f7.toast.create({
          text: msg,
          position: 'top',
          closeTimeout: 1000,
        })
        toastTop.open();
      }
  }
</script>
