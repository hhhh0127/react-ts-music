import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderV2Wrapper } from './style'

interface IProps {
  children?: ReactNode
  title?: string
  moreText?: string
  moreLink?: string
}

const AreaHeaderV2: FC<IProps> = (props) => {
  const { title, moreText = '查看全部', moreLink } = props
  return (
    <HeaderV2Wrapper>
      <h3 className="title">{title}</h3>
      {/* 当moreText和moreLink有值的时候，a才显示 */}
      {moreText && moreLink && <a href={moreLink}>{moreText}</a>}
    </HeaderV2Wrapper>
  )
}

export default memo(AreaHeaderV2)
