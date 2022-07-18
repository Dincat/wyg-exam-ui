import request from '@/utils/request'

const baseSubjectCategoryUrl = '/exam/subjectCategory/'

export function fetchCategoryTree (query) {
  return request({
    url: baseSubjectCategoryUrl + 'web/categories',
    method: 'get',
    params: query
  })
}

export function addCategory (obj) {
  return request({
    url: baseSubjectCategoryUrl,
    method: 'post',
    data: obj
  })
}

export function getCategory (id) {
  return request({
    url: baseSubjectCategoryUrl + id,
    method: 'get'
  })
}

export function delCategory (id) {
  return request({
    url: baseSubjectCategoryUrl + id,
    method: 'delete'
  })
}

export function putCategory (obj) {
  return request({
    url: baseSubjectCategoryUrl,
    method: 'put',
    data: obj
  })
}
