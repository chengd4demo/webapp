<template>
  <f7-page>
    <div style="width:100%;height:20%;margin-bottom:-35px;text-align:center;margin-top:20px">
      <div style="width:355px;">
        <img src="../img/img2039716589809cc0.png" style="width:auto;"/>
      </div>
      <div style="margin-top:10px;color:#e94e24;">
        <span>圈兔共享空气净化器</span>
      </div>
    </div>
    <f7-list form>
      <f7-list-item>
        <f7-input type="number" placeholder="输入手机号码"/>
      </f7-list-item>
      <f7-list-item>
        <f7-col>
          <f7-input type="number" placeholder="验证码"/>
        </f7-col>
        <f7-col>
          <p><a href="#" id="code" @click="countDown" class= "button button-fill" :class="{disabled: !this.canClick}" no-fast-click style="margin:0 auto;background:#e94e24;disable:disable">{{content}}</a></p>
        </f7-col>
      </f7-list-item>
      <f7-list-item>
        <f7-input type="text" placeholder="输入身份识别码"/>
      </f7-list-item>
      <f7-list-item checkbox name="my-checkbox" value="2" title="我已阅读,并同意《用户注册协议》"></f7-list-item>
      <p><a href="/home/" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;">验证手机</a></p>
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
