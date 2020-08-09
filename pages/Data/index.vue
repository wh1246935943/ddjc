<template>
	<view class="container">
		<ren-dropdown-filter
			:filterData='filterData'
			:defaultIndex='defaultIndex'
			@onSelected='onSelected'
		></ren-dropdown-filter>
		<item-card></item-card>
	</view>
</template>

<script>
	import { RenDropdownFilter, ItemCard } from 'wh-ui';
	export default {
		components:{ RenDropdownFilter, ItemCard },
		data() {
			return {
				navSearchTxt: '',
				filterData:[
					[{ text: '站点名称', value: '' }, { text: '状态1', value: 1 }, { text: '状态2', value: 2 }, { text: '状态3', value: 3 }],
					[{ text: '设备类型', value: '' }, { text: '类型1', value: 1 }, { text: '类型2', value: 2 }, { text: '类型3', value: 3 }],
					[{ text: '测试项目', value: '' }, { text: '类型1', value: 1 }, { text: '类型2', value: 2 }, { text: '类型3', value: 3 }]
				],
				defaultIndex:[0, 0, 0]
			};
		},

		onLoad() {
			// 。。。
		},
		methods: {
			onSelected(res){
				console.log(res)
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

</style>
