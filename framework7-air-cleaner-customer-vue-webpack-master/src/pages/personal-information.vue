<!-- center Page Template -->
<template id="page-center">

  <f7-page>
    <f7-navbar class="header-title" title="个人信息设置" back-link="" style="background: #E94E24 !important;"></f7-navbar>
    <f7-list form id='personinfo'>
      <input type="hidden" v-model = "weixin" name = "weixin"/>
      <div class="list no-hairlines-md">
        <ul>
          <!--姓名-->
          <li class="item-content item-input item-input-with-info">
            <div class="item-inner">
              <div class="item-title item-label">姓名</div>
              <div class="item-input-wrap">
                <input type="text" v-model = "name"  disabled ='true' placeholder="请输入姓名" required validate>
              </div>
            </div>
          </li>
          <!--年龄-->
          <li class="item-content item-input item-input-with-info">
            <div class="item-inner">
              <div class="item-title item-label">年龄</div>
              <div class="item-input-wrap">
                <input type="text" v-model = "age" placeholder="请输入年龄" disabled ='true' pattern="^([0-9]|[0-9]{2}|120)$" data-error-message="请输入正确的年龄范围" required validate>
              </div>
            </div>
          </li>
          <!--性别-->
          <li class="item-content item-input item-input-with-info">
            <div class="item-title label person" style="width: 35px;">性别</div>
            <div class="item-input-wrap" style="min-height:0px">
              <label class="label-switch" style="margin-left: 20px;">
                <input type="radio" checked v-model = "sex" value="1" name="sex">
                <div class="checkbox">男</div>
              </label>
              <label class="label-switch" style="margin-left: 20px">
                <input type="radio" value="2"  v-model = "sex" name="sex">
                <div class="radio">女</div>
              </label>
            </div>
          </li>
          <!--昵称-->
          <li class="item-content item-input item-input-with-info">
            <div class="item-inner">
              <div class="item-title item-label">昵称</div>
              <div class="item-input-wrap">
                <input type="text" v-model = "nickName" name="nickName" placeholder="请输入昵称">
                <span class="input-clear-button"></span>
              </div>
            </div>
          </li>
          <!--生日-->
          <li class="item-content item-input item-input-with-info">
            <div class="item-title label person" style="width: 35px;">生日</div>
            <div class="item-input-wrap" style="width: 100%">
              <input type="date" value="2014-04-30" placeholder="Please choose...">
            </div>
          </li>
          <!--身份证-->
          <li class="item-content item-input item-input-with-info">
            <div class="item-inner">
              <div class="item-title item-label">身份证号码</div>
              <div class="item-input-wrap">
                <input type="text" v-model = "identificationNumber" name="identificationNumber" placeholder="请输入身份证号码" maxlength= "18" required validate>
                <span class="input-clear-button"></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <p><a @click="submitBtn()" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;">提交</a></p>
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
        weixin:''
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
    font-size: 12px;
    padding-bottom:3px;
  }
  .person {
    font-size: 12px !important;
  }
  .disabled {
		background-color: #ddd;
		border-color: #ddd;
		color: #57a3f3;
		cursor: not-allowed;
	}
</style>
