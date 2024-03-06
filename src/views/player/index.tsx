import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { PlayerLeft, PlayerRight, PlayerWrapper } from './style'
import PlayerInfo from './c-cpns/player-info'
import PlayerComment from './c-cpns/player-comment'
import PlayerSongs from './c-cpns/player-playlist'
import PlayerRelevant from './c-cpns/player-relevant'

interface IProps {
  children?: ReactNode
}

const Player: FC<IProps> = () => {
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <PlayerInfo />
          <PlayerComment />
        </PlayerLeft>
        <PlayerRight>
          <PlayerSongs />
          <PlayerRelevant />
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
}

export default memo(Player)
