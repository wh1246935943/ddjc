<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" src="@static/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" src="@static/missing-face.png"></image>
				</view>
				<view class="info-box">
					<text class="username">{{'wanghao' || '游客'}}</text>
				</view>
			</view>
		</view>
		<item-card height="110upx" taskName="传感器配置" />
		<item-card height="110upx" marginTop="2upx" taskName="网络参数配置" />
		<item-card height="110upx" marginTop="2upx" taskName="检测参数配置" />
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script>
	import { ItemCard } from 'wh-ui'
	import { mapMutations } from 'vuex';
	export default {
		components:{ ItemCard },
		methods:{
			...mapMutations(['logout']),

			navTo(url){
				this.$api.msg(`跳转到${url}`);
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.logout();
				    		uni.reLaunch({
				    			url: '/pages/Login/index'
				    		})
				    	}
				    }
				});
			}
		}
	}
</script>

<style lang='scss'>
	.user-section{
		padding: 60upx 0 60upx 30upx;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
		.user-info-box{
			height: 180upx;
			display:flex;
			align-items:center;
			position:relative;
			z-index: 1;
			.portrait{
				width: 130upx;
				height: 130upx;
				border:5upx solid #fff;
				border-radius: 50%;
			}
			.username{
				font-size: $font-size-base + 6upx;
				color: $font-color-dark;
				margin-left: 20upx;
			}
		}
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
	}
</style>
