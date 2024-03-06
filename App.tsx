import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import AppHeader from './components/app-header'
// import AppFooter from './components/app-footer'
import routes from './router'
import { useEffect } from 'react'
import { useAppDispatch } from './store'
import AppPlayerBar from './views/player/app-player-bar'
// import AppWrapper from './views/app/index'
import initLoginInfo from '@/config/token'
import {
  fetchCurrentSongAction,
  fetchFirstSongDetailArrayAction
} from './views/player/store/player'
import {
  addPlaylistId,
  getCurrentSongIndex,
  getPlaylistId,
  initCurrentSongIndex
} from '@/utils/localstorage'
import { getLoginInfo, setLoginInfo } from '@/utils/secret-key'
import { SONG_PLAYLIST_ID as songplaylistId } from '@/common/constants'
import { fetchLoginProfileInfoAction } from '@/components/theme-login/store/login'
function App() {
  // 获取某一首喜欢的歌曲
  const dispatch = useAppDispatch()
  // useEffect(() => {
  //   const index = getCurrentSongIndex()
  //   const listId = getPlaylistId()
  //   dispatch(fetchFirstSongDetailArrayAction({ listId, index }))
  //   dispatch(fetchCurrentSongAction(29723028))
  // }, [])

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
    dispatch(fetchCurrentSongAction(listId[0]))
    dispatch(fetchFirstSongDetailArrayAction({ listId, index }))
  }, [dispatch])

  return (
    <div className="App">
      <AppHeader />

      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      {/* <AppFooter /> */}
      {/* <AppWrapper/> */}
      {/* 播放器工具栏（难点） */}
      {/* 放App这里是因为播放器不依赖于任何界面的切换 */}
      <AppPlayerBar />
    </div>
  )
}

export default App
