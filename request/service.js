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
  uploadTestResult(param) {
    return request('admin/taskInfo/add', {
      data: param,
      method: 'POST',
    })
  };
	/**
	 * 任务完成
	 */
	taskComplete(param) {
		return request('admin/task/complete', {
		  data: param,
		  method: 'PUT',
		})
	}
	/**
	 * 获取基础数据
	 */
	getBaseInfo() {
		return request('admin/dataManage/baseInfo')
	}
}