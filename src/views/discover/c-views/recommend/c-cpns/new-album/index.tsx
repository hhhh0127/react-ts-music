import React, { memo, useRef } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd'
import { AlbumWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { useAppSelector } from '@/store'
import NewAlbumItem from '@/components/new-album-item'

/* 使用组件库antd中的Carousel做轮播图 */

interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  /* 定义内部数据 */
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null) // 获取轮播图 Carousel

  /* redux获取数据 */
  const { newAlbums } = useAppSelector((state) => ({
    newAlbums: state.recommend.newAlbums
  }))

  /* 事件处理函数 */
  function handlePreClick() {
    bannerRef.current?.prev()
  }
  function handleNextClick() {
    bannerRef.current?.next()
  }
  return (
    <AlbumWrapper>
      <AreaHeaderV1 title="新碟上架" morePath="/discover/ablum" />
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePreClick}
        ></button>
        <div className="banner">
          {/* 轮播图 */}
          <Carousel autoplay ref={bannerRef} dots={false} speed={1500}>
            {/* 分页内容展示 */}
            {[0, 1].map((item, index) => {
              return (
                <div key={index}>
                  {/* 嵌套一层，不然无法设置flex布局，应该是Carousel内部对最外层做了内联样式 */}
                  <div className="album-list">
                    {newAlbums.slice(item * 5, (item + 1) * 5).map((album) => {
                      return <NewAlbumItem key={album.id} itemData={album} />
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={handleNextClick}
        ></button>
      </div>
    </AlbumWrapper>
  )
}

export default memo(Home)
