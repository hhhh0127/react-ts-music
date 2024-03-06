import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRankingInfoList, getTopList } from '../service/ranking'

interface IRankingState {
  currentIndex: number // 当前榜单在榜单列表中的下标
  topList: any[] // 榜单列表
  playList: any // 榜单对应的歌曲列表
}

const initialState: IRankingState = {
  currentIndex: -1, // 默认为第一个榜单
  topList: [],
  playList: {}
}

export const fetchTopListAction = createAsyncThunk(
  'fetchTopListAction',
  (args, { dispatch }) => {
    getTopList().then((res) => {
      dispatch(changeTopListAction(res.list))
    })
  }
)

export const fetchPlayListAction = createAsyncThunk(
  'fetchPlayListAction',
  (id: number, { dispatch }) => {
    getRankingInfoList(id).then((res) => {
      dispatch(changePlayListAction(res.playlist))
    })
  }
)

const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {
    changeCurrentIndexAction(state, { payload }) {
      state.currentIndex = payload
    },
    changeTopListAction(state, { payload }) {
      state.topList = payload
    },
    changePlayListAction(state, { payload }) {
      state.playList = payload
    }
  }
})

export const {
  changeCurrentIndexAction,
  changeTopListAction,
  changePlayListAction
} = rankingSlice.actions
export default rankingSlice.reducer
