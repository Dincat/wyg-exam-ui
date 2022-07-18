import request from '@/utils/request'

const baseAnswerUrl = '/exam/word/'

export function query (keyword,mode) {
  return request({
    url: baseAnswerUrl + 'query?keyword='+keyword+'&mode='+mode,
    method: 'get'
  })
}
