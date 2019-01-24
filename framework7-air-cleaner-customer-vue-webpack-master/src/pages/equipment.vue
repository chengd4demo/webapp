<!-- center Page Template -->
<template id="page-center">
    <f7-page 
      ptr
      infinite
      infinite:infinite-distance="50"
      :infinite-preloader="showPreloader"
      @ptr:refresh="onRefresh"
      @infinite="onInfiniteScroll">
      <f7-navbar class="header-title" title="设备列表" back-link="" style="background: #E94E24 !important;"></f7-navbar>
      <f7-list media-list class="no-margin-v" style="margin:0 auto;">
        <div class="butom-border" style="background-color:white;" v-for="(item, index) in deviceMonitorList" :key="index">
          <a :href="getDeviceHref(item.machno,item.devicesequence)" class="item-link">
            <div class="item-inner">
                <div class="item-number">设备序列号:{{item.devicesequence}}</div>
                <div class="item-title-row">
                  <div class="item-remainingTime">剩余时长:{{item.lasttime}}小时</div>
                </div>
              <div class="item-span" v-if="item.devicestate != '使用结束'"><span>{{item.devicestate}}</span></div>
              <div class="item-span-1" v-else><span>{{item.devicestate}}</span></div>
            </div>
          </a>
        </div>
      </f7-list >
    </f7-page>
</template>
<script>
import api from '../network';
import CommonUtils from '@/util/common';
  export default {
     data() {
      return {
        pageNum:1,
        loading:false,
        loadingMore:false,
        loadedEnd:false,
        showPreloader:true,
        deviceMonitorList:[],
				id:''
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
				let USER_INFO = JSON.parse(localStorage.getItem('USER_INFO')) || {};
					if(USER_INFO){
						self.id = USER_INFO.id
					}
        api.queryDeviceMonitorPage({
          data:{
            customerId:self.id
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
        console.log(data.length)
        if(data.length < 30){
          self.loading = true
          self.loadingMore = true
          self.loadedEnd = true
          self.showPreloader = false
          return;
        }
        self.loading = false
        self.loadingMore = false
      }).catch(function(err){
        console.log(err+'sss')
      })
    },
    getDeviceHref(machNo,deviceSequence){
      return '/monitor/machno/' + machNo + '/deviceSequence/' + deviceSequence + '/';
    },
    onRefresh(event,done){
      var self = this
      setTimeout(() => {
       self.deviceMonitorList = []
       self.pageNum = 1
       self.getDeviceMonitors(self.pageNum)
       done();
       this.loadedEnd = false
       self.showPreloader = true
      },1000)
    },
    onInfiniteScroll(){
     if (this.loadingMore || this.loadedEnd) return
     this.pageNum++
     this.getDeviceMonitors(this.pageNum)
     this.loadingMore = true
    }
  }
}
</script>
<style type="text/css">
.item-number{
  color: black;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 15px;
}
.item-remainingTime{
  margin-top: 5px;
  margin-left: 15px;
  font-size: 10px;
  color: #BFBFBF;
}
.item-span{
  margin-top: 5px;
  margin-left: 15px;
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
  margin-left: 15px;
}
  .item-span-1 span{
    color: white;
    font-size: 12px;
    text-align: center;
    padding: 2px 3px;
    border-radius: 4px 4px 4px 4px;
    background: #FF8D1A;
  }
  .butom-border{
    border-bottom: 1px solid #EFEFEF;
  }
</style>
