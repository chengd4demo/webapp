<!-- center Page Template -->
<template id="page-center">
	<f7-page>
		<f7-navbar title="个人中心" style="background:#e94e24;"></f7-navbar>
		<f7-list media-list class="no-margin-v" style="margin-top:1px">
			<ul class="no-border-v">
				<li>
					<a href="/personal-information/" class="item-link">
						<div class="item-content" style="background-color:#E94E24;">
							<div class="item-media">
								<img :src='headUrl' style="max-width:80px;max-height:800px;border-radius:50%">
								<i class="icon fa fa-opencart bg-red color-white align-center" style="font-size: 36px;width: 60px;height: 60px;line-height: 60px;border-radius: 50%;"></i>
							</div>
							<div class="item-inner" style="margin-top: -10px">
								<div class="item-title">&nbsp;</div>
								<div class="item-title-row">
									<div class="item-subtitle item-title" style="margin-left:-55px;color:white">&nbsp;{{nickName}}</div>
								</div>
								<div id = 'amountId' class="item-subtitle item-title" style="margin-left:-55px;color:white">¥{{amount}}</div>
							</div>
						</div>
					</a>
				</li>
			</ul>
		</f7-list>

		<f7-row>
			<div class="center-1">
				<div class="center-item">
					<a style="color: #000" href="/inbound/">
						<div class="center-item-image "><img src="../img/zb.png" style="max-height: 32px;max-width: 32px"></div>
						<div class="center-item-title">收入记录</div>
					</a>
				</div>
				<div class="center-item">
					<a style="color: #000" href="/outbound/">
						<div class="center-item-image"><img src="../img/txjl.png" style="max-height: 32px;max-width: 32px"></div>
						<div class="center-item-title">提现记录</div>
					</a>
				</div>
				<div class="center-item-last">
					<a style="color: #000" :href='getHref(amount,availableAmount)'>
						<div class="center-item-image"><img src="../img/sqtx.png" style="max-height: 32px;max-width: 32px"></div>
						<div class="center-item-title">申请提现</div>
					</a>
				</div>
			</div>
		</f7-row>
		
		<!--说明--上-->
		<div class="explainUp">
		  <span>今日设备使用概况</span>
		  <span>不在线</span>
		  <span><img src="../img/deviceState1.svg"></span>
		  <span>在线</span>
		  <span><img src="../img/deviceState.svg"></span>
		</div>
		<!--轮播-->
		<f7-swiper>
		  <f7-swiper-slide id="slideId">
		    <div  class="col-25" :id="item.machno" style="width:24%;float: left;border: 1px solid #C5C5C5;margin-top: -1px;margin-left: -1px;" v-if="index<12" v-for="(item, index) in deviceStatusList" :key="index">
		      <div style="float: left;height: 25px">
		        <img  src="../img/deviceState1.svg" style="width: 25px;margin-top: -10px">
		      </div>
		      <div style="margin-top: 5px;margin-right: 15px;">
		        {{item.counts}}
		      </div>
		      <div style="font-size: 8px;margin-top: 5px;">
		        {{item.devicesequence}}
		      </div>
		    </div>
		  </f7-swiper-slide>
		</f7-swiper>
		<!--说明--下-->
		<div class="explainDown">
		  <span>向左滑动查看更多</span>
		</div>
		
		<f7-list media-list class="no-margin-v" style="margin-top:1px">
			<ul>
				<li class="media-item" icon="home"><a href="/trader-management/" class="item-link" v-if="type==='IR' || type==='CR'">
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title"><img src="../img/traders.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;商家管理</div>
								</div>
							</div>
						</div>
					</a></li>
				<li class="media-item"><a href="/device-management/traderId/unfidend/?foo=center#bar" class="item-link">
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title"><img src="../img/device.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;设备管理</div>
								</div>
							</div>
						</div>
					</a></li>
				<li class="media-item"><a href="#" class="item-link">
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title"><img src="../img/saler.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;促销员管理</div>
								</div>
							</div>
						</div>
					</a></li>
				<li class="media-item"><a href="/safety/" class="item-link">
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title"><img src="../img/anquan.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;安全</div>
								</div>
							</div>
						</div>
					</a></li>
				<li class="media-item"><a href="#" class="item-link">
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title"><img src="../img/message.png" style="max-width: 15px;max-height: 15px;vertical-align: middle" />&nbsp;信息</div>
									<div class="item-after"><span class="badge color-red">5</span></div>
								</div>
							</div>
						</div>
					</a></li>
			</ul>
		</f7-list>
	</f7-page>
</template>
<script>
	import api from "../network"
	import config from '@/util/config'
	import CommonUtils from '@/util/common'
	import Swiper from 'swiper'
	const swiper = null;
	export default {
    data(){
      return{
        type:'',
        nickName:'',
        headUrl:'',
        amount:0,//可用余额
        availableAmount:0,
        items:1,
        pageNum:1,
        deviceStatusList:[],
        userId:'',
        state:0,
        loadedEnd:true,
        reqParames:{},
        changeImageFlg:false
      }
    },
		mounted(){
			self = this;
			let weixin = localStorage.getItem('weixin') || config.wxUserInfo.openid
			if (weixin) {
			  self.weixin = weixin
			  self.init()
			  self.swiper = new Swiper('.swiper-container',{
			    on: {
			      touchEnd:function() {
			        if (self.changeImageFlg) {
			          let nextOrPrev = self.getDecoration();
			          if (nextOrPrev == 'next' && !self.loadedEnd) {
			            self.pageNum += 1
			          } else if (self.pageNum > 1 && nextOrPrev == 'prev') {
			            self.pageNum -= 1
			          } else {
			            return
			          }
			          self.reqParames = self.getDeviceStateCountReqParames(self.type)
			          self.queryDeviceStateCountPage(self.reqParames)
			          setTimeout(() => {
			            self.changeImage()
			          }, 1500)
			          self.changeImageFlg = false
			        }
			      }
			    },
			  })
			} else{
			  self.alertMsg('网络连接超时')
			  return
			}
		},
		methods:{
			init(){
				const self = this;
				self.resarchUserInfo(self.weixin)
			},
			queryAccount(weixin){
				const self = this;
				if(weixin)
				api.queryAccount(weixin).then(res =>{
					if(res.data.description === 'success') {
						let data = res.data.data;
						self.amount = data.totalAcmount
						self.availableAmount = data.availableAmount
						config.cashAmount.cashTotalAcmount =data.totalAcmount
						config.cashAmount.cashAvailableAmount = data.availableAmount
						let num = 0;
						var t = setInterval(function(){
						   num++;
							self.amount = num
						   if(self.amount>=self.availableAmount){
								clearInterval(t);
								self.amount =Number(self.availableAmount.toString().match(/^\d+(?:\.\d{0,2})?/))  ;
						   }else{
							   self.amount = num 
						   }       
						},1);
					}
				}).catch(err => {
					
				})				
			},
			resarchUserInfo(weixin) {
			  let self = this;
			  api.queryUserInfo(weixin).then(res=>{
			    let data = res.data.data;
			    if(res.data.status == '200' && data){
			      let M_USER_INFO = JSON.parse(localStorage.getItem('M_USER_INFO')) || {}
			      data.weixin = self.weixin
			      data.name = config.wxUserInfo.nickname
			      self.nickName = data.nickName || data.name
			      self.type = data.userType
			      self.userId = data.id
			      data.headerUrl = config.wxUserInfo.headimgurl || M_USER_INFO.headerUrl
			      self.headUrl = config.wxUserInfo.headimgurl || M_USER_INFO.headerUrl
			      localStorage.setItem('M_USER_INFO',JSON.stringify(data))
			      self.queryAccount(self.weixin)
			      self.reqParames = self.getDeviceStateCountReqParames(self.type)  //获取设备使用状况请求参数
			      self.queryDeviceStateCountPage(self.reqParames) //获取设备设用状况
			      setTimeout(() => {self.changeImage()},1500) //更新设备运行状态
			    }else{
			      localStorage.removeItem('weixin')
			      localStorage.removeItem('M_USER_INFO')
			      location.reload()
			    }
			  }).catch(err => {
			    alert('系统繁忙')
			  })
			},
			alertMsg(msg){
				let toastTop = this.$f7.toast.create({
				  text: msg,
				  position: 'top',
				  closeTimeout: 1000,
				})
				toastTop.open();
			},
			getHref(amount,availableAmount) {
				return '/cash/availableAmount/' + availableAmount + '/totalAcmount/' + amount+'/';
			},
			queryDeviceStateCountPage(parames){
			  let self = this
			  api.queryDeviceStatusCountPage(parames).then(res=>{
			    if (res.data.status=='200') {
			      let data = res.data.data;
			      if(data.length >0 && data.length ==12) {
			        self.loadedEnd = false
			      } else {
			        self.loadedEnd = true
			      }
			      if (data) {
			        self.deviceStatusList = data
			      }
			    } else {
			      this.alertMsg('服务器繁忙,获取数据失败')
			    }
			  }).catch(err=>{
			      this.alertMsg('服务器繁忙')
			    }
			  )
			},
			getDecoration() {
			  return self.swiper.swipeDirection == undefined ? 'next' :  self.swiper.swipeDirection
			},
			 queryDeviceUsedStatus : function(imageHtml,machNo){
			  if (machNo.length ==0) {
			    return
			  }
			  api.queryDeviceUsedStatus(machNo).then(res => {
			    if(res.data.status = '200') {
			      if(res.data.data==1) {
			        imageHtml.src = '/app/merchant/images/deviceState.2eac587.svg'
			      } else {
			        imageHtml.src = '/app/merchant/images/deviceState1.5df8c33.svg'
			      }
			    }
			  }).catch(err => {
			    console.log('查询设备状态异常')
			  })
			},
			changeImage:function(){
			  let self = this
			  let slideDom = self.$$('#slideId')
			  let imageDom = slideDom.find('div img')
			  if (imageDom != undefined && imageDom.length > 0) {
			    let machNo = ''
			    for(let i=0;i<imageDom.length;i++){
			      machNo = slideDom.children()[i].getAttribute("id")
			      if (machNo != null) {
			        self.queryDeviceUsedStatus(imageDom[i],machNo)
			      }
			    }
			    self.changeImageFlg = true
			  }
			},
			getDeviceStateCountReqParames:function(type) {
			  let self = this
			  if (type == 'TR') {
			    return {
			      data:{
			        traderId:self.userId,
			        investorId:'',
			        companyId:''
			      },
			      page:{
			        page:self.pageNum,
			        limit:12
			      }
			    }
			  } else if(type == 'IR') {
			    return  {
			      data:{
			        traderId:'',
			        investorId:self.userId,
			        companyId:''
			      },
			      page:{
			        page:self.pageNum,
			        limit:12
			      }
			    }
			  }  else if(type == 'CY') {
			    return {
			      data:{
			        traderId:'',
			        investorId:'',
			        companyId:self.userId
			      },
			      page:{
			        page:self.pageNum,
			        limit:12
			      }
			    }
			  }
			}
		}
  }
</script>
<style type="text/css">
	img {
		width: 50px;
		height: 50px;
	}

	.ios .media-list .item-title,
	.ios li.media-item .item-title {
		font-weight: normal;
		font-size: 14px;
		color: #111;
	}

	

	.center-1 {
		width: 100%;
		height: 80px;
		margin-top: -28px;
		display: flex;
		background: gray;
	}

	.center-item {
		width: 34%;
		height: 80px;
		text-align: center;
		background: white;
		border-right: 1px solid #CDCDCD;
	}

	.center-item-last {
		width: 34%;
		height: 80px;
		text-align: center;
		background: white;
		border: none
	}

	.center-item-image {
		width: 40px;
		height: 40px;
		margin: 5px auto;

	}

	.center-item-title {
		width: 100%;
	}
	
	.ios .icon-back,
  .ios .icon-prev {
    width: 12px;
    height: 20px;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D'12'%20height%3D'20'%20viewBox%3D'0%200%2012%2020'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20d%3D'M.18261596%209.4221638c.0352203-.05148305.07573462-.10050698.1215468-.14631917L9.1425872.4374202c.5830904-.58309038%201.52656832-.5849888%202.11643872.00488163.5857864.58578644.591222%201.53009836.0048816%202.11643873L3.82594417%209.9967039l7.43188553%207.4318855c.5830904.5830904.5849888%201.5265683-.0048817%202.1164387-.5857864.5857865-1.5300983.591222-2.11643868.0048816L.2980849%2010.7114853c-.3526746-.3526746-.3939974-.89699-.11546894-1.2893215z'%20fill%3D'%23ffffff'%20fill-rule%3D'evenodd'%2F%3E%3C%2Fsvg%3E");
  }
   /*轮播*/
  .swiper-container{
    min-height: 20%;
    text-align: center;
    padding-left: 2.3%;
  }
  .ks-swiper-gallery-top{
    height: 30%;
  }
  .swiper-wrapper {
    margin-left: 1px;
    margin-top: 3px;
  }
  
  .ios .row .col-25 {
    width: 25%;
    /* width: calc((100% - 15px*3) / 4); */
  }
  
  /*说明--上*/
  .explainUp{
    width: 100%;
    font-size: 12px;
    margin-top: 2px;
  }
  .explainUp span img{
    width: 15px;
    height: 15px;
    margin-bottom: -3px;
  }
  .explainUp :not(:first-child){
    margin-left: 1%;
    margin-top: 6px;
    float: right;
  }
  .explainUp :nth-child(1){
    font-size: 16px;
    margin-left: 2%;
  }
  .explainUp :nth-child(2){
    margin-right: 2.5%;
  }
  .explainUp :nth-child(3){
    margin-left: 3%;
  }
  /*说明--下*/
  .explainDown{
    width: 100%;
  }
  .explainDown span{
    color: #E94E24;
    margin-left: 2%;
    font-size: 8px;
  }
</style>
