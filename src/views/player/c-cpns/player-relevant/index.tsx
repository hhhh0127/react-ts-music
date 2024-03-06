import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { PlayerRelevantWrapper } from './style'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { fetchSimiSongsAction } from '../../store/player'
import ThemeHeaderPlayer from '@/components/theme-header-player'

interface IProps {
  children?: ReactNode
}

const PlayRelevant: FC<IProps> = () => {
  const { simiSongs } = useAppSelector(
    (state) => ({
      simiSongs: state.player.simiSongs
    }),
    shallowEqualApp
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSimiSongsAction())
  }, [dispatch])

  return (
    <PlayerRelevantWrapper>
      <ThemeHeaderPlayer title="相似歌曲" />
      <div className="songs">
        {simiSongs.map((item) => {
          return (
            <div className="song-item" key={item.id}>
              <div className="info">
                <div className="title">
                  <a href="#/">{item.name}</a>
                </div>
                <div className="artist">
                  <a href="#/">{item.artists[0].name}</a>
                </div>
              </div>
              <div className="operate">
                <button className="item sprite_icon3 play"></button>
                <button className="item sprite_icon3 add"></button>
              </div>
            </div>
          )
        })}
      </div>
    </PlayerRelevantWrapper>
  )
}

export default memo(PlayRelevant)
