import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RecommendWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import SongsMenueItem from '@/components/songs-menue-item'

interface IProps {
  children?: ReactNode
}

const HotRcommend: FC<IProps> = () => {
  const { hotRecommends } = useAppSelector(
    // 省略不写return但是返回的是对象必须加()，不然无法识别是对象还是函数
    (state) => ({
      hotRecommends: state.recommend.hotRecommends
    }),
    shallowEqual
  )
  return (
    <RecommendWrapper>
      <AreaHeaderV1
        morePath="/discover/songs"
        title="热门推荐"
        moreText="更多"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
      />
      <div className="recommend-list">
        {hotRecommends.map((item) => {
          return <SongsMenueItem key={item.id} itemData={item} />
        })}
      </div>
    </RecommendWrapper>
  )
}

export default memo(HotRcommend)
