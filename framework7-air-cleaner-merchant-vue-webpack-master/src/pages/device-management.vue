<template>
  <f7-page ptr 
  infinite 
  infinite:infinite-distance="50" 
  :infinite-preloader="showPreloader" 
  @ptr:refresh="onRefresh" 
  @infinite="onInfiniteScroll">
    <f7-navbar title="设备列表" back-link="" style="background:#e94e24;"></f7-navbar>
    <div class="dm-2">
      <div class="dm-3"  v-for="(item, index) in deviceMonitorList" :key="index">
        <dl>
          <dd>商家名称：<span>{{item.tradername}}</span>
					<span v-if="item.devicestate == '正在使用'" style="color: #00d449;float: right;margin-right: 10px;">{{item.devicestate}}</span>
					<span v-else style="color: #D2190B;float: right;margin-right: 10px;">{{item.devicestate}}</span>
					</dd>
          <dd>设备编号：{{item.machno}}</dd>
          <dd>使用时间：<span>{{item.usedate}}</span></dd>
          <dd>使用时长：<span>{{item.costtime}}小时</span></dd>
          <dd>剩余时长：<span>{{item.lasttime}}小时</span></dd>
          <dd>计费金额：<span>{{item.unitprice}}元</span></dd>
        </dl>
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
					type: '',
					traderId: this.$f7route.params.traderId,
					id:'',
					beforRout:this.$f7route.query,
					loadingMore: false,
					loadedEnd: false,
					showPreloader: true,
          deviceMonitorList:[]
        }
      },
      created(){
        const self = this;
				self.init();
        self.getDeviceMonitors();
      },
		mounted() {
			self = this;
			let M_USER_INFO = JSON.parse(localStorage.getItem('M_USER_INFO')) || {}
			if (M_USER_INFO) {
			   self.id = M_USER_INFO.id
				 self.type = M_USER_INFO.userType
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
									traderId:self.traderId,
									investorId:self.id,
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
							console.log(JSON.stringify(data))
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
							self.deviceMonitorList.push(value)
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
					})
				}
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
				console.log(this.loadingMore || this.loadedEnd)
				if (this.loadingMore || this.loadedEnd) return
				this.pageNum++
				this.getDeviceMonitors(this.pageNum)
				this.loadingMore = true
			},
			init(){
				self = this;
				let M_USER_INFO = JSON.parse(localStorage.getItem('M_USER_INFO')) || {}
				if (M_USER_INFO) {
					self.id = M_USER_INFO.id
					self.type = M_USER_INFO.userType
				}
			}
    }
  }
</script>

<style type="text/css">
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

</style>
