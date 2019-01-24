<template>
  <f7-page
    ptr
    infinite
    infinite:infinite-distance="50"
    :infinite-preloader="showPreloader"
    @ptr:refresh="onRefresh"
    @infinite="onInfiniteScroll">
    <f7-navbar class="header-title" title="使用记录" back-link="" style="background: #E94E24 !important;"></f7-navbar>
    <div class="mv-2">
      <div class="mv-3" v-for="(item,index) in recordList" :key="index">
        <dl>
          <dd>使用时间：{{item.usedate}}</dd>
          <dd>使用时长：{{item.costtime}}小时</dd>
          <dd>计费金额：{{item.unitprice}}元</dd>
          <dd><img src="../img/map.png" style="vertical-align: middle"><i>{{item.address}}</i></dd>
        </dl>
      </div>
    </div>

  </f7-page>
</template>
<style>
  dd{
    font-size: 12px;
    line-height: 25px;
		word-break:keep-all;/* 不换行 */
		white-space:nowrap;/* 不换行 */
		overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
		text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  dl{
    margin-left: -40px;
  }
  .mv-2{
    width: 100%;
    margin:10px auto;
  }
  .mv-3{
    width: 90%;
    margin: 0px auto;
    text-indent: 10px;
    background: #EEEDED
  }
  .mv-3 dl dd img{
    width: 13px;
    height: 13px;
  }
  .mv-3 dl dd i{
    margin-left: 5px;
    font-size: 12px;
    font-style:normal;
    color: #8A8989;
  }

  .header-title{
    background: #F5422E;
  }
  
</style>
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
        recordList:[],
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
            self.recordList.push(value)
          })
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
      getDeviceHref(val){
        return '/monitor/machno/' + val + '/';
      },
      onRefresh(event,done){
        var self = this
        setTimeout(() => {
          self.recordList = []
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
