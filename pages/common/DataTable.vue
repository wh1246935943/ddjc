<template>
	<view class="data-list">222</view>
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
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss">
.data-list{
	flex: 1;
	background-color: #fff;
}
</style>
