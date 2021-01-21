<template>
	<view class="container">
		<view class="result-list">
			<uni-list
				:list="dataList"
				:isDelBtn="false"
				:isUniNumber="typeIndex === 0"
				@onNumber="onNumber"
			></uni-list>
		</view>
		<view class="start-btn" @click="start">开始</view>
	</view>
</template>

<script>
	import { UniNumber, UniList } from 'wh-ui';
	export default {
		data() {
			return {
				isUniNumber: true,
				matter: [
					{name: '擦桌子', quota: 1, subordinate: []},
					{name: '浇花', quota: 1, subordinate: []},
					{name: '卫生间', quota: 1, subordinate: []},
					{name: '扫地', quota: 2, subordinate: []},
					{name: '拖地', quota: 2, subordinate: []}
				],
				memberList: [],
				typeIndex: 0
			};
		},
		computed: {
			dataList() {
				if (this.typeIndex === 0) return this.matter;
				if (this.typeIndex === 1) return this.memberList
			}
		},
		methods: {
			onNumber(index, value) {
				console.log(index, value);
				this.$set(this.matter[index], 'quota', value)
			},
			// 开始摇号
			start() {
				function shuffle(data) {
					var input = data;
					for (var i = input.length-1; i >=0; i--) {
						var randomIndex = Math.floor(Math.random()*(i+1)); 
						var itemAtIndex = input[randomIndex]; 
						input[randomIndex] = input[i]; 
						input[i] = itemAtIndex;
					}
					return input;
				};

				const { userList = [] } = this.$store.state;
				this.memberList = shuffle(userList.filter(({isAlready}) => isAlready === 1));
				if (this.typeIndex === 1) return;

				const userNames = this.memberList.map(({name}) => name);

				let cIndex = -1
				this.matter.forEach(item => {
					cIndex += item.quota;
					this.$set(
						item,
						'subordinate',
						userNames.filter((name, index) => index > (cIndex - item.quota) && index <= cIndex)
					)
				});
			}
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap() {
			uni.showActionSheet({
				itemList: ['打扫卫生', '随机排序'],
				success: ({tapIndex}) => {
					this.typeIndex = tapIndex;
				}
			});
		}
	}
</script>

<style lang="scss">
@keyframes hue {
    from {
      filter: hue-rotate(0deg);
    }
    to {
      filter: hue-rotate(-360deg);
    }
  }
	.container{
		position: relative;
		display: flex;
		height: 100%;
		.result-list{
			justify-content: space-between;
			flex-direction: column;
			align-items: center;
			height: 100%;
			width: 100%;
			overflow-y: auto;
		}
		.start-btn{
			width: 200upx;
			height:	200upx;
			border-radius: 50%;
			background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translate(-50%, -40upx);
			text-align: center;
			line-height: 200upx;
			font-size: 50upx;
			color: #f35626;
			background-image: webkit-linear-gradient(92deg, #f35626, #feab3a);
			// background-clip: text;
			// text-fill-color: transparent;
			animation: hue 15s infinite linear;
		}
	}
</style>
