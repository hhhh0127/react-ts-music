import hyRequest from '@/service'

export function getSongDetail(ids: number) {
  return hyRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

export function getSongLyric(id: number) {
  return hyRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}

/* 获取相似歌单 */
export function getSimiPlaylist(id: number) {
  return hyRequest.get({
    url: '/simi/playlist',
    params: {
      id
    }
  })
}

/* 获取相似歌曲 */
export function getSimiSongs(id: number) {
  return hyRequest.get({
    url: '/simi/song',
    params: {
      id
    }
  })
}
