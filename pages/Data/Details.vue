<template>
	<view class="container">
		<data-table></data-table>
		<chart-box></chart-box>
	</view>
</template>

<script>
	import { RenDropdownFilter } from 'wh-ui';
	import DataTable from '../common/DataTable.vue';
	import ChartBox from '../common/ChartBox.vue';
	export default {
		components:{ RenDropdownFilter, DataTable, ChartBox },
		data() {
			return {
				item: {},
				filterData:[],
				defaultIndex:[0],
				chartBoxHeight: 0
			}
		},
		onLoad(options) {
			this.item = options;
		},
		methods: {
			/**
			 * 选择测试项目
			 */
			onSelected(res){
				console.log(res)
			}
		},
		/**
		 * 点击导航栏完成按钮
		 */
		onNavigationBarButtonTap() {
			this.$toast('完成')
		}
	}
</script>

<style lang="scss">
.container{
	display: flex;
	height: 100%;
	flex-direction: column
}
</style>
