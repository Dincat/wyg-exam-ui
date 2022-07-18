import request from '@/utils/request'


// 查询意见反馈详细
export function getFeedback(id) {
  return request({
    url: '/system/feedback/' + id,
    method: 'get'
  })
}

// 新增意见反馈
export function addFeedback(data) {
  return request({
    url: '/system/feedback',
    method: 'post',
    data: data
  })
}

