<!-- center Page Template -->
<template id="page-center">
    <f7-page>
      <f7-navbar class="header-title" title="设备列表" back-link="" style="background: #E94E24 !important;"></f7-navbar>
      <f7-list media-list class="no-margin-v" style="margin:0 auto;">
        <ul class="no-border-v">
          <li class="swipeout">
            <div class="item-content-c"  v-for="(item, index) in deviceMonitorList" :key="index">
                <a :href="getDeviceHref(item.machno)"><div class="item-inner">
                  <div class="item-number" >设备编号:{{item.machno}}</div>
                  <div class="item-title-row">
                    <div class="item-remainingTime">剩余时长:{{item.lasttime}}小时</div>
                  </div>
                   <div class="item-span" v-if="item.devicestate != '使用结束'"><span>{{item.devicestate}}</span></div>
                   <div class="item-span-1" v-else><span>{{item.devicestate}}</span></div>
                </div></a>
              </div>
          </li>
        </ul>

      </f7-list >
    </f7-page>
</template>
<script>
import api from '../network'
  export default {
     data() {
      return {
        pageNum:1,
        loading:false,
        deviceMonitorList:[]
      }
    },
    created(){
      const self = this;
      self.getDeviceMonitors();
    },
    methods: {
      getDeviceMonitors(num){
        var self = this;
        var pageNum = num||1;
        var pageSize = 30;

        api.queryDeviceMonitorPage({
          data:{
            customerId:'default'
          },
          page:{
             page:pageNum,
             limit:pageSize
          }
        }).then(function(res){
        var data = res.data.data;
        data.forEach(function(value, index, array){
          self.deviceMonitorList.push(value)
        })
        if(res.list.length < 30){
          self.loading = true
          return;
        }
        self.loading = false
      }).catch(function(err){
        console.log(err+'sss')
      })
    },
    getDeviceHref(val){
      return '/monitor/machno/' + val + '/';
    }
  }
}
</script>
<style type="text/css">
.item-number{
  color: black;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 5px;
}
.item-remainingTime{
  margin-top: 5px;
  margin-left: 5px;
  font-size: 10px;
  color: #BFBFBF;
}
.item-span{
  margin-top: 5px;
  margin-left: 5px;
}
.item-span span{
  color: white;
  font-size: 12px;
  padding: 2px 5px;
  text-align: center;
  border-radius: 4px 4px 4px 4px;
  background: #43CF7C;
}
.item-span-1{
  margin-top: 5px;
  margin-left: 5px;
}
  .item-span-1 span{
    color: white;
    font-size: 12px;
    text-align: center;
    padding: 2px 3px;
    border-radius: 4px 4px 4px 4px;
    background: #FF8D1A;
  }
</style>
