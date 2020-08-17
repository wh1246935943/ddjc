import Vue from 'vue';
import store from './store';
import App from './App';
import { stringify } from 'qs';
import service from './request/index.js';

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
};

const showToast = (msg = '', verticalAlign = 'top', duration = 'long') => {
	void plus.nativeUI.toast(
		msg,
		{
			verticalAlign,
			duration
		}
	)
};

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$toast = showToast;
Vue.prototype.$Service = service;
Vue.prototype.$windowWidth = uni.getSystemInfoSync().windowWidth;

App.mpType = 'app';

const app = new Vue({
    ...App
})
app.$mount()