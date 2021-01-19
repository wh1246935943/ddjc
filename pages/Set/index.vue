<template>
	<view class="container">
		<uni-list
			:btnIcon="isDelBtn ? require('@static/shanchu.png') : require('@static/add.png')"
			:list="userList"
			@delBtn="delUser"
		></uni-list>
		<uni-fab v-if="isAddBtn" @fabClick="addUser" :horizontal="'right'">{{isDelBtn?'新增':'添加'}}</uni-fab>
		<form
			v-if="isShowModal"
			@submit="submit"
			class="custom-form"
		>
			<textarea name="names" placeholder="多个人名以','分割"></textarea>
			<view class="footer">
				<button
					@click="() => isShowModal = false"
				>取消</button>
				<button
					form-type="submit"
					class="confirm-btn"
				>确定</button>
			</view>
		</form>
	</view>
</template>

<script>
	import { UniFab, UniList, UniModal } from 'wh-ui';
	
	export default {
		data() {
			return {
				isAddBtn: true,
				isDelBtn: true,
				routerParam: '',
				isShowModal: false
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
			submit(filesValue) {
				console.log(filesValue);
				const nameStr = filesValue.detail.value.names.replace(' ', '');
				console.log(nameStr);
				if (!nameStr) {
					Vue.prototype.$toast('请输入要添加的人名');
					return
				};
				const names = nameStr.split(','||'，');
				const data = names.map((name) => ({name, isAlready: 0}))
				this.$store.commit('SET_USERLIST', {flag: 4, data});
				this.isShowModal = false
			},

			delUser(index, item) {
				if (this.routerParam === 'addPartake') {
					this.$store.commit('SET_USERLIST', {flag: 3, index: item.name, data: 1}) 
					return
				};
				this.$store.commit('SET_USERLIST', {flag: 2, index})
			},

			// 添加新用户
			addUser(){
				this.isShowModal = true
			}
		}
	}
</script>

<style lang='scss'>
.container{
	height: 100%;
	width: 100%;
	overflow-y: auto;
	position: relative;
	.custom-form{
		background: #fff;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12) !important;
		textarea{
			padding: 15upx
		}
		.footer{
			display: flex;
			color: #000;
			button{
				width: 50%;
				border: none;
				outline: none;
			}
			.confirm-btn{
				color: #fff;
				background: #36cfc9;
			}
		}
	}
}
</style>
