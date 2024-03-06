import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { shallowEqual } from 'react-redux'
import { Carousel } from 'antd'
import classNames from 'classnames'

import {
  TopBannerControl,
  TopBannerLeft,
  TopBannerRight,
  TopBannerWrapper
} from './style'
import { useAppSelector } from '@/store'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  /* 定义内部的数据 */
  const [currentIndex, setCurrentIndex] = useState(0) // 保存当前第几张的图片
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null) // 类型限制，获取Carousel组件

  /* 从store中获取数据 */
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual // shallowEqual 提高组件性能
  )

  /* 事件处理函数 */
  // 轮播图按钮切换图片
  function handlePrevClick() {
    // 获取 Carousel 组件，做对应的操作
    bannerRef.current?.prev()
  }

  function handleNextClick() {
    bannerRef.current?.next()
  }

  // 背景图设置
  function handleAfterChange(current: number) {
    setCurrentIndex(current)
  }

  // function handleBeforeChange(from: number, to: number) {
  //   setCurrentIndex(-1)
  // }

  // 获取背景图片

  const bgImage =
    banners[currentIndex] &&
    banners[currentIndex].imageUrl + '?imageView&blur=40x20'

  return (
    <TopBannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <TopBannerLeft>
          {/* effect="fade" 淡入淡出 */}
          <Carousel
            autoplay
            ref={bannerRef}
            effect="fade"
            afterChange={handleAfterChange}
            dots={false}
          >
            {banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img className="image" src={item.imageUrl} alt={item.title} />
                </div>
              )
            })}
          </Carousel>
          {/* 轮播图指示器：小圆点 */}
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: currentIndex === index
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </TopBannerLeft>
        <TopBannerRight></TopBannerRight>
        <TopBannerControl>
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </TopBannerControl>
      </div>
    </TopBannerWrapper>
  )
}

export default memo(TopBanner)
