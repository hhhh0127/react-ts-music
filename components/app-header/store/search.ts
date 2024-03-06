import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSearchSongData } from '../service/search'

interface ISearchState {
  searchSongList: any
  focusState: boolean
}

const initialState: ISearchState = {
  searchSongList: [],
  focusState: false
}

export const fetchSearchSongDataAction = createAsyncThunk(
  'fetchSearchSongDataAction',
  (searchStr: string, { dispatch }) => {
    getSearchSongData(searchStr).then((res) => {
      const songList = res.result && res.result.songList
      dispatch(changeSearchSongListAction(songList))
    })
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchSongListAction(state, { payload }) {
      state.searchSongList = payload
    },
    changeFocusStateAction(state, { payload }) {
      state.focusState = payload
    }
  }
})

export const { changeSearchSongListAction, changeFocusStateAction } =
  searchSlice.actions

export default searchSlice.reducer
