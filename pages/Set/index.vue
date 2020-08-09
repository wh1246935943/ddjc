<template>
	<view class="container">
		<item-card height="110upx" title="传感器配置" />
		<item-card height="110upx" marginTop="2upx" title="网络参数配置" />
		<item-card height="110upx" marginTop="2upx" title="检测参数配置" />
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
				    			url: '/pages/PreLogin/index'
				    		})
				    	}
				    }
				});
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
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
