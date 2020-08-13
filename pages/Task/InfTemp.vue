<template>
	<view class="container">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// ...
			}
		},
		onLoad(options) {
			console.log('options:::', options);
			const routerParam = JSON.parse(options.routerParam);
		},
		methods: {
			// ...
		},
		/**
		 * 点击导航栏完成按钮
		 */
		onNavigationBarButtonTap() {
			if (this.item.pageTitle === '数据详情') return
			this.$toast('完成')
		}
	}
</script>

<style lang="scss">
.container{
	display: flex;
	height: 100%;
	flex-direction: column;
}
</style>
