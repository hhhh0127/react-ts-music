import hyRequest from '@/service'
/* 发送网络请求 */

/* 获取轮播图 */
export function getBanners() {
  return hyRequest.get({
    url: '/banner'
  })
}

export function getHotRecommend(limit = 30) {
  return hyRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getNewAlbum() {
  return hyRequest.get({
    url: '/album/newest'
  })
}

export function getPlaylistDetail(id: number) {
  return hyRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export function getArtistList(limit = 5) {
  return hyRequest.get({
    url: '/artist/list',
    params: {
      limit
    }
  })
}
