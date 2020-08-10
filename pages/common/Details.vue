<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {}
			}
		},
		onLoad(options) {
			this.item = options;
			console.log('options:::', options);
			uni.setNavigationBarTitle({title: options.pageTitle});
			const webView = this.$mp.page.$getAppWebview();
			webView.setTitleNViewButtonStyle(0, {
				text: options.pageTitle === '数据详情' ? '' : '完成'
			})
		},
		methods: {
			
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

<style>

</style>
