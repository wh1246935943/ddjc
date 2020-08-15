import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userInfo = uni.getStorageSync('user_info') || {}

const store = new Vuex.Store({
	state: {
		userInfo
	},
	mutations: {
		SET_SUERINFO: (state, userInfo) => {
			state.userInfo = userInfo
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
				key: 'userInfo'  
			})
		}
	},
	actions: {
	
	}
})

export default store
