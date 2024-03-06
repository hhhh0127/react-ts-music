import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { PanelWrapper } from './style'
import PlayerPanelHeader from './c-cpns/player-panel-header'
import PlayerSongList from './c-cpns/player-song-list'
import LyricPanel from './c-cpns/lyric-panel'

interface IProps {
  children?: ReactNode
}

const AppPlayPanel: FC<IProps> = () => {
  return (
    <PanelWrapper>
      <PlayerPanelHeader />
      <div className="main">
        <img
          className="image"
          src="https://p4.music.126.net/qeN7o2R3_OTPhghmkctFBQ==/764160591569856.jpg"
          alt=""
        />
        <PlayerSongList />
        <LyricPanel />
      </div>
    </PanelWrapper>
  )
}

export default memo(AppPlayPanel)
