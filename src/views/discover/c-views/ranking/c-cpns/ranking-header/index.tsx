import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingHeaderWrapper } from './style'
import SongOperationBar from '@/components/song-operation-bar'
import { shallowEqualApp, useAppSelector } from '@/store'
import { formatMonthDay } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const RankingHeader: FC<IProps> = () => {
  const { playList } = useAppSelector(
    (state) => ({
      playList: state.ranking.playList
    }),
    shallowEqualApp
  )
  return (
    <RankingHeaderWrapper>
      <div className="image">
        <img src={playList?.coverImgUrl} alt="" />
        <span className="image_cover"></span>
      </div>
      <div className="info">
        <div className="title">{playList?.name}</div>
        <div className="time">
          <i className="clock sprite_icon2"></i>
          <div>最近更新：{formatMonthDay(playList?.updateTime)}</div>
          <div className="update-f">({'每日更新'})</div>
        </div>
        <SongOperationBar
          favorTitle={`(${playList?.subscribedCount})`}
          shareTitle={`(${playList?.shareCount})`}
          downloadTitle="下载"
          commentTitle={`(${playList?.commentCount})`}
        />
      </div>
    </RankingHeaderWrapper>
  )
}

export default memo(RankingHeader)
