import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual
} from 'react-redux'

import recommendReducer from '@/views/discover/c-views/recommend/store/recommend'
import playerReducer from '@/views/player/store/player'
import rankingReducer from '@/views/discover/c-views/ranking/store/ranking'
import songsReducer from '@/views/discover/c-views/songs/store/songs'
import djradioReducer from '@/views/discover/c-views/djradio/store/djradio'
import loginReducer from '@/components/theme-login/store/login'
import searchReducer from '@/components/app-header/store/search'

/* 片段在全局store这里注册 */
const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    player: playerReducer,
    ranking: rankingReducer,
    songs: songsReducer,
    djradio: djradioReducer,
    login: loginReducer,
    search: searchReducer
  }
})

// 获取state的类型
// typeof获取函数的类型
type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>

// 获取dispatch类型
type DispatchType = typeof store.dispatch

// hook的二次封装：对类型进行约束
// TypedUseSelectorHook<IRootState> 是函数调用签名
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
// () => DispatchType 函数类型，返回值类型为DispatchType
export const useAppDispatch: () => DispatchType = useDispatch
// 这里是为了导入都重store导入，减少导入
export const shallowEqualApp = shallowEqual

export default store
