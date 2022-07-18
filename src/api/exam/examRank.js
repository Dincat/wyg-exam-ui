import request from '@/utils/request'

const baseExamRecordUrl = '/exam/rank/'

export function fetchList (query) {
  return request({
    url: baseExamRecordUrl + 'noauth/list',
    method: 'get',
    params: query
  })
}

