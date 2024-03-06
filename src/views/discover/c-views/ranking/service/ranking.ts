import hyRequest from '@/service'

/* 获取榜单信息（多个榜单） */
export function getTopList() {
  return hyRequest.get({
    url: '/toplist'
  })
}

/* 获取榜单的详情信息 */
export function getRankingInfoList(id: number) {
  return hyRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}
