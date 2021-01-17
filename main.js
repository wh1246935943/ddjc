import Vue from 'vue';
import App from './App';
import { stringify } from 'qs';
import service from './request/index.js';
import store from './store';

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

const showToast = (msg = '', verticalAlign = 'top', duration = 'long') => {
	void plus.nativeUI.toast(
		msg,
		{
			verticalAlign,
			duration
		}
	)
};

const openDatabase = () => {
  plus.sqlite.openDatabase({
    name: 'yaohao',
    path: '_doc/yaohao.db',
    success: (e) => {
      console.log('sql opened')
      plus.sqlite.executeSql({
        name: 'yaohao',
        sql: 'CREATE TABLE IF NOT EXISTS dataBase(name CHAR(255), isAlready BIT)',
        success: () => {
          console.log('opened')
          // store.commit('SET_USERLIST', {flag: 1})
        },
        fail: (e) => console.log(e)
      })
    },
    fail: (e) => openDatabase()
  });
};
openDatabase();

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$toast = showToast;
// Vue.prototype.$Service = service;
Vue.prototype.$windowWidth = uni.getSystemInfoSync().windowWidth;

App.mpType = 'app';

const app = new Vue({
    ...App
})
app.$mount()