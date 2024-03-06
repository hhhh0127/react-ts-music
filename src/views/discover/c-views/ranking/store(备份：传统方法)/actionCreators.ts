import { getRankingInfoList, getTopList } from '../service/ranking'
import * as actionTypes from './constants'

export const changeTopListAction = (res: any) => ({
  type: actionTypes.CHANGE_TOP_LIST,
  topList: res.list
})

export const changePlayListAction = (res: any) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList: res.playlist
})

export const changeCurrentIndex = (index: number) => ({
  type: actionTypes.CHANGE_CURRENT_INDEX,
  currentIndex: index // 榜单详情列表中的目前播放歌曲的下标
})

export const getTops = () => {
  return (dispatch: any) => {
    getTopList().then((res) => {
      dispatch(changeTopListAction(res))
    })
  }
}

export const getRanking = (id: number) => {
  return (dispatch: any) => {
    getRankingInfoList(id).then((res) => {
      dispatch(changePlayListAction(res))
    })
  }
}
