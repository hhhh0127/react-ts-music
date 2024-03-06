import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { InfoLeft, InfoRight, PlayerInfoWrapper } from './style'
import { shallowEqualApp, useAppSelector } from '@/store'
import { getImageSize } from '@/utils/format'
import SongOperationBar from '@/components/song-operation-bar'

interface IProps {
  children?: ReactNode
}

const PlayInfo: FC<IProps> = () => {
  // 歌词是否展开
  const [isSpread, setIsSpread] = useState(false)

  const { currentSong, currentLyrics } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      currentLyrics: state.player.lyrics
    }),
    shallowEqualApp
  )

  const totalLyricCount = isSpread ? currentLyrics.length : 13

  return (
    <PlayerInfoWrapper>
      <InfoLeft>
        <div className="image">
          <img src={getImageSize(currentSong.al.picUrl, 130)} alt="" />
          <span className="cover image_cover"></span>
        </div>
        <div className="link">
          <i className="sprite_icon2"></i>
          <a href="#/">生成外联播放器</a>
        </div>
      </InfoLeft>
      <InfoRight isSpread={isSpread}>
        <div className="header">
          <i className="sprite_icon2"></i>
          <h3 className="title">{currentSong.name}</h3>
        </div>
        <div className="singer">
          <span className="label">歌手：</span>
          <a href="/#" className="name">
            {currentSong.ar[0].name}
          </a>
        </div>
        <div className="album">
          <span className="label">所属专辑：</span>
          <a href="/#" className="name">
            {currentSong.al.name}
          </a>
        </div>
        <SongOperationBar
          favorTitle="收藏"
          shareTitle="分享"
          downloadTitle="下载"
          commentTitle="(167366)"
        />
        <div className="lyric">
          <div className="lyric-info">
            {currentLyrics.slice(0, totalLyricCount).map((item) => {
              return (
                <p key={item.time} className="text">
                  {item.text}
                </p>
              )
            })}
          </div>
          <div className="lyric-control" onClick={() => setIsSpread(!isSpread)}>
            {isSpread ? '收起' : '展开'}
            <i className="sprite_icon2"></i>
          </div>
        </div>
      </InfoRight>
    </PlayerInfoWrapper>
  )
}

export default memo(PlayInfo)
