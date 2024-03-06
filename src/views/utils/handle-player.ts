export function getPlayerUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

/* 算一个时间格式化的小算法 */
// function padLeft(time: number) {
//   const timeStr = time + ''
//   return ('00' + timeStr).slice(timeStr.length)
// }

export function formatTime(time: number) {
  // 1.将毫秒转成秒
  time = time / 1000 // 可能会是小数

  // 2.获取时间
  const minute = Math.floor(time / 60)
  const second = Math.floor(time) % 60 // Math.floor(time) 小数转化为整数

  // 3.拼接字符串
  // return padLeft(minute) + ':' + padLeft(second)

  // 调用string格式化方法，不自己写
  const formatMinute = String(minute).padStart(2, '0')
  const formatSecond = String(second).padStart(2, '0')
  return `${formatMinute}:${formatSecond}`
}
