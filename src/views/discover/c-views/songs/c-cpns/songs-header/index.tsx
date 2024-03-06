import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderLeft, HeaderRight, HeaderWrapper } from './stye'
import { shallowEqualApp, useAppSelector } from '@/store'
import SongsCategory from '../songs-category'

interface IProps {
  children?: ReactNode
}

const SongsHeader: FC<IProps> = () => {
  // 组件内部的状态 自己管理 独有（显示或者不显示）
  const [showCategory, setShowCategory] = useState(false)

  // redux中的状态
  const { currentCategory } = useAppSelector(
    (state) => ({
      currentCategory: state.songs.currentCategory
    }),
    shallowEqualApp
  )
  console.log(currentCategory)

  return (
    <HeaderWrapper>
      <HeaderLeft>
        <h3 className="title">{currentCategory || '全部'}</h3>
        <button
          className="select"
          /* 这里点击有点问题：点击其他区域这个会不显示（事件冒泡处理？？？） */
          onClick={() => setShowCategory(!showCategory)}
        >
          <span>选择分类</span>
          <i className="sprite_icon2"></i>
        </button>
        {showCategory && <SongsCategory />}
      </HeaderLeft>
      <HeaderRight>
        <button className="hot">热门</button>
      </HeaderRight>
    </HeaderWrapper>
  )
}

export default memo(SongsHeader)
