import request from '@/utils/request'

// 登录方法
export function wxLogin(openId) {
  return request({
    url: '/auth/wxLogin/'+openId,
    headers: {
      isToken: false
    },
    method: 'get',
  })
}

export function wxLoginByCode(code) {
  return request({
    url: '/auth/wxLoginByCode/WorrilessGo/'+code,
    headers: {
      isToken: false
    },
    method: 'get',
  })
}


export function getWebAuthUrl (scope) {
  return request({
    url: '/wechat/auth/getWebAuthUrl?scope='+scope,
    headers: {
      isToken: false
    },
    method: 'get',
  })
}

export function getQRAuthUrl (scope) {
  return request({
    url: '/wechat/auth/getQRAuthUrl?scope='+scope,
    headers: {
      isToken: false
    },
    method: 'get',
  })
}


export function getOpenId (code) {
  return request({
    url: '/wechat/auth/getOpenId/'+code,
    headers: {
      isToken: false
    },
    method: 'get',
  })
}


export function getWxUserInfo (code) {
  return request({
    url: '/wechat/auth/getWxUserInfo/'+code,
    headers: {
      isToken: false
    },
    method: 'get',
  })
}


