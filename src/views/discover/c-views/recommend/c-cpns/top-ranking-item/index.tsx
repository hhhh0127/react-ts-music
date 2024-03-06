import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingItemWrapper } from './style'
import { getImageSize } from '@/utils/format'
import { useAppDispatch } from '@/store'
import {
  changePlaySongListAction,
  fetchCurrentSongAction
} from '@/views/player/store/player'

interface IProps {
  children?: ReactNode
  itemData: any
}

const TopRankingItem: FC<IProps> = (props) => {
  const { itemData } = props
  const { tracks = [] } = itemData

  const dispatch = useAppDispatch()
  function handlePlayClick(id: number) {
    dispatch(fetchCurrentSongAction(id))
  }

  function handlePlayList() {
    dispatch(changePlaySongListAction(tracks.slice(0, 10))) // 需要先将飙升榜这种歌曲列表替换播放列表
    dispatch(fetchCurrentSongAction(tracks[0].id))
  }

  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="sprite_cover"></a>
          {/* 图片上的亮晶晶的就是蒙版做的效果，a标签来做蒙版 */}
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button
              className="sprite_02 btn play"
              onClick={() => handlePlayList()}
            ></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="item" key={item.id}>
              <div className="index">{index + 1}</div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operator">
                  <button
                    className="btn sprite_02 play"
                    onClick={() => handlePlayClick(item.id)}
                  ></button>
                  <button className="btn sprite_icon2 addto"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="#/discover/ranking">查看全部 &gt;</a>
      </div>
    </RankingItemWrapper>
  )
}

export default memo(TopRankingItem)
