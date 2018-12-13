<template>
  <f7-page>
    <f7-navbar title="确认手机号码" back-link="" style="background:#e94e24;"></f7-navbar>
    <f7-list form style="margin-top:1px">
      <f7-list-item>
        <f7-input type="number" placeholder="输入新的手机号码"/>
      </f7-list-item>
      <f7-list-item>
        <f7-col>
          <f7-input type="number" placeholder="验证码"/>
        </f7-col>
        <f7-col>
          <p><a href="#" id="code" @click="countDown" class= "button button-fill" :class="{disabled: !this.canClick}" no-fast-click style="margin:0 auto;background:#e94e24;disable:disable">{{content}}</a></p>
        </f7-col>
      </f7-list-item>
      <p><a href="#" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;">完成</a></p>
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
        content: '获取验证码',
        totalTime: 60,
        canClick:true
      }
    },
    methods: {
      countDown() {
        if (!this.canClick) return
        this.canClick = false
        this.content = this.totalTime + 's后重新获取'
        let clock = window.setInterval(() => {
          this.totalTime --
          this.content = this.totalTime + 's后重获取'
          if(this.totalTime <0) {
            window.clearInterval(clock);
            this.content = '重新获取验证码'
            this.totalTime = 60
            this.canClick = true
          }
        },1000)
      },
    }
  }

</script>
