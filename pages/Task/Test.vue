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
				const TESTED_LIST = uni.getStorageSync('TESTED_LIST');
				console.log('TESTED_LIST:', TESTED_LIST);
				const testResult = [{
					taskId: 21,//任务id
					userName: "tester1",//手机端登录的用户名
					sensorTypeID: 1,//传感器key值
					ambTemperature: 36.8,//环境温度
					deviceId: 1, //设备Id
					ambHumidity: 22,//环境湿度
					qRCode: "20200701000",//条码信息
					nowTime: new Date().format('yyyy-MM-dd HH:mm:ss'),//测试时间
					sensorData:[
						{
							sensorTypeID : 2,//传感器Id
							location : "位置1",//测点位置
							qmax:330,//放电幅值
							qphase:0.00,//放电相味
							qPulseNum: 54.5,//放电频次
							alarmSta:0,//告警状态
							dischargeType: "",//放电类型
							specFileName: "位置1.txt",//谱图文件
							nowTime: new Date().format('yyyy-MM-dd HH:mm:ss')//测试时间
						},
						{
							sensorTypeID : 3,
							location : "位置2",
							qmax:300,
							qphase:0.00,
							qPulseNum: 14.5,
							f1: 0.00,
							f2:0.00,
							alarmSta:0,
							dischargeType: "",
							specFileName: "位置2.txt",
							nowTime: new Date().format('yyyy-MM-dd HH:mm:ss')
						},
						{
							sensorTypeID : 3,
							location : "位置3",
							qmax:300,
							qphase:0.00,
							qPulseNum: 14.5,
							f1: 0.00,
							f2:0.00,
							alarmSta:0,
							dischargeType: "",
							specFileName: "位置3.txt",
							nowTime: new Date().format('yyyy-MM-dd HH:mm:ss')
						}
					]
				}];
				this.$Service.uploadTestResult(testResult).then((resp) => {
					if (!resp || !resp.success) return;
					this.$toast('测试结果上报成功');
				})
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
			}
		},
		/**
		 * 点击导航栏完成按钮
		 */
		onNavigationBarButtonTap() {
			uni.showModal({
				content: '确定要提交以完成这个任务吗?',
				success: (e)=>{
					if(e.confirm){
						this.$Service.taskComplete({taskId: this.item.id}).then((resp) => {
							if (!resp || !resp.success) return;
							this.$toast('操作成功');
							const TESTED_LIST = uni.getStorageSync('TESTED_LIST');
							delete TESTED_LIST[this.item.id];
							this.$store.commit('SET_TASKLIST', {flag: 1, id: this.item.id})
							uni.navigateBack()
						})
					}
				}
			})
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
