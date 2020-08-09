import request from './request.js';
import { stringify } from 'qs';
import { sha256 } from 'js-sha256';

export default class Service {
  // 登录系统账号
  login(param) {
    Object.assign(param, {password: sha256(param.password)})
    return request('admin/auth/login', {
      data: param,
      method: 'POST'
    }, false)
  }
}

  