<template>
	<view class="pre-login">
		<view class="welcome-txt">
			欢迎使用</br>
			带电检测作业移动终端
		</view>
		<view class="login-mode">
			<view @click="toLoginPage('task')">
				<image src="@static/rwms.png"></image>
				<text>任务模式</text>
			</view>
			<view @click="toLoginPage('host')">
				<image src="@static/zjms.png"></image>
				<text>主机模式</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			toLoginPage(mode) {
				console.log('mode:::', mode);
				uni.navigateTo({
					url: `/pages/Login/index?${this.$stringify({mode})}`,
				})
			}
		}
	}
</script>

<style lang="scss">
page {
	background: $base-color
}
.pre-login{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: url(~@static/pg.png);
	background-size: cover;
	.welcome-txt{
		width: 80%;
		font-size: 58upx;
		text-align: center;
		color: #fff;
		margin-bottom: 64upx;
		transform: translateY(-180upx);
	}
	.login-mode{
		display: flex;
		& > view {
			width: 250upx;
			height: 200upx;
			background-color: #fff;
			border-radius: $radius;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			& > image{
				width: 100upx;
				height: 100upx;
			}
			& > text{
				margin-top: 20upx;
			}
			&:first-child{
				margin-right: 80upx;
			}
		}
	}
}
</style>
