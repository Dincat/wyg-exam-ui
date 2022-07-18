import request from '@/utils/request'



export function getCurrentTime () {
  return request({
    url: '/system/system/currentTime',
    method: 'get'
  })
}

