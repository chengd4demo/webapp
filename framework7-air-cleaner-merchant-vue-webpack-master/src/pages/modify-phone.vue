<template>
  <f7-page>
    <f7-navbar title="修改手机号码" back-link="" style="background:#e94e24;"></f7-navbar>
    <form style="margin-top:41px;">
      <div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
        <input type="number" v-model="phoneNumber" placeholder="输入现在绑定的手机号码" @keyup="keyDown()"
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

  export default {
    data() {
      return {
        content: '发送验证码',
        totalTime: 60,
        canClick: true,
        smsCode: '',
        verificationCode: '',
        phoneNumber: '',
        canInput:true
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
      /*init( data ) {
        const self = this;
        self.verificationCode = data.verificationCode
        self.phoneNumber = data.phoneNumber

        let PHONE_INFO = JSON.parse(localStorage.getItem('PHONE_INFO')) || {}
        console.log(PHONE_INFO)
        if (PHONE_INFO) {
          self.weixin = PHONE_INFO.weixin
        } else {
          self.alertMsg('验证失效，请重新认证')
        }
      },*/
      updatePhoneNumber( params ) {
        var self = this;
        api.updatePhoneNumber(params).then(function (res) {
          var data = res.data.data;
          self.verificationCode = data.verificationCode
          self.phoneNumber = data.phoneNumber
        }).catch(function(err){
          console.log(err+'sss')
        })
        /*let PHONE_INFO = JSON.parse(localStorage.getItem('PHONE_INFO')) || {}
        console.log(PHONE_INFO)
        if (PHONE_INFO) {
          self.weixin = PHONE_INFO.weixin
        } else {
          self.alertMsg('验证失效，请重新认证')
        }*/
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
        if (this.phoneNumber !== "" && this.verificationCode !== "") {
          this.canInput = false
          //滚动到顶部
          window.scrollTo(0, 0);
        } else {
          this.canInput = true;
        }
      },
      getAffirmHref() {
        return '/affirm-phone/verificationCode/' + this.verificationCode + '/phoneNumber/' + this.phoneNumber + '/';
      }
    }
  }

</script>
