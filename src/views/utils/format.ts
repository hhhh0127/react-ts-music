/* 格式化 */
export function formatCount(count: number) {
  if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return count
  }
}

export function getImageSize(
  imageUrl: string,
  width: number,
  height: number = width
) {
  return imageUrl + `?param=${width}y${height}`
}

/* 日期格式化：需要明白？？？（改写下：有的方法弃用） */
export function formatDate(time: any, fmt: string) {
  const date = new Date(time)

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  // 定义的时候也要加类型限制
  const o: any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str: string) {
  return ('00' + str).substr(str.length)
}

export function formatMonthDay(time: number) {
  return formatDate(time, 'MM月dd日')
}

export function formatMinuteSecond(time: number) {
  return formatDate(time, 'mm:ss')
}

// 函数防抖: 解决refresh频繁刷新
// export function debounce(func: () => any, delay) {
//   let timer = null
//   return function (...args) {
//     if (timer) clearInterval(timer)
//     timer = setTimeout(() => {
//       func.apply(this, args)
//     }, delay)
//   }
// }

/**
 *
 * @param {String} loginState 登录模式
 */
export function getParseLoginState(loginState: string) {
  let loginMode = ''
  switch (loginState) {
    case 'phone':
      loginMode = '手机号'
      break
    case 'email':
      loginMode = '邮箱'
      break
    default:
      loginMode = '手机号'
      break
  }
  return loginMode
}

/**
 * 根据不同登录方式,返回匹配对应的正则
 * @param {String} loginState 登录状态
 */
export function getMatchReg(loginState: string) {
  switch (loginState) {
    case 'phone':
      return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    // case 'email':
    // 先这样写 需要返回正则，不然Form.Item中使用规则匹配会报类型错误
    default:
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }
}

/* 函数防抖：解决refresh频繁刷新 */
export function debounce(func: any, delay: number) {
  let timer: any = null
  return (args: any) => {
    if (timer) clearInterval(timer)
    timer = setTimeout(() => {
      func(args)
    }, delay)
  }
}
