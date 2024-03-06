import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { PlayListWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import classNames from 'classnames'
import { formatTime } from '@/utils/handle-player'
import {
  changeCurrentSongAction,
  fetchSongLyricAction,
  changePlaySongIndexAction,
  changeAudioTimeAction,
  changeLyricIndexAction
} from '@/views/player/store/player'

interface IProps {
  children?: ReactNode
}

const PlayerSongList: FC<IProps> = () => {
  const { playSongList, playSongIndex, audioTime } = useAppSelector(
    (state) => ({
      playSongList: state.player.playSongList,
      playSongIndex: state.player.playSongIndex, // 当前播放的音乐在列表中的下标
      audioTime: state.player.audioTime
    })
  )

  const dispatch = useAppDispatch()
  function handleChangeSong(index: number) {
    if (index === playSongIndex) {
      dispatch(changeAudioTimeAction(!audioTime))
      dispatch(changeLyricIndexAction(-1))
    } else {
      const song = playSongList[index]
      dispatch(changePlaySongIndexAction(index))
      dispatch(changeCurrentSongAction(song))
      dispatch(fetchSongLyricAction(song.id))
    }
  }

  return (
    <PlayListWrapper>
      {playSongList.map((item, index) => {
        return (
          <div
            key={item.id}
            className={classNames('play-item', {
              active: playSongIndex === index
            })}
            onClick={() => handleChangeSong(index)}
          >
            <div className="left">{item.name}</div>
            <div className="right">
              <span className="singer">{item.ar[0].name}</span>
              <span className="duration">{formatTime(item.dt)}</span>
              <span className="sprite_playlist link"></span>
            </div>
          </div>
        )
      })}
    </PlayListWrapper>
  )
}

export default memo(PlayerSongList)
