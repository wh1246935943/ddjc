<template>
	<view class="empty-box" :style="{top: `calc(50% + ${top}upx)`}">
		<slot></slot>
		<image src="@static/empty.png" mode="scaleToFill"></image>
	</view>
</template>

<script>
	export default {
		props: {
			top: {
				type: String,
				default: '0'
			},
		},
		data() {
			return {
				// ...
			}
		}
	}
</script>

<style lang='scss'>
.empty-box{
	display: flex;
	position: absolute;
	right: 50%;
	transform: translate(50%, 50%);
	image{
		width: 300upx;
		height: 270upx
	}
}
</style>
