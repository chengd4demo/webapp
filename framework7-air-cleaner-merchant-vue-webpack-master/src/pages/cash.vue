<template>
	<f7-page>
		<f7-navbar title="提现申请" back-link="" style="background:#e94e24;"></f7-navbar>
		<div style="min-height:15%; margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;border-bottom:1px solid #e0e0e0">
			<div class="row" style="margin-left:50px">
				<div class="col-auto" style="text-indent: 15px;">当前账户余额：¥{{totalAcmount}}</div>
				<div class="col-auto"></div>
			</div>
			<div class="row" style="margin-left:50px;margin-top:15px">
				<div class="col-auto" style="text-indent: 29px;">可提现余额：¥{{availableAmount}}</div>
				<div class="col-auto"></div>
			</div>
		</div>

		<div class="demok3_lable" style="text-indent: 10px;max-height:25px;font-size: 17px;">提现金额:</div>
		<div class="demok3_input"><input type="number" v-model="amount" name="amount" @keyup = "keyDown()"
		 oninput="this.value=this.value.replace(/[^0-9]/g,''); if(this.value<1){this.value='';}else if(this.value>200){this.value='';}"
		 style="border:1px solid #e0e0e0; height:25px; margin-left:10px;" placeholder="请输入提现金额,最大200元"  /></div>
		<div style="width:100%;margin:10px auto;float:left;">
			<div style="width:95%;background: #EEEDED;margin: 0px auto;text-indent: 5px;">
				<p>注:</p>
				<p>1.提现申请提交后，当前余额账户将被冻结，暂无法做别的操作</p>
				<p>2.单次提现金额最大200元，提现成功后，将有微信红包方式发送到您的微信号上，请注意查收</p>
				<p>3.红包发送24小时内务必领取，超过24小时后，红包会自动返回到商户，用户需要再次提交申请</p>
			</div>
		</div>
		<p><a href="#" @click="openPassword()" class="button button-fill" :class="{disabled: this.canInput}" style="width:90%;margin:0 auto;background:#e94e24;height: 40px;line-height: 40px;">提&nbsp;交</a></p>
	</f7-page>
</template>
<script>
	export default {
		data(){
			return {
				availableAmount:this.$f7route.params.availableAmount | 0,
				totalAcmount:this.$f7route.params.totalAcmount | 0,
				canInput:true,
				amount:''
			}
		},
		methods:{
			openPassword() {
				const self = this;
				const app = self.$f7;
				const router = self.$f7router;
				console.log(123);
				app.params.dialog.PreloaderTitle = '加载中...'
				app.params.dialog.buttonCancel = '<span style="color:black">取消</span>'
				app.params.dialog.buttonOk = '<span style="color:black">确定</span>'
				app.dialog.password('','请输入提现密码', (password) => {
					if (password!=='' && password.length!==0){
					//调用接口根据接口返回的状态提示
						
					} else {
						self.alertMsg('请输入提现密码')
					}
				});
			},
			keyDown(){
					if (this.amount!==""&&this.amount!=="0") {
						this.canInput = false
				} else {
					this.canInput = true;
				}
			},
			alertMsg(msg) {
				let toastTop = this.$f7.toast.create({
					text: msg,
					position: 'top',
					closeTimeout: 1000,
				})
				toastTop.open();
			}
		}
	}
</script>
<style>
	.demok3_lable {
		width: 100px;
		float: left;
	}

	.demok3_input {
		width: 200px;
		height: 20px;
		float: left;
		margin-left: -25px;
	}
</style>
