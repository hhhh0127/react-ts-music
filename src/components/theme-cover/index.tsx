import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { ThemeCoverWrapper } from './style'
import { getImageSize, formatCount } from '@/utils/format'

interface IProps {
  children?: ReactNode
  info?: any
  right?: string
}

const ThemeCover: FC<IProps> = (props) => {
  const { info, right } = props
  return (
    <ThemeCoverWrapper right={right}>
      <div className="cover-top">
        <img
          src={getImageSize(info?.picUrl || info?.coverImgUrl, 140)}
          alt=""
        />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon erji"></i>
              {formatCount(info.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">{info?.name}</div>
    </ThemeCoverWrapper>
  )
}

export default memo(ThemeCover)
