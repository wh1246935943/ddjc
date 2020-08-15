import request from './request.js';
import { stringify } from 'qs';
var md5 = require('md5');

export default class Service {
  /**
	 * 登录
	 */
  login(param) {
    Object.assign(param, {password: md5(param.password)})
    return request('admin/auth/login', {
      data: param,
      method: 'POST'
    }, false)
  };
	/**
	 * 获取任务列表
	 */
	getTaskList(param) {
	  return request(`admin/task/all?${stringify(param)}`)
  };
  /**
   * 上传图片
   */
  uploadFile(param) {
    return request('admin/file/upload', {
      data: param,
      method: 'POST',
      header: {
        Accept: 'multipart/form-data'
      }
    })
  };
}