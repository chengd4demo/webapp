<template>
	<f7-page ptr infinite infinite:infinite-distance="50" :infinite-preloader="showPreloader" @ptr:refresh="onRefresh"
	 @infinite="onInfiniteScroll">
		<f7-navbar title="提现记录" back-link="" style="background:#e94e24;">
			<f7-subnavbar style="background:#f7f7f8;color:black">
				<f7-link id="tab-request" tab-link="#tab1" style="color:#e94e24;list-style-type:none;border-bottom: 3px solid #e94e24;"
				 active @click="clickState('request')">已申请</f7-link>
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
						<div class="dm-3" v-for="(item, index) in requestList" :key="index">
							<dl>
								<dd><span>{{item.amount}}元</span><span style="float: right;margin-right:10px">{{item.createdate}}</span></dd>
								<dd><span>实际到账:{{item.amount | relAmount}}元</span>
									<span style="float: right;" v-if="item.showbutton">
										<input @click="cancelBtn({id:item.id}) " class="open-confirm" type="button" style="background-color: #FFFFFF;padding: -1px 10px 0px 1px; margin-right: 10px;border:1px solid #38373d; border-radius: 4px 4px ;"
										 value="取消" />
									</span>
								 </dd>
								<dd>
									<span>代扣税金:{{item.amount | withholdingAmount}}元</span>
									<div style="float: right;">
										<span  style="color:#FFFFFF;padding: 1px 7px;margin-right: 10px;background-color:#2094ff; border-radius: 4px 4px ;">{{item.state}}</span>
									</div>
								</dd>	
							</dl>
						</div>
					</div>
				</div>
				<div class="tab" id="tab2">
					<div class="dm-2">
						<div class="dm-3" v-for="(item, index) in uncollectedList" :key="index">
							<dl>
								<dd><span>{{item.amount}}元</span><span style="float: right;;margin-right:10px">{{item.createdate}}</span></dd>
								<dd><span>返还到账:{{item.amount}}元</span><span style="margin-left: 10px; color: #9e9e9e;">提现金额超过24小时未领取!</span>
								<div style="float: right;">
									<span  style="color:#FFFFFF;padding: 1px 7px;margin-right: 10px;background-color:#d43030; border-radius: 4px 4px ;">{{item.state}}</span>
								</div>
								</dd>	
							</dl>
						</div>
					</div>
				</div>
				<div class="tab" id="tab3">
					<div class="dm-2">
						<div class="dm-3" v-for="(item, index) in cancelledList" :key="index">
							<dl>
								<dd><span>{{item.amount}}元</span><span style="float: right;;margin-right:10px">{{item.createdate}}</span></dd>
								<dd><span>实际到账:{{item.amount | relAmount}}元</span><dd>
								<dd><span>代扣税金:{{item.amount | withholdingAmount}}元</span>
								<div style="float: right;">
									<span  style="color:#FFFFFF;padding: 1px 7px;margin-right: 10px;background-color:#a6a6a6; border-radius: 4px 4px ;">{{item.state}}</span>
								</div>
								</dd>	
							</dl>
						</div>
					</div>
				</div>
				<div class="tab" id="tab4">
					<div class="dm-2">
						<div class="dm-3" v-for="(item, index) in completedList" :key="index">
							<dl>
								<dd><span>{{item.amount}}元</span><span style="float: right;;margin-right:10px">{{item.createdate}}</span></dd>
								<dd><span>实际到账:{{item.amount | relAmount}}元</span><dd>
								<dd><span>代扣税金:{{item.amount | withholdingAmount}}元</span>
								<div style="float: right;">
									<span  style="color:#FFFFFF;padding: 1px 7px;margin-right: 10px;background-color:#43cf7c; border-radius: 4px 4px ;">{{item.state}}</span>
								</div>
								</dd>	
							</dl>
						</div>
					</div>
				</div>
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
				pageNum: 1,
				loading: false,
				weixin:this.$f7route.params.weixin,
				amount:0.00,
				createdate:'',
				id: '',
				beforRout: this.$f7route.query,
				loadingMore: false,
				loadedEnd: false,
				showPreloader: true,
				requestList: [],
				uncollectedList: [],
				cancelledList:[],
				completedList:[],
				params:{
					data: {
						weixin:'',
						state:0,
					},
					page: {
						page: 1,
						limit: 30
					}
				}
			}
		},
		created() {
			const self = this;
			self.init();
			self.getAccountOutBoundPages(self.params);
		},
		mounted() {
			self = this;
			let M_USER_INFO = JSON.parse(CommonUtils.localStorage.getItem('M_USER_INFO')) || {}
			if (M_USER_INFO) {
				self.id = M_USER_INFO.id
				self.params.data.weixin = M_USER_INFO.weixin
			}
		},
		filters:{
			withholdingAmount : function(value) {
				value = parseFloat(value*5/100).toFixed(3);
				return value.substr(0,value.length-1)
			},
			relAmount : function(value) {
				value = parseFloat(value-value*5/100).toFixed(3);
				return value.substr(0,value.length-1)
			}
			
		},
		methods: {
				cancelBtn(args){
					console.log(args.id);
					const self = this;
					const app = self.$f7;
					const router = self.$f7router;
					app.params.dialog.PreloaderTitle = '加载中...'
					app.params.dialog.buttonCancel = '<span style="color:black">取消</span>'
					app.params.dialog.buttonOk = '<span style="color:black">确定</span>'
					app.dialog.confirm('','确定取消？', (confirm) =>{
								api.cleanAccountOutbound(args.id).then(function(res){
									let data = res.data.data;
									if(res.data.status === '200'){
										self.onRefresh();
										self.alertMsg('取消成功！');
									}else{
										self.onRefresh();
										self.alertMsg(res.data.description);
									}
								}).catch(err=>{
									self.alertMsg('服务器连接失败!');
								})
							});
					},
					
					alertMsg( msg ) {
					  let toastTop = this.$f7.toast.create({
					    text: msg,
					    position: 'top',
					    closeTimeout: 1000,
					  })
					  toastTop.open();
					},

			getAccountOutBoundPages(parames) {
				var self = this;
				console.log('methods ==> ' + parames)
					api.queryAccountOutBoundPage(parames).then(function(res) {
						var data = res.data.data;
						if(parames.data.state === 0)
						data.forEach(function(value, index, array) {
							self.requestList.push(value)
						})
						if(parames.data.state === 1)
						data.forEach(function(value, index, array) {
							self.uncollectedList.push(value)
						})
						if(parames.data.state === 2)
						data.forEach(function(value, index, array) {
							self.cancelledList.push(value)
						})
						if(parames.data.state === 3)
						data.forEach(function(value, index, array) {
							self.completedList.push(value)
						})
						if (data.length < 30) {
							self.loading = true
							self.loadingMore = true
							self.loadedEnd = true
							self.showPreloader = false
							return;
						}
						self.loading = false
						self.loadingMore = false
					}).catch(function(err) {
						console.log(err + 'sss')
					})
				
			},
			onRefresh(event, done) {
				var self = this
				setTimeout(() => {
					if (self.params.data.state ==0) {
						self.requestList = []
					} else if (self.params.data.state ==1) {
						self.uncollectedList = []
					} else if (self.params.data.state ==2) {
						self.cancelledList = []
					} else if (self.params.data.state ==3) {
						self.completedList = []
					}
					self.getAccountOutBoundPages(self.params)
					if(done!=undefined){
						done();
					}
					this.loadedEnd = false
					self.showPreloader = true
				}, 1000)
			},
			onInfiniteScroll() {
				if (this.loadingMore || this.loadedEnd) return
				this.params.page.page = this.pageNum++
				this.getAccountOutBoundPages(self.params)
				this.loadingMore = true
			},
			init() {
				self = this;
				let M_USER_INFO = JSON.parse(CommonUtils.localStorage.getItem('M_USER_INFO')) || {}
				if (M_USER_INFO) {
					self.id = M_USER_INFO.id
				}
			},
			clickState(e) {
				this.$$('.subnavbar-inner a').css('color', 'black').css('border-bottom', 'none')
				if ('request' == e) {
					this.$$('#tab-request').css({
						'color': '#e94e24',
						'border-bottom': '3px solid #e94e24'
					})
					this.params.data.state = 0
					this.requestList = []
					this.getAccountOutBoundPages(this.params);
				}
					
				if ('uncollected' == e) {
					this.$$('#tab-uncollected').css({
						'color': '#e94e24',
						'border-bottom': '3px solid #e94e24'
					})
					this.params.data.state = 1
					console.log(this.params)
					this.uncollectedList = []
					this.getAccountOutBoundPages(this.params);
				}
					
				if ('cancelled' == e) {
					this.$$('#tab-cancelled').css({
						'color': '#e94e24',
						'border-bottom': '3px solid #e94e24'
					})
					this.params.data.state = 2
					this.cancelledList = []
					this.getAccountOutBoundPages(this.params);
				}
					
				if ('completed' == e) {
					this.$$('#tab-completed').css({
						'color': '#e94e24',
						'border-bottom': '3px solid #e94e24'
					})
					this.params.data.state = 3
					this.completedList = []
					this.getAccountOutBoundPages(this.params);
				}
					
			}
		}
	}
</script>
<style>
	dd {
		font-size: 12px;
		line-height: 25px;
	}

	dl {
		margin-left: -40px;
	}

	.dm-2 {
		width: 100%;
		margin: 10px auto;
	}

	.dm-3 {
		width: 90%;
		margin: 0px auto;
		text-indent: 10px;
		background: #EEEDED
	}

	.md .subnavbar a.link {
		max-width: 25%;
		font-size: 13px;
	}

	.ios .subnavbar-inner a {
		color: black;
	}
</style>
