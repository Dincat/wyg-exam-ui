import request from '@/utils/request'

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}


// 修改用户个人信息
export function checkExist(userName) {
  return request({
    url: '/system/user/isExist/'+userName,
    method: 'get',
  })
}


// 修改用户个人信息
export function checkPhoneExist(phone) {
  return request({
    url: '/system/user/isPhoneExist/'+phone,
    method: 'get',
  })
}

// 修改用户个人信息
export function checkEmailExist(email) {
  return request({
    url: '/system/user/isEmailExist/'+email,
    method: 'get',
  })
}

