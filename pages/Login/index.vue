<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<form @submit="toLogin">
					<view class="input-item">
						<text class="tit">账号</text>
						<input 
							type="text" 
							:value="username"
							data-key="username"
							placeholder="请输入账号"
							@input="inputChange"
						/>
					</view>
					<view class="input-item">
						<text class="tit">密码</text>
						<input 
							type="password"
							:value="password"
							placeholder="请输入密码"
							password
							data-key="password"
							@input="inputChange"
						/>
					</view>
					<view class="remember-pwd">
						<view class="check-box" @click="() => isRememberPwd = !isRememberPwd">
							<view class="icon-box">
								<icon type="success_no_circle" color="#1f9689" v-if="isRememberPwd" />
							</view>
							<view>记住密码</view>
						</view>
					</view>
					<button
						form-type="submit"
						:disabled="disabled"
						:loading="isLoading"
						class="confirm-btn"
					>登录</button>
					<button
						class="confirm-btn"
						style="margin-top: 30px"
						@click="testPlugin"
					>插件测试</button>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex';
	import lodash from 'lodash';
	const maqDeviceModule = uni.requireNativePlugin('DCloud-MaqDevice');
	const modal = uni.requireNativePlugin('modal');
	export default{
		data(){
			return {
				username: '',
				password: '',
				isRememberPwd: false,
				isLoading: false
			}
		},
		computed: {
			/**
			 * 登录按钮状态：
			 * 账号密码都为空或者正在登录中时登录按钮不可点击
			 */
			disabled() {
				let isForm = this.username && this.password
				if (!isForm) return true;
				if (this.isLoading) return true;
				return false
			}
		},
		onLoad(){
			const loginInfo = uni.getStorageSync('login_info');
			if (lodash.hasIn(loginInfo, 'password')) {
				this.isRememberPwd = true;
				this.username = loginInfo.username;
				this.password = loginInfo.password
			}
		},
		methods: {
			/**
			 * 插件测试
			 */
			testPlugin() {
				maqDeviceModule.connect({
					'hostIP': '127.0.0.1',
					'port': 8000
				},
				(ret) => {
					console.log(123);
					modal.toast({
						message: ret,
						duration: 1.5
					});
				})
			},
			
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack()
			},
			toLogin(){
				const {username, password} = this;
				this.isLoading = true;
				this.$Service.login({
					username,
					password
				}).then((resp) => {
					this.isLoading = false
					console.log('login:::', resp);
					if (!resp || !resp.success) return;
					if (this.isRememberPwd) {
						uni.setStorage({
							key: 'login_info',
							data: {username, password}
						});
					} else {
						uni.removeStorage({key: 'login_info'});
					};
					uni.setStorage({
						key: 'user_info',
						data: resp.data
					});
					this.$store.commit('SET_SUERINFO', resp.data)
					uni.switchTab({url: '/pages/Task/index'})
				})
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		/* background: url(~@static/login_bg.jpg);
		background-size: cover;
		background-repeat: no-repeat; */
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-size-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-size-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}
	.remember-pwd{
		margin: 30upx 0 50upx 0;
		text-align: end;
		.check-box{
			display: inline-flex;
			align-items: center;
			position: relative;
			.icon-box{
				display: inline-flex;
				justify-content: center;
				align-items: center;
				padding: 5upx;
				margin-right: 7upx;
				border: 3upx solid $base-color;
				border-radius: 10upx;
				transform: scale(0.7);
				height: 50upx;
				width: 50upx;
				position: absolute;
				top: 0;
				left: -55upx;
			}
		}
	}
	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-size-base;
		&:after{
			border-radius: 100px;
		}
	}
</style>
