<template>
	<f7-page>
		<div style="width:100%;min-height:20%;margin-bottom:-35px;text-align:center;margin-top:20px">
			<div>
				<img src="../img/img2039716589809cc0.png" style="width:auto;" />
			</div>
			<div style="margin-top:10px;color:#e94e24;">
				<span>圈兔圈共享空气净化器</span>
			</div>
		</div>
		<form>
			<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
				<input type="number" placeholder="输入手机号码" style="height: 44px; line-height: 44px;  text-indent: 10px;"/>
			</div>
			<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;border-bottom: 1px solid #ccc;">
				<span style="width:70%;float: left;">
					<input type="number" placeholder="输入验证码" style="height: 44px; line-height: 44px;  text-indent: 10px;"/>
				</span>
				<span style="width: 30%; ">
					<a href="#" id="code" @click="countDown" class="button button-fill" :class="{disabled: !this.canClick}"
					no-fast-click style="margin:0 auto;background:#e94e24;disable:disable;height: 44px; line-height:44px;">{{content}}</a>
				</span>
			</div>
			<div style="height: 44px; line-height: 44px; width: 100%; background: #fff;">
				<span style="width:7%;float: left;text-align: left;">
					<input type="checkbox" name="my-checkbox" value="2"  style="height: 38px; line-height: 40px; "/>
				</span>
				<span style="width: 93%; ">
					<f7-button style="height: 44px; line-height: 44px; text-align: left;" popup-open=" #popup" class="about-div">我已阅读,并同意《用户注册协议》</f7-button>
				</span>
			</div>
			<div style="width: 100%; margin-top: 20px;">
				<a href="/home/" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;height: 44px; line-height:44px;">验证手机</a>
			</div>
		</form>
	</f7-page>
</template>
<style>
	.about-div {
		margin: 0 auto 0 0;
		border: 0px solid white !important;
		font-size: 17px;
		color: #b9b9b9 !important;
		padding: 0px;
	}
</style>

<script>
	export default {
		data() {
			return {
				content: '发送验证码',
				totalTime: 60,
				canClick: true
			}
		},
		methods: {
			countDown() {
				if (!this.canClick) return
				this.canClick = false
				this.content = this.totalTime + 's后重新发送'
				let clock = window.setInterval(() => {
					this.totalTime--
					this.content = this.totalTime + 's后重新发送'
					if (this.totalTime < 0) {
						window.clearInterval(clock);
						this.content = '重新发送验证码'
						this.totalTime = 60
						this.canClick = true
					}
				}, 1000)
			},
		}
	}
</script>
