<template>
  <f7-page>
    <f7-navbar title="设备列表" back-link="" style="background:#e94e24;"></f7-navbar>
    <div class="dm-2">
      <div class="dm-3"  v-for="(item, index) in deviceMonitorList" :key="index">
        <dl>
          <dd>商家名称：<span>{{item.tradername}}</span>
					<span v-if="item.devicestate == '正在使用'" style="color: #00d449;float: right;margin-right: 10px;">{{item.devicestate}}</span>
					<span v-else style="color: #D2190B;float: right;margin-right: 10px;">{{item.devicestate}}</span>
					</dd>
          <dd>设备标号：{{item.machno}}</dd>
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
					type: 'TR',
					traderId: this.$f7route.params.traderId,
					beforRout:this.$f7route.query,
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
					if(self.beforRout.foo != 'center'){	//判断路由跳转
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
								self.deviceMonitorList.push(value)
							})
							if(data.length < 30){
								self.loading = true
								return;
							}
							self.loading = false
						}).catch(function(err){
							console.log(err+'sss')
						})
				} else {
						api.queryDeviceMonitorPage({
							data:{
								investorId:'911D3482E72B4AC3B208AD627430689D'
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
							return;
						}
						self.loading = false
					}).catch(function(err){
						console.log(err+'sss')
					})
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
