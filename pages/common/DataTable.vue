<template>
	<view class="data-list">
		<uni-table
			:columns="columns"
			:data="data"
			@onClicklocation="onClicklocation"
		></uni-table>
	</view>
</template>

<script>
	import UniTable from 'wh-ui';
	export default {
		components:{ UniTable },
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
			isSwitchgear: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			columns() {
				const defaultCol = [{title: '设备名称', dataIndex: 'deviceName', width: '200upx'}];
				const a = [
					{title: '前上', dataIndex: 'location0'},
					{title: '前中', dataIndex: 'location1'},
					{title: '前下', dataIndex: 'location2'},
					{title: '后上', dataIndex: 'location3'},
					{title: '后中', dataIndex: 'location4'},
					{title: '后下', dataIndex: 'location5'}
				];
				const b = [
					{title: '位置1', dataIndex: 'location0'},
					{title: '位置2', dataIndex: 'location1'},
					{title: '位置3', dataIndex: 'location2'}
				];
				return this.isSwitchgear ? [...defaultCol, ...a] : [...defaultCol, ...b]
			}
		},
		data() {
			return {
				data: []
			}
		},
		created() {
			this.data = this.item.deviceList
    },
		methods: {
			/**
			 * 点击要测试的点位
			 */
			onClicklocation(index, dataIndex, item) {
				this.$emit('onClicklocation', index, dataIndex, item)
			}
		}
	}
</script>

<style lang="scss">
.data-list{
	flex: 1;
	background-color: #fff;
}
</style>
