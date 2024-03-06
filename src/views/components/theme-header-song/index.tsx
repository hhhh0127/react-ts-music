import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderSongWrapper } from './style'
import { useAppSelector } from '@/store'

interface IProps {
  children?: ReactNode
}

const ThemeHeaderSong: FC<IProps> = () => {
  const { playList } = useAppSelector((state) => ({
    playList: state.ranking.playList
  }))
  return (
    <HeaderSongWrapper>
      <div className="left">
        <h3 className="title">歌曲列表</h3>
        <div className="count">{playList.trackCount}首歌</div>
      </div>
      <div className="right">
        <span>播放：</span>
        <span className="count">{playList.playCount}</span>
        <span>次</span>
      </div>
    </HeaderSongWrapper>
  )
}

export default memo(ThemeHeaderSong)
