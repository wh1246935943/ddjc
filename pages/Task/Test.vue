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
		<data-table :isSwitchgear="isSwitchgear" :item="item"></data-table>
		<chart-box></chart-box>
	</view>
</template>

<script>
	import { RenDropdownFilter } from 'wh-ui';
	import DataTable from '../common/DataTable.vue';
	import ChartBox from '../common/ChartBox.vue';
	const testPageTypeNames = ['空声AA', '地电压TEV', '特高频UHF', '高频HFCT', '接触式超声波AE'];
	export default {
		components:{ RenDropdownFilter, DataTable, ChartBox },
		data() {
			return {
				item: {},
				filterData:[],
				defaultIndex:[0],
				chartBoxHeight: 0,
				testProjectName: ''
			}
		},
		computed: {
			isSwitchgear() {
				return this.item.deviceType === '开关柜' && testPageTypeNames.includes(this.testProjectName)
			}
		},
		onLoad(options) {
			const routerParam = JSON.parse(options.routerParam);
			this.item = routerParam;
			if (routerParam.sensorTypeList && routerParam.sensorTypeList.length) {
				this.testProjectName = routerParam.sensorTypeList[0].name
				this.filterData = [routerParam.sensorTypeList.map((item, index) => Object.assign(item, {text: item.name, value: index}))]
			};
		},
		methods: {
			/**
			 * 选择测试项目
			 */
			onSelected(res){
				this.testProjectName = res[0][0].name
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
