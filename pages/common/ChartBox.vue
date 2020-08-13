<template>
	<view class="data-chart" :style="{height: `${$windowWidth / 2}px`}">
		<view class="chart-box">
			1
		</view>
		<view class="chart-box">
			2
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				}
			}
		}
	}
</script>

<style lang="scss">
.data-chart{
	width: 50%vw;
	display: flex;
	justify-content: space-between;
	padding: 10px;
	.chart-box{
		width: calc(50% - 5px);
		height: 100%;
		background-color: #fff;
	}
}
</style>
