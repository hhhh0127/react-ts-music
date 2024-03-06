import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getDjRadioCatelist,
  getDjRadioRecommend,
  getDjRadios
} from '../service/djradio'

interface IDjradioState {
  currentId?: number
  radios?: any
  recommends?: any[]
  categories?: any[]
}

const initialState: IDjradioState = {
  currentId: 0,
  radios: '',
  recommends: [],
  categories: []
}

export const fetchRadioCategoriesAction = createAsyncThunk(
  'fetchCategoriesAction',
  (args, { dispatch }) => {
    getDjRadioCatelist().then((res) => {
      dispatch(changeCategoriesAction(res.categories))
      const currentId = res.categories[0].id
      dispatch(changeCurrentIdAction(currentId))
    })
  }
)

export const fetchRadioRecommendAction = createAsyncThunk(
  'fetchRadioRecommend',
  (id: number, { dispatch }) => {
    getDjRadioRecommend(id).then((res) => {
      dispatch(changeRecommendsAction(res.djRadios))
    })
  }
)

/* 必须传递，不能是?:可选，这样的话args.id会可能是undefined.id 报错 */
interface IMytype {
  id: number
  limit: number
  offset: number
}

export const fetchRadiosAction = createAsyncThunk(
  'fetchRadiosAction',
  (args: IMytype, { dispatch }) => {
    getDjRadios(args.id, args.limit, args.offset).then((res) => {
      dispatch(changeRadioAction(res.djRadios))
    })
  }
)

const djradioSlice = createSlice({
  name: 'djradio',
  initialState,
  reducers: {
    changeCurrentIdAction(state, { payload }) {
      state.currentId = payload
    },
    changeRadioAction(state, { payload }) {
      state.radios = payload
    },
    changeRecommendsAction(state, { payload }) {
      state.recommends = payload
    },
    changeCategoriesAction(state, { payload }) {
      state.categories = payload
    }
  }
})

export const {
  changeCurrentIdAction,
  changeRadioAction,
  changeRecommendsAction,
  changeCategoriesAction
} = djradioSlice.actions

export default djradioSlice.reducer
