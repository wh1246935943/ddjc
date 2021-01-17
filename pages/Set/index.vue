<template>
	<view class="container">
		<uni-list
			:btnIcon="isDelBtn ? require('@static/shanchu.png') : require('@static/add.png')"
			:list="userList"
			@delBtn="delUser"
			:isDelBtn="isDelBtn"
		></uni-list>
		<uni-fab v-if="isAddBtn" @fabClick="addUser" :horizontal="'right'">{{isDelBtn?'新增':'添加'}}</uni-fab>
	</view>
</template>

<script>
	import { UniFab, UniList } from 'wh-ui';
	
	export default {
		data() {
			return {
				isAddBtn: true,
				isDelBtn: true,
				routerParam: ''
			};
		},
		computed: {
			userList() {
				if (this.routerParam === 'addPartake') {
					return this.$store.state.userList.filter(({isAlready}) => isAlready === 0)
				}
				return this.$store.state.userList
			}
		},
		onLoad(options) {
			const { routerParam } = options;
			this.routerParam = routerParam;
			if (routerParam === 'addPartake') {
				this.isAddBtn = false;
				this.isDelBtn = false;
				uni.setNavigationBarTitle({title: '可选人员'})
			};
		},
		methods:{
			delUser(index, item) {
				if (this.routerParam === 'addPartake') {
					this.$store.commit('SET_USERLIST', {flag: 3, index: item.name, data: 1}) 
					return
				};
				this.$store.commit('SET_USERLIST', {flag: 2, index})
			},
			// 添加新用户
			addUser(){
				this.$store.commit('SET_USERLIST', {flag: 4, data: [{name: Math.floor(Math.random()*10), isAlready: 0}]})
			}
		}
	}
</script>

<style lang='scss'>

</style>
