import axios from 'axios'
// const DEV_BASE_URL = 'http://192.168.1.167:8769'
const DEV_BASE_URL = ''
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// const PROD_BASE_URL = 'http://192.168.1.167:8769'
const PROD_BASE_URL = ''
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? PROD_BASE_URL : DEV_BASE_URL
// 返回状态判断  要根据后台给的判定字段
axios.interceptors.response.use((res) => {
    if (!res.data.description) {
      return Promise.reject(res)
    }
    return res
  }, (error) => {
    return Promise.reject(error)
  })

export function fetchGet (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {

        console.log("cccccccc")
        reject(error)
      })
  })
}
export function fetchPost (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
        .catch((error) => {

          console.log("cccccccc")
          reject(error)
        })
    })
  }
export default {
   /** 
    * 登录
    */
    login(params){
        return fetchPost('/merchant-web-api/user-channel/login',params)
    },
   /**
    * 支付选择
    */
    queryDeviceStatus(params){
        return fetchGet('/merchant-web-api/device-channel/login/'+params)
    },
    /**
     * 用户信息
     */
    queryUserInfo(params){
        return fetchPost('/merchant-web-api/user-channel/query/'+params)
    },
    /**
     * 设备监控/使用记录
     */
    queryDeviceMonitorPage(params){
        return fetchPost('/merchant-web-api/device-channel/queryDeviceMonitors',params)
    },
    /**
     * 个人信息设置
     */
    updateSelfInfo(params){
        return fetchPost('/merchant-web-api/user-channel/updateSelfInfo/',params)
    },
    /**
     * 获取短信验证码
     *
     */
    sendSms(params){
        return fetchGet('/merchant-web-api/common-channel/sendSms/'+params)
    },
		/**
		 * 投资商下商家列表
		 * 
		 */
		queryInvestorForTrader(params){
			return fetchPost('/merchant-web-api/device-channel/investorForTrader/',params)
		},
		/**
		*收入明细
		* 
		*/
		 queryAccountInbound(params){
			 return fetchPost('/merchant-web-api/order-channel/queryInbound/',params)
		 },
		/**
		* 账务查询
		* 
		*/
		queryAccount(params){
			return fetchPost('/merchant-web-api/account-channel/query/'+params)
		},
		/**
		 *提现记录
		 * 
		 */ 
		 queryAccountOutBoundPage(params){
			 return fetchPost('/merchant-web-api/account-channel/queryAccountOutBounds/',params)
		 },	
		 /**
			* 
			* 更新手机号码
			*/
		 updatePhoneNumber(params){
			 return fetchPost('/merchant-web-api/user-channel/updatePhone/',params)
		 },
		 /**
			* 
			* 修改密码
			*/
		 updateTradePwd(params){
			 return fetchPost('/merchant-web-api/user-channel/updateTradePwd/',params)
     },
     /**
			* 
			* 获取用户信息（授权）
      */
     queryObtainUserInfo(params) {
      return fetchPost('/merchant-web-api/user-channel/wx/query',params)
     },
      /**
			* 
			* 用户授权
      */
     authorize() {
      return fetchPost('/merchant-web-api/user-channel/wx/auth')
     },
		 /**
			* 
			* 取消提现
			*/
		 cleanAccountOutbound(params){
			 return fetchPost('/merchant-web-api/account-channel/cleanAccountOutbound/'+params)
		 },
		 /**
			* 
			* 申请提现
			*/
		 applyForAccountOutbound(params){
			 return fetchPost('/merchant-web-api/account-channel/applyForAccountOutbound/',params)
		 },
		 /**
		  * 
		  * 验证码校验
		  */
		 checkValidVerificationCode(params){
			 return fetchPost('/merchant-web-api/common-channel/checked/validVerificationCode',params)
		 }
}
