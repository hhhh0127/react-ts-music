import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingWraper } from './style'
import ThemeHeaderNormal from '@/components/theme-header-normal'
import { useAppSelector } from '@/store'

interface IProps {
  children?: ReactNode
}

const RadioRanking: FC<IProps> = () => {
  const {} = useAppSelector((state) => ({
    
  }))
  return <RankingWraper>
    <ThemeHeaderNormal title='电台排行榜' rightSlot=''/>

  </RankingWraper>
}

export default memo(RadioRanking)
