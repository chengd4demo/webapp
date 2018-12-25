<!-- center Page Template -->
<template id="page-center">

  <f7-page>
    <f7-navbar class="header-title" title="个人信息设置" back-link="" style="background: #E94E24 !important;"></f7-navbar>
    <f7-list form id='personinfo' style="margin: auto">
      <input type="hidden" v-model = "weixin" name = "weixin"/>
      <div class="list inline-labels no-hairlines-md" style="margin: auto;">
        <ul>
          <!--姓名-->
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label" style="width: auto">姓名:</div>
              <div class="item-input-wrap">
                <input type="text" v-model = "name"  placeholder="请输入姓名" maxlength="12" required validate>
              </div>
            </div>
          </li>
          <!--年龄-->
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label" style="width: auto">年龄:</div>
              <div class="item-input-wrap">
                <input type="text" v-model = "age" disabled ='true' placeholder="请输入年龄" pattern="^([0-9]|[0-9]{2}|120)$" data-error-message="请输入正确的年龄范围" required validate>
              </div>
            </div>
          </li>
          <!--性别-->
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label person" style="width: 37px;">性别:</div>
              <div class="item-input-wrap" style="min-height:0px">
                <label class="label-switch">
                  <input type="radio" checked v-model = "sex" value="1" name="sex">
                  <div class="checkbox">男</div>
                </label>
                <label class="label-switch" style="margin-left: 20px">
                  <input type="radio" value="2"  v-model = "sex" name="sex">
                  <div class="radio">女</div>
                </label>
              </div>
            </div>
          </li>
          <!--昵称-->
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label" style="width: auto">昵称:</div>
              <div class="item-input-wrap">
                <input type="text" v-model = "nickName" name="nickName" placeholder="请输入昵称">
                <span class="input-clear-button"></span>
              </div>
            </div>
          </li>
          <!--生日-->
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label person" style="width:37px;;">生日:</div>
              <div class="item-input-wrap" style="width: 100%;">
                <input type="text" v-model = "birthday" disabled ='true'  placeholder="请选择日期">
              </div>
            </div>
          </li>
          <!--身份证-->
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label" style="width: auto">身份证号码:</div>
              <div class="item-input-wrap">
                <input type="text" v-model = "identificationNumber"  @keyup ="keyDown()" name="identificationNumber" placeholder="请输入身份证号码" pattern="(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)" data-error-message="请输入正确的身份证号码" required validate>
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
        identificationNumber:'',
        name:'',
        nickName:'',
        age:0,
        sex:1,
        weixin:'',
        birthday:''
			}
		},
    created() {
      const self = this;
      self.init(JSON.parse(localStorage.getItem('USER_INFO')) || {});
    },
    methods: {
      init(data){
          const self = this;
          self.nickName = data.nickName
          self.name = data.name
          self.identificationNumber = data.identificationNumber
          self.weixin=data.weixin
          self.sex = CommonUtils.getSex(self.identificationNumber)
          self.age = CommonUtils.getAge(self.identificationNumber)
          self.birthday =  CommonUtils.getBirthDay(self.identificationNumber)
          let USER_INFO = JSON.parse(localStorage.getItem('USER_INFO')) || {}
          console.log(USER_INFO)
          if (USER_INFO) {
            self.weixin = USER_INFO.weixin
          } else {
            	self.alertMsg('验证失效，请重新认证')
          }
      },
      submitBtn(){
         let toastTop = this.$f7.toast.create({})
         api.updateSelfInfo(this.$f7.form.convertToData('#personinfo')).then(res => {
           let data = res.data
           if (data.status=="200") {
             this.alertMsg('设置成功')
           } else {
             this.alertMsg('设置失败')
           }
         }).catch(err =>{
					this.alertMsg('服务器繁忙')
				})
      },
      alertMsg(msg){
        let toastTop = this.$f7.toast.create({
          text: msg,
          position: 'top',
          closeTimeout: 1000,
        })
        toastTop.open();
      },
      keyDown() {
        const self = this;
        if(self.identificationNumber.length == 15 || self.identificationNumber.length == 18) {
           self.sex = CommonUtils.getSex(self.identificationNumber)
           self.age = CommonUtils.getAge(self.identificationNumber)
           self.birthday =  CommonUtils.getBirthDay(self.identificationNumber)
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
  .md .list input[type="text"],.checkbox,.radio{
    font-size: 17px;
  }
  .disabled {
		background-color: #ddd;
		border-color: #ddd;
		color: #57a3f3;
		cursor: not-allowed;
	}
  .submit-p{
    margin-top: 35px;
  }
  .input-data{
    font-size: 17px !important;
  }
</style>
