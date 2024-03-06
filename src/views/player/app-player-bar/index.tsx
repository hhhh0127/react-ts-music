import React, { memo, useState, useRef, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Slider, message } from 'antd'
import {
  BarControl,
  BarOperator,
  BarPlayerInfo,
  PlayerBarWrapper
} from './style'
import { Link } from 'react-router-dom'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
// import { getImageSize } from '@/utils/format'
import { formatTime, getPlayerUrl } from '@/utils/handle-player'
import {
  changeLyricIndexAction,
  changeMusicAction,
  changePlayModeAction
} from '../store/player'
import { getImageSize } from '@/utils/format'
import AppPlayerPanel from '../app-player-panel'

interface IProps {
  children?: ReactNode
}

/* 播放哪一首歌曲，是由外部传进当前组件，当前组件只是完成播放的功能 */
const AppPlayerBar: FC<IProps> = () => {
  /* 组件内部定义的数据 */
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0) // 获取歌曲总时间，毫秒
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false) // 记录是否在拖拽
  const [showPanel, setShowPanel] = useState(false) // 是否显示播放列表
  // 1.定义audioRef获取audio标签
  const audioRef = useRef<HTMLAudioElement>(null)

  /* 从redux中获取数据 */
  const { currentSong, lyrics, lyricIndex, playMode, playSongList, audioTime } =
    useAppSelector(
      (state) => ({
        currentSong: state.player.currentSong,
        lyrics: state.player.lyrics,
        lyricIndex: state.player.lyricIndex,
        playMode: state.player.playMode,
        playSongList: state.player.playSongList,
        audioTime: state.player.audioTime
      }),
      shallowEqualApp
    )
  const dispatch = useAppDispatch()

  /* 监听currentSong的变化 */
  // 进入页面播放音乐
  useEffect(() => {
    // 1.播放音乐
    if (!audioRef.current) return
    audioRef.current!.src = getPlayerUrl(currentSong.id)
    // 浏览器的安全设置：不允许自动播放，防止对用户骚扰
    audioRef.current
      .play()
      .then(() => {
        console.log('播放成功')
        setIsPlaying(true)
      })
      .catch((err) => {
        console.log('播放失败', err)
        setIsPlaying(false)
      })

    // 2.获取当前歌曲的总时长 毫秒
    setDuration(currentSong.dt)
  }, [currentSong])

  useEffect(() => {
    // currentTime改变了，那么audio的进度条就更新了，就会触发handleTimeUpdate函数
    // 就会有产生message组件，之前的message组件也存在，所以会出现两个，需要销毁之前旧的那个，先销毁就会销毁旧的那个
    message.destroy()
    audioRef.current!.currentTime = 0
  }, [audioTime])

  /* 音乐播放的进度条处理 */
  function handleTimeUpdate() {
    // 1.获取当前的音乐播放时间 这里单位是s，做处理为毫秒
    const currentTime = audioRef.current!.currentTime * 1000

    // 2.计算歌曲当前进度 %号 duration是毫秒
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
    }

    // 3.根据当前的时间匹配对应的歌词（算一个小算法：歌词匹配）
    if (!lyrics.length) return
    let index = lyrics.length - 1 // 默认为最后一句（防止下面for循环匹配不到最后一句歌词）
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time >= currentTime) {
        index = i - 1
        break
      }
    }

    // 4.匹配上对应的歌词的index，并且记录（其他页面或许会用到）
    if (lyricIndex === index || index === -1) return // 如果现在匹配的歌词和记录的一样或者还没匹配上，就返回（优化下）
    dispatch(changeLyricIndexAction(index)) // 现在匹配的歌词和记录的歌词下标不一样，记录最新的下标（同一句歌词这里就只会执行一次）

    // 5.展示对应的歌词（样式没有显示？？？解决）
    message.open({
      content: lyrics[index].text,
      key: 'lyric',
      duration: 0,
      style: {
        bottom: '60px'
      }
    })
  }

  /* 歌曲播放结束 */
  function handleTimeEnded() {
    if (playMode === 2 || playSongList.length === 1) {
      // 单曲循环
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handleChangeMusic(true)
    }
  }

  /* 组件内部的事件处理 */
  function handlePlayBtnClick() {
    // 1.控制播放器的播放/暂停
    console.log(isPlaying)

    isPlaying
      ? audioRef.current?.pause()
      : setTimeout(() => {
          audioRef.current?.play().catch(() => {
            console.log('播放失败')
            setIsPlaying(false)
          })
        }, 1000)

    // 2.改变isPlaying的状态
    setIsPlaying(!isPlaying)
  }

  function handleChangeMusic(isNext = true) {
    // 默认为next
    dispatch(changeMusicAction(isNext))
  }

  function handleChangePlayMode() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }

  /* 拖拽停止也会触发这个函数 */
  function handleSliderChanged(value: number) {
    // value是点击slider时返回的值
    // 1.获取点击位置的时间 毫秒
    const currentTime = (value / 100) * duration

    // 2.设置当前播放的时间 秒
    audioRef.current!.currentTime = currentTime / 1000

    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
  }

  function handleSliderChanging(value: number) {
    // 1.目前是处于拖拽状态的
    setIsSliding(true)

    // 2.设置progress
    setProgress(value)

    if (!isSliding) {
      console.log('hh')
    }

    // 3.获取value对应位置的时间
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => handleChangeMusic(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleChangeMusic()}
          ></button>
        </BarControl>
        <BarPlayerInfo>
          <Link to="/discover/player">
            <img src={getImageSize(currentSong?.al?.picUrl, 34)} alt="" />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/* 进度条，antd中的slider组件 */}
              {/* value是进度条，%，step 设置进度条的步长 */}
              <Slider
                value={progress}
                step={0.5}
                tooltip={{ formatter: null }}
                onChangeComplete={handleSliderChanged} // 点击进度条
                onChange={handleSliderChanging} // 改变的过程，拖拽
              />
              {/* 播放的时候 */}
              <div className="time">
                <div className="current">{formatTime(currentTime)}</div>
                <div className="divider">/</div>
                <div className="duration">{formatTime(duration)}</div>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator playMode={playMode}>
          <div className="left">
            {/* 第一个按钮是个单独的图片 */}
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            {/* 音量条控制（和播放音乐的类似） */}
            {/* <Slider vertical /> */}
            <button className="btn sprite_playbar volume"></button>
            {/* 播放模式 */}
            <button
              className="btn sprite_playbar loop"
              onClick={handleChangePlayMode}
            ></button>
            {/* 显示播放列表以及对应的歌词 */}
            <button
              className="btn sprite_playbar playlist"
              onClick={() => setShowPanel(!showPanel)}
            ></button>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnded}
      />
      {showPanel && <AppPlayerPanel />}
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
