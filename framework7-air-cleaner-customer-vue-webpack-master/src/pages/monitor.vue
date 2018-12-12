<!-- center Page Template -->
<template id="page-center">

  <f7-page>
    <f7-navbar class="header-title" title="我的PM2.5" back-link="" style="background-color:rgba(0,0,255,0.2);"></f7-navbar>
    <div class="header-quality">
      <div class="air-quality">55</div>
      <p class="air-condition">空气状况:良好</p>
      <p class="health-advice">健康建议:极少数敏感人群应减少户外运动</p>
    </div>
    <div class="running-state">
      <p style="margin-left: 50px">设备号:<span>{{machNo}}</span></p>
      <p>设备运行状态:<span>正常</span></p>
      <p>设备运行时长:<span>{{costTime}}</span></p>
      <p>剩余运行时长:<span>{{lastTime}}</span></p>
    </div>
    <p style="margin-top: 50px;"><a :href="getPriceHref()" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;">加时</a></p>
    <!--右下角客服跳转按钮-->
<!--    <div class="fab fab-right-bottom color-purple">
      &lt;!&ndash;1:定义悬浮按钮UI样式&ndash;&gt;
      <a href="/abount/">
        <i class="icon-23453fdf"><img src="../img/kehu.png"></i>

      </a>
    </div>-->
  </f7-page>
</template>
<script>
  import api from '../network'
  export default {
    data() {
      return {
        machNo:this.$f7route.params.machno,
        costTime:'-',
        lastTime:'-',
        deviceState:'-'
      }
    },
    created(){
      const self = this;
      self.queryDeviceMonitor(this.machNo);
    },
    methods:{
      queryDeviceMonitor(param){
        var self = this;
        api.queryDeviceMonitor(param).then(function(res){
          var data = res.data.data;
          self.deviceState = data.deviceState;
          self.costTime = data.costTime;
          self.lastTime = data.lastTime;
        }).catch(function(err){
         console.log(err+'sss')
        })
      },
      getPriceHref(){
        return '/price/machno/' + this.machNo + '/';
      }
    }
  }

</script>
<style type="text/css">
.header-quality{
  width: 100%;
  height: 200px;
  text-align: center;
  background: url("../img/sl.jpg");
}
  .air-quality{
    font-size: 80px;
    color: white;
  }
  .header-quality p{
    font-size: 14px;
    color: white;
  }
  .running-state p{
    font-size: 14px;
    margin-left: 10px;
  }
  .running-state p span{
    margin-left: 10px;
  }
</style>
