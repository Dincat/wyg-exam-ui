import request from '@/utils/request'


// 登录方法
export function getJsapiSignature(pageUrl) {
  return request({
    url: '/wechat/wxauth/noauth/createJsapiSignature?pageUrl='+pageUrl,
    method: 'get',
  })
}
