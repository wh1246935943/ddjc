<template>
	<view class="container">
		<view class="top-bar">
			<view class="col">
				任务名称: <text class="task-name">{{item.taskName}}</text>
			</view>
			<view class="col">
				测试项目:
				<ren-dropdown-filter
					:filterData='filterData'
					:defaultIndex='defaultIndex'
					@onSelected='onSelected'
				></ren-dropdown-filter>
			</view>
		</view>
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
				filterData:[
					[{ text: '站点名称', value: '' }, { text: '状态1', value: 1 }, { text: '状态2', value: 2 }, { text: '状态3', value: 3 }],
				],
				defaultIndex:[0],
				chartBoxHeight: 0
			}
		},
		onLoad(options) {
			console.log('options:::', options);
			const routerParam = JSON.parse(options.routerParam)
			this.item = routerParam;
			if (routerParam.sensorTypeList && routerParam.sensorTypeList.length) {
				this.filterData = [routerParam.sensorTypeList.map((item, index) => Object.assign(item, {text: item.name, value: index}))]
			}
		},
		methods: {
			/**
			 * 选择测试项目
			 */
			onSelected(res){
				console.log(res)
			},
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
	flex-direction: column;
	.top-bar{
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		align-items: center;
		padding: 0 0 0 10px;
		margin-bottom: 10px;
		.col{
			display: flex;
			align-items: center;
			.task-name{
				margin-left: 20upx;
				color: $base-color
			}
			.dropdown-box{
				width: 400upx;
			}
		}
	}
}
</style>
