<template>
	<view class="container">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
			<swiper
				class="carousel"
				circular
				autoplay
				interval="3000"
				@change="swiperChange"
			>
				<swiper-item
					v-for="(item, index) in carouselList"
					:key="index" class="carousel-item"
					@click="swiperItemClick(item)"
				>
					<image :src="item.src" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		<!-- 任务列表 -->
		<view v-if="taskList.length">
			<item-card
				v-for="(item, index) in taskList"
				:key="index"
				v-bind="{...item}"
				@click="toTaskTestPage(item)"
			></item-card>
		</view>
		<!-- 缺省图 -->
		<empty-box top="300" v-else></empty-box>
	</view>
</template>

<script>
	import { ItemCard, EmptyBox } from 'wh-ui';
	import lodash from 'lodash';
	import { carouselList } from '@common/json.js';
	export default {
		components:{ ItemCard, EmptyBox },
		data() {
			return {
				titleNViewBackground: carouselList[0].background,
				swiperLength: carouselList.length,
				carouselList: carouselList,
				swiperCurrent: 0
			};
		},
		computed: {
			taskList() {
				return this.$store.state.taskList
			}
		},
		onLoad() {
			this.getTaskList()
		},
		methods: {
			/**
			 * 获取任务列表
			 */
			getTaskList() {
				const { userInfo } = this.$store.state;
				this.$Service.getTaskList({tester: userInfo.user.userId}).then((resp) => {
					if (!resp || !resp.success) return;
					console.log('resp.data:::', resp.data);
					this.$store.commit('SET_TASKLIST', {flag: 0, list: resp.data})
				})
			},
			/**
			 * 转到task测试页面
			 */
			toTaskTestPage(item) {
				/**
				 * 校验选中的任务中是否存在该必要的属性
				 */
				if (!lodash.hasIn(item, 'sensorTypeList[0].name')) {
					this.$toast('该测试任务数据中不包含任何传感器')
					return
				};
				let pathTarget = '';
				/**
				 * 拿到当前选中的任务的第一个传感器属性名
				 */
				const selectTypeName = item.sensorTypeList[0].name;
				/**
				 * 传感器列表中第一条数据存在于testPageTypeNames数组中
				 * 则跳转到Test/index页面的
				 */
				const testPageTypeNames = ['空声AA', '地电压TEV', '特高频UHF', '高频HFCT', '接触式超声波AE'];
				/**
				 * 传感器列表中第一条数据存在于InfTempPageTypeNames数组中
				 * InfTemp/index页面的
				 */
				const InfTempPageTypeNames = ['红外测温']
				if (testPageTypeNames.includes(selectTypeName)) pathTarget = 'Test';
				if (InfTempPageTypeNames.includes(selectTypeName)) pathTarget = 'InfTemp';
				/**
				 * 除此之外的任何条件都阻止页面跳转
				 */
				if (!pathTarget) {
					this.$toast('用于该传感器类型的测试功能正在完善中')
					return
				};

				uni.navigateTo({
					url: `/pages/Task/${pathTarget}?routerParam=${JSON.stringify(item)}`
				})
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			//详情页
			swiperItemClick(item) {
				console.log(item);
				plus.runtime.openURL('http://www.baidu.com');
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
	/* #ifdef MP */
	page{
		.carousel-section{
			padding: 0;
			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}
			.carousel{
				.carousel-item{
					padding: 0;
				}
			}
			.swiper-dots{
				left:45upx;
				bottom:40upx;
			}
		}
	}
	/* #endif */
	.container{
		position: relative;
	}
	.m-t{
		margin-top: 16upx;
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
			object-fit: cover;
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;
		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}
		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	
	.f-header{
		display:flex;
		align-items:center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-size-base +2upx;
			color: $font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-size-sm;
			color: $font-color-light;
		}
		.tit3{
			font-size: $font-size-base -2upx;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-size-base +2upx;
			color: $font-color-light;
		}
	}
</style>
