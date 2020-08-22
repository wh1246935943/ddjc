<template>
	<view class="container">
		<form @submit="saveConfig">
			<!-- 传感器配置 -->
			<view v-if="title === '传感器配置'" class="form">
				<view class="form-item" data-title="传感器类型:" @click="selectSensor">
					<input
						:value="sensor"
						name="sensor"
						placeholder="请选择传感器类型"
						style="pointer-events: none;"
					/>
				</view>
				<view class="form-item" data-title="SSID:">
					<input name="ssid" placeholder="请输入SSID" />
				</view>
				<view class="form-item" data-title="IP:">
					<input name="ip" placeholder="请输入IP" />
				</view>
				<view class="form-item" data-title="PORT:">
					<input name="port" placeholder="请输入PORT" />
				</view>
			</view>
			<!-- 检测参数配置 -->
			<view v-if="title === '检测参数配置'" class="form">
				<view class="form-item" data-title="检出阈值:">
					<input name="jcfz" placeholder="请输入检出阈值" />
				</view>
				<view class="form-item" data-title="一般告警阈值:">
					<input name="jgfz" placeholder="请输入一般告警阈值" />
				</view>
				<view class="form-item" data-title="严重告警阈值:">
					<input name="yzjg" placeholder="请输入严重告警阈值" />
				</view>
			</view>
			<!-- 网络参数配置 -->
			<view v-if="title === '网络参数配置'" class="form">
				<view class="form-item" data-title="后台URL:">
					<input name="url" placeholder="请输入后台URL" />
				</view>
			</view>
			<view class="btns">
				<button
					@click="backPage"
					:disabled="isLoading"
					:loading="isLoading"
					class="cancel-btn"
				>取消</button>
				<button
					form-type="submit"
					:disabled="isLoading"
					:loading="isLoading"
					class="confirm-btn"
				>保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				isLoading: false,
				sensor: ''
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({title: options.routerParam});
			this.title = options.routerParam;
		},
		methods: {
			backPage() {
				uni.navigateBack()
			},
			selectSensor() {
				const sensorList = ['TEV', 'AA', 'AE', 'HFCT', 'UHF', 'IR'];
				uni.showActionSheet({
					itemList: sensorList,
					success: ({tapIndex}) => {
						this.sensor = sensorList[tapIndex]
					}
				})
			},
			saveConfig(filesValue) {
				console.log(filesValue);
			}
		}
	}
</script>

<style lang="scss">
.container{
	.form{
		padding: 20upx 0;
		.form-item{
			display: flex;
			justify-content: space-between;
			padding: 20upx 20upx;
			border-bottom: 1upx solid $border-color-base;
			font-size: $font-size-larg;
			background-color: #fff;
			position: relative;
			&:before{
				content: attr(data-title);
				margin-right: 20upx;
			}
			input{
				border: none;
				height: 40upx;
				flex: 1;
				color: $base-color;
				outline: none;
				text-align: end;
			}
		}		
	}
	.btns{
		display: flex;
		justify-content: space-around;
		position: absolute;
		bottom: 60upx;
		width: 100%;
		button{
			width: 45%;
			height: 76upx;
			line-height: 76upx;
			border-radius: 50px;
			background: $uni-color-primary;
			color: #fff;
			font-size: $font-size-base;
		}
		.cancel-btn{
			background: #fff;
			border: 1upx solid #909399;
			color: $font-color-light;
		}
	}
}
</style>
