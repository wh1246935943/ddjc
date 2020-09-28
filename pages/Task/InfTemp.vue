<template>
	<view class="container">
		<view
			class="img-box"
			v-for="(item, index) in imgList"
			:key="index"
		>
			<image :src="item.path" mode="aspectFill" @click="previewImage(item.path)"></image>
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
	import { UniFab } from 'wh-ui';
	// import FormData from 'form-data';
	export default {
		components: { UniFab },
		data() {
			return {
				imgList: []
			}
		},
		onLoad(options) {
			const routerParam = JSON.parse(options.routerParam);
		},
		methods: {
			/**
			 * 上传图片
			 */
			addImg() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: ({tempFilePaths, tempFiles}) => {
						uni.uploadFile({
							url: 'http://ecm.lanntu.top:8002/admin/file/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								Authorization: uni.getStorageSync('Authorization')
							},
							success: (uploadFileRes) => {
								console.log('uploadFileRes:::', uploadFileRes);
								const resp = JSON.parse(uploadFileRes.data);
								console.log(resp);
								this.imgList.push({
									path: tempFilePaths[0],
									relPath: resp.data.path,
									position: '',
									heightTemp: ''
								})
							}
						})
						// const formData = new FormData();
						// formData.append('file', tempFiles[0]);
						// console.log(tempFiles, tempFilePaths);
						// this.$Service.uploadFile({file: tempFiles[0]}).then((resp) => {
						// 	if (!resp || !resp.success) return;
						// })
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
			},
			/**
			 * 预览图片
			 */
			previewImage(path) {
				uni.previewImage({
					urls: [path]
				});				
			}
		},
		/**
		 * 点击导航栏完成按钮
		 */
		onNavigationBarButtonTap() {
			uni.showModal({
				content: '确定要提交以完成这个任务吗?',
				success: (e)=>{
					if(e.confirm){
						this.$Service.taskComplete({taskId: this.item.id}).then((resp) => {
							if (!resp || !resp.success) return;
							this.$toast('操作成功');
							uni.navigateBack()
						})
					}
				}
			})
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
				border-bottom: 1upx solid $base-color;
				height: 40upx;
				flex: 1;
				color: $base-color
			}
		}
	}
}
</style>
