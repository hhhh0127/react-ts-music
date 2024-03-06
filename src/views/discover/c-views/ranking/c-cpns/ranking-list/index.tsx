import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingListWrapper } from './style'
import ThemeHeaderSong from '@/components/theme-header-song'
import { shallowEqualApp, useAppSelector } from '@/store'
import { formatMinuteSecond, getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const RankingList: FC<IProps> = () => {
  const { playList } = useAppSelector(
    (state) => ({
      playList: state.ranking.playList
    }),
    shallowEqualApp
  )
  // 歌曲列表
  const tracks = playList.tracks || []
  return (
    <RankingListWrapper>
      <ThemeHeaderSong />
      <div className="play-list">
        {/* 表格布局 */}
        <table>
          <thead>
            <tr className="header">
              <th className="ranking"></th>
              <th className="title">标题</th>
              <th className="duration">时长</th>
              <th className="singer">歌手</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((item: any, index: number) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className="rank-num">
                      <span className="num">{index + 1}</span>
                      <span className="new sprite_icon2"></span>
                    </div>
                  </td>
                  <td>
                    <div className="song-name">
                      {/* 前三需要显示歌曲图片 */}
                      {index < 3 ? (
                        <img src={getImageSize(item.al.picUrl, 50)} alt="" />
                      ) : null}
                      <span className="play sprite_table"></span>
                      <span className="name">{item.name}</span>
                    </div>
                  </td>
                  <td>{formatMinuteSecond(item.dt)}</td>
                  <td>{item.ar[0].name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </RankingListWrapper>
  )
}

export default memo(RankingList)
