import request from '@/utils/request'

const baseExamRateUrl = '/exam/examRates/'

export function userRate (obj) {
  return request({
    url: baseExamRateUrl + 'userRate',
    method: 'post',
    data: obj
  })
}


export function getRateList (query) {
  return request({
    url: baseExamRateUrl + 'noauth/list',
    method: 'get',
    params: query
  })
}
