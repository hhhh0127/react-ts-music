import * as actionTypes from './constants'

const initialState = {
  topList: [], // 榜单（飙升榜、新歌榜等）
  currentIndex: 0, // 是第几个榜单（如飙升榜是第一个）
  playList: {} // 榜单对应的歌曲列表
}

export const rankingReducer = (state = initialState, action: any) => {
  switch (action.Type) {
    case actionTypes.CHANGE_TOP_LIST:
      return { ...state, topList: action.topList }
    case actionTypes.CHANGE_CURRENT_INDEX:
      return { ...state, currentIndex: action.currentIndex }
    case actionTypes.CHANGE_PLAY_LIST:
      return { ...state, playList: action.playList }
  }
}
