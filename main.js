import Vue from 'vue';
import store from './store';
import App from './App';
import { stringify } from 'qs';
import service from './request/index.js';

const weekday = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];
function format(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
}
if (!Date.prototype.format) {
  Date.prototype.format = function(str, addZero = false) {
    const config = {
      yyyy: this.getFullYear(),
      MM: this.getMonth() + 1,
      dd: this.getDate(),
      HH: this.getHours(),
      mm: this.getMinutes(),
      ss: this.getSeconds(),
      wwww: weekday[this.getDay()],
    };
    return (str || 'yyyy-MM-dd').replace(/yyyy|MM|dd|HH|mm|ss|wwww/g, a =>
      addZero ? format(config[a]) : config[a],
    );
  };
}

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