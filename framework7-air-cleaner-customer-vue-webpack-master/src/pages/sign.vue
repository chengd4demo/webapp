<template>
  <f7-page>
    <div class="header-logo">
      <img src="../img/img2039716589809cc0.png">
      <p>圈兔共享空气净化器</p>
    </div>
    <div style="margin-top:10px;color:#e94e24;">
          <span>圈兔共享空气净化器</span>
    </div>
</div>
 <f7-list form>
		<f7-list-item >
			<f7-input type="number" placeholder="输入手机号码" style="height: 44px;"/>
		</f7-list-item>
  <f7-list-item style="height: 44px;">
			<f7-col style="height: 44px;">
				<f7-input type="number" placeholder="验证码"/>
			</f7-col>
			<f7-col style="height: 44px;">
					<a href="#" id="code" @click="countDown" class= "button button-fill" :class="{disabled: !this.canClick}" no-fast-click style="margin:0 auto;background:#e94e24;disable:disable;height: 44px; line-height:44px;">{{content}}</a>
			</f7-col>
  </f7-list-item>
  <f7-list-item checkbox name="my-checkbox" value="2" title="我已阅读,并同意《用户注册协议》" style="height: 44px;font-size: 12px;"></f7-list-item>  
  <p><a href="/center/" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;height: 44px; line-height:44px;">验证手机</a></p>
 </f7-list>
</f7-page>
</template>
<style>
    .disabled{
        background-color: #ddd;
        border-color: #ddd;
        color:#57a3f3;
        cursor: not-allowed;
    }
		input::-webkit-input-placeholder {
         /* placeholder颜色  */
         color: #aab2bd;
         /* placeholder字体大小  */
         font-size: 12px;
     }
		 .ios .icon-checkbox, .ios .checkbox i {
				width: 18px;
				height: 18px;
				/* border-radius: 50%; */
				border: 1px solid #c7c7cc;
		}
  .content-block{
    margin:0 auto 0 0;
    border: 0px solid white !important;
    font-size: 17px;
    color: #b9b9b9 !important;
    padding: 0px;
  }
  .header-logo{
    width: 100%;
    height: 175px;
    text-align: center;
  }
  .header-logo img{
    width: 160px;
    height: 70px;
    margin-top: 25px;
  }
  .header-logo p{
    color: #E94E24;
    margin-top: 20px;
    font-size: 16px;
  }
</style>

<script>
  export default{
    data() {
      return {
        content: '发送验证码',
        totalTime: 60,
        canClick:true
      }
    },
    methods: {
      countDown() {
        if (!this.canClick) return
        this.canClick = false
        this.content = this.totalTime + 's后重新发送'
        let clock = window.setInterval(() => {
          this.totalTime --
          this.content = this.totalTime + 's后重新发送'
          if(this.totalTime <0) {
            window.clearInterval(clock);
            this.content = '重新发送验证码'
            this.totalTime = 60
            this.canClick = true
          }
        },1000)
      },
    }
  }

</script>
