<template>
	<f7-page>
		<f7-navbar title="提现申请" back-link="" style="background:#e94e24;"></f7-navbar>
		<div style="min-height:15%; margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;border-bottom:1px solid #e0e0e0">
			<div class="row" style="margin-left:50px">
				<div class="col-auto" style="text-indent: 15px;">当前账户余额：￥1000.00</div>
				<div class="col-auto"></div>
			</div>
			<div class="row" style="margin-left:50px;margin-top:15px">
				<div class="col-auto" style="text-indent: 29px;">可提现余额：￥1000.00</div>
				<div class="col-auto"></div>
			</div>
		</div>

		<div class="demok3_lable" style="text-indent: 10px;max-height:25px;">提现金额:</div>
		<div class="demok3_input"><input type="number" style="border:1px solid #e0e0e0" placeholder="请输入提现金额,最大200元" /></div>
		<div style="width:100%;margin:10px auto;float:left;">
			<div style="width:95%;background: #EEEDED;margin: 0px auto;text-indent: 5px;">
				<p>注:</p>
				<p>1.提现申请提交后，当前余额账户将被冻结，暂无法做别的操作</p>
				<p>2.单次提现金额最大200元，提现成功后，将有微信红包方式发送到您的微信号上，请注意查收</p>
				<p>3.红包发送24小时内务必领取，超过24小时后，红包会自动返回到商户，用户需要再次提交申请</p>
			</div>
		</div>
		<p><a href="#" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;height: 40px;line-height: 40px;">提&nbsp;交</a></p>
	</f7-page>
</template>
<script>
	export default {}
</script>
<style>
	.demok3_lable {
		width: 100px;
		float: left;
	}

	.demok3_input {
		width: 200px;
		float: left;
		margin-left: -10px;
	}
</style>
