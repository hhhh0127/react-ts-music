import { IRootState } from '@/store'
import { handleSongsCategory } from '@/utils/handle-data'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSongsCategory, getSongsCategoryList } from '../service/songs'

interface ISongsState {
  category: any[] // 分类
  categorySongs: any // 类别的歌曲
  currentCategory: string // 当前的类别
}

const initialState: ISongsState = {
  category: [],
  categorySongs: {},
  currentCategory: '全部'
}

export const fetchCategoryAction = createAsyncThunk(
  'fetchCategory',
  (args, { dispatch }) => {
    getSongsCategory().then((res) => {
      // 获取的数据需要写逻辑处理一下
      // categoryData [{value, {}}, {}]
      const categoryData = handleSongsCategory(res)
      dispatch(changeCategoryAction(categoryData))
      console.log(res)
    })
  }
)

export const fetchSongsListAction = createAsyncThunk<
  void,
  number,
  { state: IRootState }
>('fetchSongsListAction', (page, { dispatch, getState }) => {
  // 1.获取当前的类别
  const currentCategory = getState().songs.currentCategory

  // 2.获取类别对应的数据
  getSongsCategoryList(currentCategory, page * 35).then((res) => {
    dispatch(changeCategorySongsAction(res))
  })
})

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    changeCategoryAction(state, { payload }) {
      state.category = payload
    },
    changeCategorySongsAction(state, { payload }) {
      state.categorySongs = payload
    },
    changeCurrentCategoryAction(state, { payload }) {
      state.currentCategory = payload
    }
  }
})

export const {
  changeCategoryAction,
  changeCategorySongsAction,
  changeCurrentCategoryAction
} = songsSlice.actions

export default songsSlice.reducer
