import Vue from 'vue'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 检查请求状态，非客户端服务器指定错误得提示给用户
 */
const checkStatus = (response) => {
  if (response.statusCode >= 200 && response.statusCode < 300) return;
  const errortext = codeMessage[response.statusCode];
	Vue.prototype.$toast(`请求失败: ${errortext}${response.statusCode}`);
  const error = new Error(errortext);
  error.name = response.statusCode;
  error.response = response;
  throw error;
};


const request = (url, options, isLoading = true) => {
  const defaultOptions = {
    method: 'GET',
    isErrorTip: true
  }

  Object.assign(defaultOptions, options);

	/**
	 * 展示网络请求得loading
	 */
	if (isLoading) uni.showLoading({title: 'loading', mask: true})
	
  return new Promise((resolve, reject) => {
    uni.request({
      url: `http://192.168.202.248:8080/${url}`,
      ...defaultOptions,
      success(resp) {
        console.log('request:::resp:::', resp);
        checkStatus(resp);
				if (resp.data.code === '1000') {
					Vue.prototype.$toast(`${resp.data.msg ? resp.data.msg : '请求失败'}`);
				}
        resolve(resp.data);
      },
      fail(error) {
				Vue.prototype.$toast(`请求超时`);
				resolve(false)
      },
      complete() {
				if (isLoading) uni.hideLoading()
      } 
    })
  })
}

export default request
