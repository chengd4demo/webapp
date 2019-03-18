<template>
  <f7-page ptr 
  infinite 
  infinite:infinite-distance="50" 
  :infinite-preloader="showPreloader" 
  @ptr:refresh="onRefresh" 
  @infinite="onInfiniteScroll">
    <f7-navbar title="收入明细" back-link="" style="background:#e94e24;"></f7-navbar>
  <div class="mv-2">
    <div class="mv-3" v-for="(item, index) in inboundsList" :key="index">
      <dl>
        <dd>付款时间：<span>{{item.createTimeStr}}</span></dd>
        <dd>使用时长：<span>{{item.costTime}}小时</span></dd>
        <dd>计费金额：<span>{{item.unitPrice}}元</span></dd>
		<dd>分润金额：<span>{{item.amount}}元</span></dd>
		<dd v-if="item.type !='商户'">耗材扣除：<span>{{item.costTime | materialCost}}</span></dd>
        <dd>商户类型：<span>{{item.type}}</span></dd>
        <dd v-if="item.type !='商户'"><img src="../img/map.png"><span>{{item.address}}</span></dd>
      </dl>
    </div>
  </div>
  </f7-page>
</template>
<script>
	import api from "../network";
	import CommonUtils from '@/util/common';
	export default {
			data() {
				return {
					pageNum:1,
					loading:false,
					loadingMore: false,
					loadedEnd: false,
					showPreloader: true,
					inboundsList:[]
				}
			},
			created(){
				const self = this;
				self.getInbounds();
			},
			methods: {
				getInbounds(num){
					var self = this;
					var pageNum = num||1;
					var pageSize = 30;
					let M_USER_INFO = JSON.parse(localStorage.getItem('M_USER_INFO')) || {};
					console.log(M_USER_INFO);
					if(M_USER_INFO){
						self.weixin = M_USER_INFO.weixin
					}
					api.queryAccountInbound({
						data:{
							weixin:self.weixin
						},
						page:{
							page:pageNum,
							limit:pageSize
						}
					}).then(function(res){
					var data = res.data.data;
					data.forEach(function(value, index, array){
						self.inboundsList.push(value)
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
			onRefresh(event, done) {
				var self = this
				setTimeout(() => {
					self.inboundsList = []
					self.pageNum = 1
					self.getInbounds(self.pageNum)
					done();
					this.loadedEnd = false
					self.showPreloader = true
				}, 1000)
			},
			onInfiniteScroll() {
				self = this
				if (self.loadingMore || self.loadedEnd) return
				self.pageNum++
				self.getInbounds(self.pageNum)
				self.loadingMore = true
			}
		},
		filters:{
			materialCost: function(value) {
				value = parseFloat(parseInt(value)*0.09).toFixed(3);
				return value.substr(0,value.length-1)
			}
			
		}
	}
</script>

<style type="text/css">
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
		vertical-align: middle;
  }
  .mv-3 dl dd span{
    margin-left: 5px;
    font-size: 12px;
    font-style:normal;
    color: #8A8989;
  }


</style>
