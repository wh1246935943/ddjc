<template>
	<view class="container">
		<uni-list :list="partakeList" @delBtn="delUser"></uni-list>
		<uni-fab @fabClick="addPartake" :horizontal="'right'">添加</uni-fab>
	</view>
</template>

<script>
	import { UniFab, UniList } from 'wh-ui';
	export default {
		components: { UniFab, UniList },
		computed: {
			partakeList() {
				return this.$store.state.userList.filter(({isAlready}) => isAlready === 1)
			}
		},
		methods: {
			addPartake() {
				uni.navigateTo({
					url: `/pages/Set/index?routerParam=addPartake`
				})
			},
			delUser(index, item) {
				this.$store.commit('SET_USERLIST', {flag: 3, index: item.name, data: 0})
			}
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: `/pages/Set/index`
			})
		}
	}
</script>

<style lang="scss">
	.container{
		position: relative;
		height: 100%;
		overflow-y: auto;
	}
</style>
