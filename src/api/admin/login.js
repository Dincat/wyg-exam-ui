import request from '@/utils/request'
import { getRefreshToken } from '@/utils/auth'

const baseAuthenticationUrl = '/api/auth/v1/authentication/'

const basicAuthorization = 'Basic d2ViX2FwcDpzcHJpbmctbWljcm9zZXJ2aWNlLWV4YW0tc2VjcmV0'

export function loginByUsername (username, password, code, uuid) {
  return request({
    url: '/auth/web/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: { username, password, code, uuid }
  })
}

/**
 * 根据手机号登录
 * @param social
 * @param code
 */
export function loginBySocial (social, code) {
  const grantType = 'mobile'
  const scope = 'read'
  return request({
    url: '/api/auth/api/v1/mobile/token',
    headers: {
      'Authorization': basicAuthorization
    },
    method: 'post',
    params: {mobile: social, code, grant_type: grantType, scope}
  })
}

export function registerByUsername (registerBody) {
  return request({
    url: '/auth/web/register',
    method: 'post',
    data: registerBody
  })
}

export function logout (accesstoken, refreshToken) {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
}

export function getUserInfo (token) {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  })
}

/**
 * 刷新token
 */
export function refreshToken () {
  return request({
    url: '/auth/refresh',
    method: 'post'
  })
}
