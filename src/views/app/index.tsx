import React, { memo, Suspense, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useAppDispatch } from '@/store'
import initLoginInfo from '@/config/token'
import { useRoutes } from 'react-router-dom'
import ThemeDialog from '@/components/theme-dialog/index'
import { getLoginInfo, setLoginInfo } from '@/utils/secret-key'
import { fetchLoginProfileInfoAction } from '@/components/theme-login/store/login'
import {
  addPlaylistId,
  getCurrentSongIndex,
  getPlaylistId,
  initCurrentSongIndex
} from '@/utils/localstorage'
import { SONG_PLAYLIST_ID as songplaylistId } from '@/common/constants'
import routes from '@/router'
import { fetchFirstSongDetailArrayAction } from '../player/store/player'
import { Skeleton } from 'antd'

interface IProps {
  children?: ReactNode
}

const AppWrapper: FC<IProps> = () => {
  const [isShow, setIsShow] = useState(false)

  const dispatch = useAppDispatch()
  console.log('初始化登录~~~')

  // 初始化
  const initLogin = () => {
    // 存在登陆信息
    if (localStorage.getItem('loginInfo') !== null) {
      const { username, password } = getLoginInfo('loginInfo')
      username && password
        ? dispatch(fetchLoginProfileInfoAction({ username, password }))
        : console.log('当前登录的默认信息')
    } else {
      // 不存在登陆信息
      setLoginInfo('loginInfo', initLoginInfo)
    }
  }
  initLogin()

  // 添加默认歌曲ID（本地存储默认歌曲id）
  useEffect(() => {
    addPlaylistId(songplaylistId)
    // 初始化音乐索引
    initCurrentSongIndex()
  }, [])

  // 本地存储读取歌曲列表ID
  useEffect(() => {
    // 动态获取locals store音乐索引
    const index = getCurrentSongIndex()
    const listId = getPlaylistId()
    dispatch(fetchFirstSongDetailArrayAction({ listId, index }))
  }, [dispatch])

  const handleOk = () => {
    setIsShow(false)
  }

  const handleCancel = () => {
    setIsShow(false)
  }

  return (
    <>
      <Suspense fallback={<Skeleton active />}>{useRoutes(routes)}</Suspense>
      <ThemeDialog
        controlShow={isShow}
        title="上传音乐"
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <h2>hello dialog</h2>
        <h3>上传音乐</h3>
      </ThemeDialog>
      {/* <Button onClick={() => setIsShow(!isShow)}>点我</Button> */}
    </>
  )
}

export default memo(AppWrapper)
