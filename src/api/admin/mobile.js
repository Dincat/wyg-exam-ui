import request from '@/utils/request'


// 修改用户个人信息
export function sendVaildCode(phone) {

  return request({
    url: '/system/sms/sendVaildCode/'+phone,
    method: 'get',
  })
}
