import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { ItemV1Wrapper } from './style'
import { formatCount, getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: any
}

const SongMenuItem: FC<IProps> = (props) => {
  const { itemData } = props
  return (
    <ItemV1Wrapper>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 140)} alt="" />
        {/* 图片的蒙版 sprite_cover */}
        <div className="sprite_cover cover">
          <div className="sprite_cover info">
            <span>
              <i className="sprite_icon headset"></i>
              <span className="count">{formatCount(itemData.playCount)}</span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="bottom">{itemData.name}</div>
    </ItemV1Wrapper>
  )
}

export default memo(SongMenuItem)
