<template>
	<f7-page ptr 
	infinite 
	infinite:infinite-distance="50" 
	:infinite-preloader="showPreloader" 
	@ptr:refresh="onRefresh" 
	@infinite="onInfiniteScroll">
	<f7-navbar title="提现记录" back-link="" style="background:#e94e24;">
		<f7-subnavbar style="background:#f7f7f8;color:black">
			<f7-link id="tab-request" tab-link="#tab1"  style="color:#e94e24;list-style-type:none;border-bottom: 3px solid #e94e24;" active @click="clickState('request')">已申请</f7-link>
				<f7-link id="tab-uncollected" tab-link="#tab2" @click="clickState('uncollected')">未领取</f7-link>
				<f7-link id="tab-cancelled" tab-link="#tab3" @click="clickState('cancelled')">已取消</f7-link>
				<f7-link id="tab-completed" tab-link="#tab4" @click="clickState('completed')">已完成</f7-link>
	</f7-subnavbar>
	</f7-navbar>
		
		<!--内容-->
		<div>
			<div class="tabs">
				<div class="tab tab-active" id="tab1">
					<div class="dm-2">
						<div class="dm-3"  v-for="(item, index) in requestList" :key="index">
							<dl>
								<span v-if="item.devicestate == '正在使用'" style="color: #00d449;float: right;margin-right: 10px;">{{item.devicestate}}</span>
								<span v-else style="color: #D2190B;float: right;margin-right: 10px;">{{item.devicestate}}</span>
								</dd>
								<dd>申请时间：<span>{{item.usedate}}</span></dd>
								<dd>金额：<span>{{item.unitprice}}元</span></dd>
							</dl>
						</div>
					</div>
				</div>
			
					<div class="tab" id="tab2">
						<div class="dm-2">
							<div class="dm-3"  v-for="(item, index) in uncollectedList" :key="index">
								<dl>
									<span v-if="item.devicestate == '正在使用'" style="color: #00d449;float: right;margin-right: 10px;">{{item.devicestate}}</span>
									<span v-else style="color: #D2190B;float: right;margin-right: 10px;">{{item.devicestate}}</span>
									</dd>
									<dd>过期时间：<span>{{item.usedate}}</span></dd>
									<dd>金额：<span>{{item.unitprice}}元</span></dd>
								</dl>
							</div>
						</div>
					</div>
				<div class="tab" id="tab3">更新中</div>
				<div class="tab" id="tab4">下一版</div>
			</div>
		</div>
	</f7-page>
</template>
<script>
	import api from "../network";
	export default {
data() {
        return {
          pageNum:1,
          loading:false,
					type: 'CR',
					traderId: this.$f7route.params.traderId,
					id:'',
					beforRout:this.$f7route.query,
					loadingMore: false,
					loadedEnd: false,
					showPreloader: true,
          requestList:[],
					uncollectedList:[]
					
        }
      },
      created(){
        const self = this;
				self.init();
        self.getDeviceMonitors();

		
      },
			mounted() {
				self = this;
				let USER_INFO = JSON.parse(localStorage.getItem('USER_INFO')) || {}
				if (USER_INFO) {
				   self.id = USER_INFO.id
					 self.type = USER_INFO.userType
				}
			},
      methods: {
        getDeviceMonitors(num){
          var self = this;
          var pageNum = num||1;
          var pageSize = 30;
					if (self.beforRout.foo == 'trader') {	//判断路由跳转
					
							api.queryDeviceMonitorPage({
								data:{
									traderId:self.traderId
								},
								page:{
									 page:pageNum,
									 limit:pageSize
								}
							}).then(function(res){
							var data = res.data.data;
							data.forEach(function(value, index, array){
								self.requestList.push(value)
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
				} else {
					  let data = {}
						if (self.type == "TR") {
							data = {
								data:{
									traderId:self.id
								},
								page:{
									page:pageNum,
									limit:pageSize
								}
							}
						} else if(self.type == "IR") {
							data = {
								data:{
									investorId:self.id
								},
								page:{
									page:pageNum,
									limit:pageSize
								}
							}
						} else if(self.type == "CY") {
							data = {
								data:{
									companyId:self.id
								},
								page:{
									page:pageNum,
									limit:pageSize
								}
							}
						}
						api.queryDeviceMonitorPage(data).then(function(res){
						var data = res.data.data;
						data.forEach(function(value, index, array){
							self.requestList.push(value)
						})
						if(data.length < 30){
							self.loading = true
							self.loadingMore = true
							self.loadedEnd = true
							self.showPreloader = false
							return;
						}
						self.loading = false
					}).catch(function(err){
						console.log(err+'sss')
					})
				}
      },
			onRefresh(event, done) {
				var self = this
				setTimeout(() => {
					self.requestList = []
					self.pageNum = 1
					self.getDeviceMonitors(self.pageNum)
					done();
					this.loadedEnd = false
					self.showPreloader = true
				}, 1000)
			},
			onInfiniteScroll() {
				if (this.loadingMore || this.loadedEnd) return
				this.pageNum++
				this.getDeviceMonitors(this.pageNum)
				this.loadingMore = true
			},
			init(){
				self = this;
				let USER_INFO = JSON.parse(localStorage.getItem('USER_INFO')) || {}
				if (USER_INFO) {
					self.id = USER_INFO.id
					self.type = USER_INFO.userType
				}
			},
			clickState(e){
				this.$$('.subnavbar-inner a').css('color','black').css('border-bottom','none')
				if('request' == e)  
				this.$$('#tab-request').css({
					'color':'#e94e24',
					'border-bottom':'3px solid #e94e24'
				})
				
				if('uncollected' == e)
				this.$$('#tab-uncollected').css({
					'color':'#e94e24',
					'border-bottom':'3px solid #e94e24'
				})
				if('cancelled' == e) 
				this.$$('#tab-cancelled').css({
					'color':'#e94e24',
					'border-bottom':'3px solid #e94e24'
				})
				if('completed' == e)
					this.$$('#tab-completed').css({
						'color':'#e94e24',
						'border-bottom':'3px solid #e94e24'
					})
			}
    }
	}
</script>
<style>
	dd{
		font-size: 12px;
		line-height: 25px;
	}
	dl{
		margin-left: -40px;
	}
	.dm-2{
		width: 100%;
		margin:10px auto;
	}
	.dm-3{
		width: 90%;
		margin: 0px auto;
		text-indent: 10px;
		background: #EEEDED
	}
	.md .subnavbar a.link{
		max-width: 25%;
		font-size:13px;
	}
	.ios .subnavbar-inner a{
		color:black;
	}
</style>