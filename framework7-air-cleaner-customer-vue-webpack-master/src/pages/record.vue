<template>
  <f7-page>
    <f7-navbar class="header-title" title="使用记录" back-link="" style="background: #E94E24 !important;"></f7-navbar>
    <div class="record-list" v-for="(item,index) in deviceMonitorList" :key="index">
      <p class="record-list-p">使用时间：{{item.usedate}}</p>
      <p class="record-list-p">使用时长：{{item.costtime}}小时</p>
      <p class="record-list-p">计费金额：{{item.unitprice}}元</p>
      <div class="record-list-map">
        <img src="../img/map.png"><i>{{item.address}}</i>
      </div>
    </div>

  </f7-page>
</template>
<style>
  .header-title{
    background: #F5422E;
  }
  .record-list{
    width: 95%;
    height: 150px;
    padding-top: 2px;
    margin: 10px auto;
    background: #EFE8E8;
  }
  .record-list-p{
    margin-left: 10px;
  }
  .record-list-map{
    margin-left: 15px;
  }
  .record-list-map img{
    width: 15px;
    height: 15px;
  }
  .record-list-map i{
    margin-left: 5px;
    font-size: 12px;
    font-style:normal;
    color: #8A8989;
  }
</style>
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
