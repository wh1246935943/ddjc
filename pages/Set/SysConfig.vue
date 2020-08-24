<template>
	<view class="container">
		<form @submit="saveConfig">
			<!-- 传感器配置 -->
			<view v-if="title === '传感器配置'" class="form">
				<view class="form-item" data-title="传感器类型:" @click="selectSensor">
					<input
						:value="sensor"
						name="sensor"
						placeholder="请选择"
						style="pointer-events: none;"
					/>
				</view>
				<view class="form-item" data-title="SSID:">
					<input :value="uni.getStorageSync('SYS_CONFIG').ssid" name="ssid" placeholder="请输入" />
				</view>
				<view class="form-item" data-title="IP:">
					<input :value="uni.getStorageSync('SYS_CONFIG').ip" name="ip" placeholder="请输入" />
				</view>
				<view class="form-item" data-title="PORT:">
					<input :value="uni.getStorageSync('SYS_CONFIG').port" name="port" placeholder="请输入" />
				</view>
			</view>
			<!-- 检测参数配置 -->
			<view v-if="title === '检测参数配置'" class="form">
				<view class="form-item" data-title="检出阈值:">
					<input :value="uni.getStorageSync('SYS_CONFIG').jcfz" name="jcfz" placeholder="请输入" />
				</view>
				<view class="form-item" data-title="一般告警阈值:">
					<input :value="uni.getStorageSync('SYS_CONFIG').jgfz" name="jgfz" placeholder="请输入" />
				</view>
				<view class="form-item" data-title="严重告警阈值:">
					<input :value="uni.getStorageSync('SYS_CONFIG').yzjg" name="yzjg" placeholder="请输入" />
				</view>
			</view>
			<!-- 网络参数配置 -->
			<view v-if="title === '网络参数配置'" class="form">
				<view class="form-item" data-title="后台URL:">
					<input :value="uni.getStorageSync('SYS_CONFIG').url" name="url" placeholder="请输入" />
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
	const errorMsg = {
		sensor: '请选择传感器',
		ssid: '请填写SSID',
		ip: '请填写IP',
		port: '请填写PORT',
		jcfz: '请填写检出阈值',
		jgfz: '请填写一般告警阈值',
		yzjg: '请填写严重告警阈值',
		url: '请填写后台URL'
	}
	export default {
		data() {
			return {
				title: '',
				isLoading: false,
				sensor: '',
				uni: uni
			}
		},
		onLoad(options) {
			this.sensor = uni.getStorageSync('SYS_CONFIG').sensor;
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
				const param = filesValue.detail.value
				const keys = Object.keys(param);
				const {length} = keys;
				let isPass = true;
				for (let i = 0; i < length; i++) {
					if (!param[keys[i]]) {
						this.$toast(errorMsg[keys[i]])
						return
					}
				};
				const sysConfig = {};
				if (uni.getStorageSync('SYS_CONFIG')) {
					Object.assign(sysConfig, uni.getStorageSync('SYS_CONFIG'))
				};
				Object.assign(sysConfig, filesValue.detail.value)
				uni.setStorageSync('SYS_CONFIG', sysConfig);
				this.$toast('已保存成功')
				uni.navigateBack()
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
				padding-right: 20upx
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
