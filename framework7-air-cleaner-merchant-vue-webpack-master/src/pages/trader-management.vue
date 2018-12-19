<template>
	<f7-page ptr 
	infinite 
	infinite:infinite-distance="50" 
	:infinite-preloader="showPreloader" 
	@ptr:refresh="onRefresh" 
	@infinite="onInfiniteScroll">
		<f7-navbar title="商家管理" back-link="" style="background:#e94e24;"></f7-navbar>
		<f7-list media-list class="no-margin-v" style="margin-top:1px">
			<ul class="no-border-v">
				<li v-for="(item, index) in deviceMonitorList" :key="index">
					<a :href='getManagementHref(item.traderid)' class="item-link">
						<div class="item-content" style="border-bottom: 1px solid #CDCDCD;">
							<div class="item-media">
								<img src='http://img.mp.itc.cn/upload/20170727/50ff47cacfb148fb95939512df6cb5d4_th.jpg' style="max-width:80px;max-height:800px;border-radius:50%">
								<i class="icon fa fa-opencart  color-white align-center" style="font-size: 36px;width: 60px;height: 60px;line-height: 60px;border-radius: 50%;"></i>
							</div>
							<div class="item-inner" style="margin-top: -10px">
								<div class="item-title">&nbsp;</div>
								<div class="item-title-row">
									<div class="item-subtitle item-title" style="margin-left:-55px">{{item.name}}</div>
								</div>
								<div class="item-subtitle" style="margin-left:-55px"><span>共{{item.count}}台</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>运行{{item.usecount}}台</span></div>
								<div class="item-subtitle" style="margin-top:10px;margin-left:-120px;max-width:150% !important;"><img src="../img/map.png"
									 style="max-width: 15px;max-height: 15px;vertical-align: middle" />
									<span>{{item.address}}</span></div>
							</div>
						</div>
					</a>
				</li>
			</ul>
		</f7-list>
	</f7-page>
</template>
<script>
	import api from "../network";
	export default {
		data() {
			return {
				pageNum: 1,
				loading: false,
				loadingMore: false,
				loadedEnd: false,
				showPreloader: true,
				deviceMonitorList: []
			}
		},
		created() {
			const self = this;
			self.getDeviceMonitors();
		},
		methods: {
			getDeviceMonitors(num) {
				var self = this;
				var pageNum = num || 1;
				var pageSize = 30;

				api.queryInvestorForTrader({
					data: {
						investorId: '911D3482E72B4AC3B208AD627430689D'
					},
					page: {
						page: pageNum,
						limit: pageSize
					}
				}).then(function(res) {
					var data = res.data.data;
					data.forEach(function(value, index, array) {
						self.deviceMonitorList.push(value)
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
			getManagementHref(val) {
				return '/device-management/traderId/' + val + '/?foo=trader#bar';
			},
			onRefresh(event, done) {
				var self = this
				setTimeout(() => {
					self.deviceMonitorList = []
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
			}
		}
	}
</script>
