<!-- center Page Template -->
<template id="page-center">

  <f7-page>
    <f7-navbar class="header-title" title="我的PM2.5" back-link="" style="background:rgba(255, 255, 255, 0.44);opacity: inherit;"></f7-navbar>
    <div class="header-quality"></div>
    <div class="quality">
      <div class="air-quality">{{pm25}}</div>
      <p class="air-condition">空气状况:{{rank}}</p>
      <p class="health-advice">健康建议:{{tips}}</p>
    </div>
    <div class="running-state">
      <table>
        <tr>
          <td>设备序列号:</td>
          <td><span class="span">{{deviceSequence}}</span></td>
        </tr>
        <tr>
          <td>设备运行状态:</td>
          <td><span class="span">{{onLine}}</span></td>
        </tr>
        <tr>
          <td>设备运行时长:</td>
          <td><span class="span">{{costTime}}</span></td>
        </tr>
        <tr>
          <td>剩余运行时长:</td>
          <td><span class="span">{{lastTime}}</span></td>
        </tr>
      </table>
    </div>
    <p style="margin-top: 50px;"><a :href="getPriceHref()"  class="button button-fill " :class="{disabled: this.onLine != '正常'}"   style="width:90%;margin:0 auto;background:#e94e24;">加时</a></p>
  </f7-page>
</template>
<script>
  import api from '../network'
  import CommonUtils from '@/util/common'
  export default {
    data() {
      return {
        machNo:this.$f7route.params.machno,
        deviceSequence:this.$f7route.params.devicesequence,
        costTime:'-',
        lastTime:'-',
        deviceState:'-',
        onLine:'-',
        pm25:0,
        rank:'-',
        tips:'-'
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
          let data = res.data.data
          if(data != null) {
            self.deviceState = data.deviceState;
            self.costTime = data.costTime;
            self.lastTime = data.lastTime;
            self.pm25 = data.pm25;
            let tipsInfo = CommonUtils.getPm25Grade(self.pm25)
            self.rank = tipsInfo.pm25Val
            self.tips = tipsInfo.pmMsg
            self.onLine = '正常'
          } else {
            self.onLine = '不在线'
          }
        }).catch(function(err){
         console.log(err+'sss')
        })
      },
      getPriceHref(){
        return '/price/machno/' + this.machNo + '/devicesequence/' + this.deviceSequence + '/';
      }
    }
  }

</script>
<style type="text/css">
  .disabled {
    background-color: #ddd;
    border-color: #ddd;
    color: #57a3f3;
    cursor: not-allowed;
  }
  .header-quality{
    width: 100%;
    height: 280px;
    margin-top: -70px;
    text-align: center;
    position: absolute;
    background: url("../img/sl.jpg");
  }
  .quality{
    width: 100%;
    height: 200px;
    color: white;
    text-align: center;
    position: relative;
  }
  .air-quality{
    font-size: 80px;
  }
  .header-quality p{
    font-size: 14px;
  }
  .running-state{
    margin-top: 20px;
  }
  .running-state table{
    margin: auto;
  }
  .running-state table tr td{
    padding-top: 10px;
  }
  .running-state table tr td:nth-child(1){
    text-align: right;
  }
  .running-state table tr td:nth-child(2){
    text-align: left;
  }
  .running-state table tr td span{
    margin-left: 10px;
  }
</style>
