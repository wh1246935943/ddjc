<template>
	<view class="container">
		<view
			class="img-box"
			v-for="(item, index) in imgList"
			:key="index"
		>
			
			<image :src="item.src" mode="aspectFill"></image>
			<view class="del-img" @click="delImg(index)"></view>
			<view class="form-box" data-title="测试位置:">
				<input v-model="item.position" placeholder="请输入位置" />
			</view>
			<view class="form-box" data-title="最高温度:">
				<input v-model="item.heightTemp" placeholder="请输入温度" />
			</view>
		</view>
		<uni-fab @fabClick="addImg">上传</uni-fab>
	</view>
</template>

<script>
	import { UniFab } from 'wh-ui'
	export default {
		components: { UniFab },
		data() {
			return {
				imgList: [
					{
						src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2440894352,3814741899&fm=26&gp=0.jpg',
						position: '',
						heightTemp: ''
					}
				]
			}
		},
		onLoad(options) {
			console.log('options:::', options);
			const routerParam = JSON.parse(options.routerParam);
		},
		methods: {
			/**
			 * 上传图片
			 */
			addImg() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					success: ({tempFilePaths, tempFiles}) => {
						this.imgList.push({
							src: tempFilePaths[0],
							file: tempFiles[0],
							position: '',
							heightTemp: ''
						})						
					}
				});
			},
			/**
			 * 删除图片
			 */
			delImg(index) {
				uni.showModal({
				    content: '确定要移除这条数据?',
				    success: (e)=>{
				    	if(e.confirm) this.$delete(this.imgList, index)
				    }
				});
			}
		},
		/**
		 * 点击导航栏完成按钮
		 */
		onNavigationBarButtonTap() {
			this.$toast('完成111')
			console.log(this.imgList)
		}
	}
</script>

<style lang="scss">
.container{
	padding: 15upx;
	box-sizing: border-box;
	overflow-y: auto;
	.img-box{
		width: 100%;
		background-color: #fff;
		border: 2upx double $base-color;
		border-radius: $radius;
		overflow: hidden;
		margin-bottom: 20upx;
		position: relative;
		image{
			width: 100%;
			height: 300upx;
			margin-bottom: 15upx;
		}
		.del-img{
			width: 80upx;
			height: 80upx;
			position: absolute;
			right: 20upx;
			top: 20upx;
			border-radius: 50%;
			background: #f0f0f0;
			background-image: url(~@static/shanchu.png);
			background-repeat: no-repeat;
			background-size: 50upx 50upx;
			background-position: center;
			z-index: 99;
		}
		.form-box{
			display: flex;
			justify-content: flex-start;
			padding: 10upx 20upx 20upx 20upx;
			&:before{
				content: attr(data-title);
				margin-right: 20upx;
				font-size: $font-size-base;
			}
			input{
				border-bottom: 2upx solid $base-color;
				height: 40upx;
				flex: 1;
				color: $base-color
			}
		}
	}
}
</style>
