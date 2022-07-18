import request from '@/utils/request'

const baseExamRecordUrl = '/exam/record/'

export function fetchList (query) {
  return request({
    url: baseExamRecordUrl + '/my/list',
    method: 'get',
    params: query
  })
}

export function getObj (id, query) {
  return request({
    url: baseExamRecordUrl + id,
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: baseExamRecordUrl,
    method: 'post',
    data: obj
  })
}

export function start (obj) {
  return request({
    url: baseExamRecordUrl + 'start',
    method: 'post',
    data: obj
  })
}

export function anonymousUserStart (obj) {
  return request({
    url: baseExamRecordUrl + 'anonymousUser/start',
    method: 'post',
    params: obj
  })
}


// 查询成绩详情
export function examRecordDetails (id) {
  return request({
    url: baseExamRecordUrl + id + '/details',
    method: 'get'
  })
}

export function getDashboard () {
  return request({
    url: baseExamRecordUrl +'noauth/dashboard',
    method: 'get'
  })
}

