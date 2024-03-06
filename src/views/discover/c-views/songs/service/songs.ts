import hyRequest from '@/service'

/* 获取歌单 */
export function getSongsCategory() {
  return hyRequest.get({
    url: '/playlist/catlist'
  })
}

export function getSongsCategoryList(cat = '全部', offset = 0, limit = 35) {
  return hyRequest.get({
    url: '/top/playlist',
    params: {
      cat,
      limit,
      offset
    }
  })
}
