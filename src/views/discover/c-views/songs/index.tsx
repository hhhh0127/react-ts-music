import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { SongsWrapper } from './style'
import SongsHeader from './c-cpns/songs-header'
import SongsList from './c-cpns/songs-list'
import { useAppDispatch } from '@/store'
// import { useLocation } from 'react-router-dom'
import {
  changeCurrentCategoryAction,
  fetchCategoryAction,
  fetchSongsListAction
} from './store/songs'

interface IProps {
  children?: ReactNode
}

const Songs: FC<IProps> = () => {
  // const { currentCategory } = useAppSelector((state) => ({
  //   currentCategory: state.songs.currentCategory
  // }))
  const dispatch = useAppDispatch()
  // 获取路由信息

  // const location = useLocation()
  // console.log(location)

  // const cat = location.state?.cat

  // cat改变
  useEffect(() => {
    dispatch(changeCurrentCategoryAction('全部'))
  }, [dispatch])

  // 初始组件渲染的获取数据
  useEffect(() => {
    dispatch(fetchCategoryAction())
    dispatch(fetchSongsListAction(0))
  }, [dispatch])

  return (
    <SongsWrapper className="wrap-v2">
      <SongsHeader />
      <SongsList />
    </SongsWrapper>
  )
}

export default memo(Songs)
