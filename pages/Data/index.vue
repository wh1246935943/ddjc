<template>
	<view class="container">
		<ren-dropdown-filter
			:filterData='filterData'
			:defaultIndex='defaultIndex'
			@onSelected='onSelected'
		></ren-dropdown-filter>
		<view class="item-list">
			<!-- 任务列表 -->
			<item-card
				v-if="taskList.length"
				v-for="(item, index) in taskList"
				:key="index"
				v-bind="{...item}"
				@click="toTaskDetail(item)"
			></item-card>
			<!-- 缺省图 -->
			<empty-box top="-300" v-if="!taskList.length"></empty-box>
		</view>
	</view>
</template>

<script>
	import { RenDropdownFilter, ItemCard, EmptyBox } from 'wh-ui';
	export default {
		components:{ RenDropdownFilter, ItemCard, EmptyBox },
		data() {
			return {
				navSearchTxt: '',
				filterData:[
					[{ text: '站点名称', value: '' }, { text: '状态1', value: 1 }, { text: '状态2', value: 2 }, { text: '状态3', value: 3 }],
					[{ text: '设备类型', value: '' }, { text: '类型1', value: 1 }, { text: '类型2', value: 2 }, { text: '类型3', value: 3 }],
					[{ text: '测试项目', value: '' }, { text: '类型1', value: 1 }, { text: '类型2', value: 2 }, { text: '类型3', value: 3 }]
				],
				defaultIndex:[0, 0, 0],
				taskList: [
					{title: '测试3', date: '2019-09-08', subTitle: '西安测试1', desc: '4323', device: '开关'},
					{title: '测试1', date: '2019-09-08', subTitle: '西安测试1', desc: '4323', device: '开关'},
					{title: '测试1', date: '2019-09-08', subTitle: '西安测试1', desc: '4323', device: '开关'},
					{title: '测试1', date: '2019-09-08', subTitle: '西安测试1', desc: '4323', device: '开关'},
					{title: '测试1', date: '2019-09-08', subTitle: '西安测试1', desc: '4323', device: '开关'},
					{title: '测试2', date: '2019-09-08', subTitle: '西安测试2', desc: '11242342321212', device: '开关'},
					{title: '测试3', date: '2019-09-08', subTitle: '西安测试3', desc: '112发到付顺丰21212', device: '开关'}
				]
			};
		},

		onLoad() {
			// 。。。
		},
		methods: {
			/**
			 * 组合下拉框选择事件
			 */
			onSelected(res){
				console.log(res)
			},
			/**
			 * 跳转到已测试数据详情页面
			 */
			toTaskDetail(item) {
				uni.navigateTo({
					url: `/pages/Data/Details?${this.$stringify(item)}`
				})
			}
		},
		// #ifndef MP
		// 获取导航栏数据框得内容
		onNavigationBarSearchInputChanged: async function({text}) {
			this.navSearchTxt = text
		},
		//点击导航栏 搜索 时触发
		onNavigationBarButtonTap() {
			this.$api.msg(this.navSearchTxt);
		}
		// #endif
	}
</script>

<style lang="scss">
.container{
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
	.item-list{
		flex: 1;
		overflow: hidden;
		overflow-y: auto;
		position: relative;
	}
}
</style>
