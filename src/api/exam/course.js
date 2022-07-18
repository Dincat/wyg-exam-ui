import request from '@/utils/request'

const baseCourseUrl = '/exam/course/'

export function courseList (query) {
  return request({
    url: baseCourseUrl + 'noauth/list',
    method: 'get',
    params: query
  })
}
export function getObj (id) {
  return request({
    url: baseCourseUrl + 'noauth/'+id,
    method: 'get'
  })
}

