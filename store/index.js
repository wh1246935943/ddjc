import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userInfo = uni.getStorageSync('user_info') || {}

const store = new Vuex.Store({
	state: {
		userInfo,
		isNetWork: false,
		netWorkType: ''
	},
	mutations: {
		/**
		 * 更新网络状态
		 */
		SET_NETWORK: (state, param) => {
			state.isNetWork = param.isConnected;
			state.netWorkType = param.networkType
		},
		/**
		 * 更新用户信息
		 */
		SET_SUERINFO: (state, param) => {
			state.userInfo = param
		},
		/**
		 * 推出登录
		 */
		LOGIN_OUT(state) {
			// 。。。
		}
	},
	actions: {
	
	}
})

export default store
