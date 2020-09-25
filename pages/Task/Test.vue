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
		<data-table
			:isSwitchgear="isSwitchgear"
			:item="item"
			@onClicklocation="onClicklocation"
		></data-table>
		<chart-box></chart-box>
	</view>
</template>

<script>
	import lodash from 'lodash';
	import { RenDropdownFilter } from 'wh-ui';
	import DataTable from '../common/DataTable.vue';
	import ChartBox from '../common/ChartBox.vue';
	const testPageTypeNames = ['空声AA', '地电压TEV', '特高频UHF', '高频HFCT', '接触式超声波AE'];
	const FvvUniWifiHelper = uni.requireNativePlugin("Fvv-UniWifiHelper");
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
			/**
			 * 初始化wifi控件
			 */
			FvvUniWifiHelper.init((res) => {
				console.log(res)
			});
			/**
			 * 初始化检查本地是否保存有已测试的数据
			 * 有的话展示本地保存的数据
			 */
			const routerParam = JSON.parse(options.routerParam);
			if (lodash.hasIn(uni.getStorageSync('TESTED_LIST'), [routerParam.id])) {
				this.item = uni.getStorageSync('TESTED_LIST')[routerParam.id]
			} else {
				this.item = routerParam;
			}
			if (this.item.sensorTypeList && this.item.sensorTypeList.length) {
				this.testProjectName = this.item.sensorTypeList[0].name
				this.filterData = [this.item.sensorTypeList.map((item, index) => Object.assign(item, {text: item.name, value: index}))]
			};
		},
		methods: {
			/**
			 * 选择测试项目
			 */
			onSelected(res){
				this.testProjectName = res[0][0].name;
				FvvUniWifiHelper.openWifi()
			},
			/**
			 * 点击要测试的点位
			 */
			onClicklocation(index, dataIndex, item) {
				this.$set(this.item.deviceList[index], dataIndex, (Math.random()*(0-100) + 100).toFixed(2));
				const testedList = {};
				if (uni.getStorageSync('TESTED_LIST')) {
					Object.assign(testedList, uni.getStorageSync('TESTED_LIST'))
				};
				Object.assign(testedList, {[this.item.id]: this.item});
				uni.setStorageSync('TESTED_LIST', testedList);
				// const testResult = [];
				// this.$Service.uploadTestResult(testResult).then((resp) => {
				// 	if (!resp || !resp.success) return;

				// })
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
