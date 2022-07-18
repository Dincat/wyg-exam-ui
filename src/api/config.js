import request from '@/utils/request'


export function getSysConfig () {
  var configKeys=['web.icp.number','web.name','web.logo','sys.company.name'];
  return request({
    url: '/system/config/noauth/web/list',
    method: 'post',
    data: configKeys
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    url: '/system/config/configKey/' + configKey,
    method: 'get'
  })
}


// 根据参数键名查询参数值
export function getDictData(dictType) {
  return request({
    url: '/system/dict/data/type/' + dictType,
    method: 'get'
  })
}


