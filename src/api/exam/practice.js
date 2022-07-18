import request from '@/utils/request'

const basePracticeUrl = '/exam/practice/'

export function imageChoiceWord (query) {
  return request({
    url: basePracticeUrl + 'imageChoiceWord',
    method: 'get',
    params: query
  })
}

export function imageGuessWord (query) {
  return request({
    url: basePracticeUrl + 'imageGuessWord',
    method: 'get',
    params: query
  })
}

