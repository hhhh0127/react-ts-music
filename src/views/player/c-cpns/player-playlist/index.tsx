import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { PlayListWrapper } from './style'
import ThemeHeaderPlayer from '@/components/theme-header-player'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { getImageSize } from '@/utils/format'
import { fetchSimiPlayListAction } from '../../store/player'

interface IProps {
  children?: ReactNode
}

const PlayPlayList: FC<IProps> = () => {
  const { simiPlayList } = useAppSelector(
    (state) => ({
      simiPlayList: state.player.simiPlayList
    }),
    shallowEqualApp
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSimiPlayListAction())
  })

  return (
    <PlayListWrapper>
      <ThemeHeaderPlayer title="包含这首歌的歌单" />
      <div className="songs">
        {simiPlayList.map((item) => {
          return (
            <div className="song-item" key={item.id}>
              <a href="/#" className="image">
                <img src={getImageSize(item.coverImgUrl, 50)} alt="" />
              </a>
              <div className="info text-nowrap">
                <a href="#/" className="name">
                  {item.name}
                </a>
                <div className="auchor">
                  by
                  <a href="#/" className="nickname">
                    {item.creator.nickname}
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </PlayListWrapper>
  )
}

export default memo(PlayPlayList)
