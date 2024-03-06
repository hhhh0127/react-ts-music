/* 解析歌词：字符串 -> 一个一个的对象 [{time :xxx, content: xxx}] */
export interface ILyric {
  time: number
  text: string
}

// [00:18.754]这世界有那么多人 正则处理
// 中括号是有特殊含义的，需要进行转义 \]
// 点也是有特殊含义的，需要进行转义 \.
// () 是进行分组
// \d{2} 匹配两位数字，\d{2,3} 匹配两位或者三位数字
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString: string) {
  // 1.拿到一行行的歌词
  const lines: string[] = lyricString.split('\n')

  // 2.对每一句歌词进行解析，解析成为对应的对象
  const lyrics: ILyric[] = []
  for (const line of lines) {
    const results = timeRegExp.exec(line)
    if (!results) continue

    // 将时间转为毫秒（统一为毫秒） 字符串转化为数字（注意类型转化，有坑）
    const time1 = Number(results[1]) * 60 * 1000 // 分钟，转化毫秒
    const time2 = Number(results[2]) * 1000 // 秒，转化为毫秒
    // 最后这个毫秒 如果是084表示84毫秒 如果是84则表示为840毫秒，需要判断下（小细节）
    const time3 =
      results[3].length === 3 ? Number(results[3]) : Number(results[3]) * 10 // 毫秒
    const time = time1 + time2 + time3

    // 获取每一组的文本
    const text = line.replace(timeRegExp, '') // replace第一个参数可以传正则表达式，将其替换为空字符，则可以获取文本
    lyrics.push({ time, text })
  }
  return lyrics
}
