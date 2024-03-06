import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { HeaderV1Wrapper } from './style'

interface IProps {
  children?: ReactNode
  title: string
  keywords?: string[]
  moreText?: string
  morePath?: string
}

const SectionHeaderV1: FC<IProps> = (props: IProps) => {
  const {
    title = '默认标题',
    keywords = [],
    moreText = '更多',
    morePath = '/'
  } = props

  return (
    /* 图标都是精灵图 */
    <HeaderV1Wrapper className="sprite_02">
      <div className="left">
        <h2 className="title">{title}</h2>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <Link to={morePath}>{moreText}</Link>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderV1Wrapper>
  )
}

export default memo(SectionHeaderV1)
