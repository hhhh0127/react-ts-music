import hyRequest from '@/service'
// const devBaseURL = 'http://nodemusic.zaixiankan.top:3000/'
// const proBaseURL = 'http://nodemusic.zaixiankan.top:3000/'
// // const devBaseURL = "http://123.207.32.32:9001/";
// // const proBaseURL = "http://123.207.32.32:9001/";
// const BASE_URL =
//   process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL

/* 手机号登陆 */
export function gotoPhoneLogin(
  phone: string,
  password: any,
  md5_password: string,
  countrycode?: number
) {
  return hyRequest.get({
    // baseURL: BASE_URL,
    url: '/login/cellphone',
    params: {
      phone,
      password,
      countrycode,
      md5_password
    }
  })
}

/* 邮箱登录 */
export function gotoEmailLogin(
  email: string,
  password: string,
  md5_password: string
) {
  return hyRequest.get({
    // baseURL: BASE_URL,
    url: '/login',
    method: 'get',
    params: {
      email,
      password,
      md5_password
    }
  })
}

// 发送验证码
export function sendRegisterCode(phone: string) {
  return hyRequest.get({
    // baseURL: BASE_URL,
    url: '/captcha/sent',
    method: 'get',
    params: {
      phone
    }
  })
}

/* 注册 */
export function sendRegister(
  captcha?: string,
  phone?: string,
  password?: string,
  nickname?: any
) {
  return hyRequest.get({
    // baseURL: BASE_URL,
    url: '/register/cellphone',
    method: 'get',
    params: {
      captcha,
      phone,
      password,
      nickname
    }
  })
}
