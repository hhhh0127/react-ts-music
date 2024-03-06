import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style'
import { useAppSelector } from '@/store'

interface IProps {
  children?: ReactNode
}

/* 播放列表面板的头部 */
const PlayerPanelHeader: FC<IProps> = () => {
  const { currentSong, playSongList } = useAppSelector((state) => ({
    currentSong: state.player.currentSong,
    playSongList: state.player.playSongList
  }))
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <h3>播放列表({playSongList.length})</h3>
        <div className="operator">
          <button>
            <i className="sprite_playlist icon favor"></i>
            收藏全部
          </button>
          <span className="divider">|</span>
          <button>
            <i className="sprite_playlist icon remove"></i>
            清除
          </button>
        </div>
      </HeaderLeft>
      <HeaderRight>{currentSong.name}</HeaderRight>
    </HeaderWrapper>
  )
}

export default memo(PlayerPanelHeader)
