import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RecommendWrapper } from './style'
import ThemeHeaderNormal from '@/components/theme-header-normal'
import { useAppSelector } from '@/store'
import RadioRecommendCover from '@/components/radio-recommend-cover'

interface IProps {
  children?: ReactNode
}

const RadioRecommend: FC<IProps> = () => {
  const { currentId, recommends } = useAppSelector((state) => ({
    currentId: state.djradio.currentId,
    recommends: state.djradio.recommends
  }))
  return (
    <RecommendWrapper>
      <ThemeHeaderNormal title="优秀新电台" />
      <div className="radio-list">
        {recommends?.slice(0, 5).map((item) => {
          return <RadioRecommendCover info={item} key={item.id} />
        })}
      </div>
    </RecommendWrapper>
  )
}

export default memo(RadioRecommend)
