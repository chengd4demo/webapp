const loadmore = {
	pullText: '上拉加载',
	triggerText: '释放更新',
	loadingText: '加载中...',
	doneText: '加载完成',
	failText: '加载失败',
	loadedStayTime: 400,
	stayDistance: 50,
	triggerDistance: 50
}
const refresh = {
	pullText: '下拉刷新',
	triggerText: '释放刷新',
	loadingText: '刷新中...',
	doneText: '刷新完成',
	failText: '刷新失败',
	loadedStayTime: 400,
	stayDistance: 50,
	triggerDistance: 50
}

const wxConfig = {
	appId: "wxc4bba222e1d9cbe3"
}

const wxUserInfo = {
	openid:'',
	nickname:'',
	sex:'',
	province:'',
	city:'',
	country:'',
	headimgurl:''
}

const confirmPayment = {
		realPrice:0,
		deviceSequence:'-',
		available:false,
		onLine:false,
		costTime:0,
		pm25:110
}

const cashAmount = {
	cashAvailableAmount:0.00,
	cashTotalAcmount:0.00
}
export default {
	refresh,
	loadmore,
	wxConfig,
	confirmPayment,
	wxUserInfo,
	cashAmount
}